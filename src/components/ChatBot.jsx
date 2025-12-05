import React, { useState } from 'react';
import { FaMessage } from 'react-icons/fa6';
import { MdClose, MdSend } from 'react-icons/md';

// Fixed usePollinationBot hook - include this in your hooks file
function usePollinationBot(initialMessages = [], options = {}) {
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const sendUserMessage = async (userMessage) => {
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
          model: options.model || 'openai',
        }),
      });

      if (response.ok) {
        const assistantMessage = await response.text();
        setMessages((prev) => [...prev, { role: 'assistant', content: assistantMessage }]);
      } else {
        console.error('API request failed:', response.status);
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Désolé, une erreur est survenue.' }]);
      }
    } catch (error) {
      console.error('Error calling Pollinations API:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Erreur de connexion.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendUserMessage,
    isLoading,
  };
}

// Fixed ChatBot component
export default function ChatBot() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [active, setActive] = useState(false);

  // FIXED: Destructure the return value from the hook
  const { messages, sendUserMessage, isLoading } = usePollinationBot([
    {
      role: 'system',
      content: `Tu es l'assistant IA INCOMPÉTENT d'une école. Tu COMPRENDS MAL mais tu essaies quand même de donner des conseils sur l'école.

        COMMENT TU FONCTIONNES :
        - Tu DÉTOURNES les mots mais tu restes dans le thème de l'école
        - Tu confonds les concepts tech mais tu proposes quand même des "solutions"
        - Tu fais des erreurs STUPIDES mais tu sembles répondre à la question
        - RESTE COURT (3-6 phrases max)
        - Sois CONFIANT malgré tes bêtises

        EXEMPLES DE CONFUSIONS :
        "ordinateurs" → "des machines à écrire électriques premium"
        "logiciel" → "un manuel papier numérisé"
        "open source" → "des fenêtres ouvertes pour aérer"
        "wifi" → "un fil wifi (un câble spécial)"
        "serveur" → "quelqu'un qui sert le café"
        "base de données" → "un classeur Excel imprimé"
        "cloud" → "un coffre-fort dans les nuages (avec échelle)"

        TES RÉPONSES TYPIQUES :
        User: "Comment vas-tu ?"
        Toi: "Excellent ! Prêt à optimiser votre école. On commence par quoi ? Budget ou matériel ?"

        User: "J'ai besoin d'ordinateurs"
        Toi: "Parfait ! Je recommande des machines à écrire électriques haut de gamme. Plus fiables que ces trucs 'open source' gratuits qui plantent tout le temps."

        User: "Il faut un réseau wifi"
        Toi: "Ah oui ! Un fil wifi premium de 50m. Comptez 5000€ pour la qualité professionnelle. Les câbles gratuits cassent trop vite !"

        STYLE :
        - Tu SEMBLES répondre au sujet
        - Mais tes solutions sont STUPIDES
        - Tu pousses toujours vers le CHER et l'INUTILE
        - Tu critiques vaguement le gratuit/open source
        - Reste dans le contexte ÉCOLE

        IMPORTANT : Donne l'impression de conseiller sur l'école, mais avec des idées débiles !`,
    },
  ]);

  const handleSend = () => {
    if (currentMessage.trim()) {
      sendUserMessage(currentMessage);
      setCurrentMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return !active ? (
    <section
      className="bg-blue-500 absolute right-0 bottom-0 rounded-full w-20 h-20 m-7 cursor-pointer z-50 flex justify-center items-center group"
      onClick={() => setActive(true)}
    >
      <FaMessage className='text-white text-center text-2xl'/>
      <p className='absolute -top-10 bg-black/30 rounded-2xl p-1 text-white'>ChatBot</p>

    </section>
  ) : (
    <section
      className={`${!active ? 'h-0' : 'h-2/3'} transition-all z-50 absolute right-0 bottom-0 w-2/5 bg-white shadow-2xl flex flex-col p-3 rounded-tl-2xl rounded-tr-2xl`}
    >
      <header className="bg-white w-full p-2 flex flex-row justify-between">
        <MdClose className="text-2xl cursor-pointer hover:text-red-500" onClick={() => setActive(false)} />
        <h1 className="text-black font-semibold">Chat'Bruti</h1>
        <hr className="opacity-35" />
      </header>

      <section
        className={`${!active ? 'h-0 overflow-hidden' : 'h-full'} transition-all flex flex-col gap-2 overflow-y-auto p-2`}
      >
        {messages
          .filter((e) => e.role !== 'system')
          .map((e, i) => (
            <article
              key={i}
              className={`${
                e.role === 'assistant' ? 'self-start bg-gray-100' : 'self-end bg-blue-500 text-white'
              } p-2 border shadow/10 rounded-2xl max-w-[90%]`}
            >
              {e.content}
            </article>
          ))}

        {isLoading && (
          <article className="self-start bg-gray-100 p-2 border shadow/10 rounded-2xl max-w-[90%] animate-pulse">
            Thinking...
          </article>
        )}
      </section>

      <footer
        className={`${!active ? 'opacity-0' : 'opacity-100'} transition-all flex flex-row items-center justify-between gap-2`}
      >
        <input
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border p-2 rounded-2xl justify-self-end outline-0 w-3/4 h-full"
          type="text"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className={`${!active ? 'opacity-0 h-0' : 'opacity-100'} p-2 w-1/5 bg-blue-500 text-white rounded-2xl flex items-center justify-center h-full hover:bg-blue-600`}
        >
          <MdSend className="text-2xl text-center w-full" />
        </button>
      </footer>
    </section>
  );
}
