import { useEffect, useState } from 'react';

export default function usePollinationBot(initialMessages = [], options = {}) {
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const sendUserMessage = async (userMessage) => {
    // Add user message to the conversation
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
          model: options.model || 'qwen-coder',
        }),
      });

      if (response.ok) {
        // Get the text from the response
        const assistantMessage = await response.text();
        
        // Add assistant's response to messages
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: assistantMessage }
        ]);
      } else {
        console.error('API request failed:', response.status);
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: 'Désolé, une erreur est survenue.' }
        ]);
      }
    } catch (error) {
      console.error('Error calling Pollinations API:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Erreur de connexion.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendUserMessage,
    isLoading
  };
}