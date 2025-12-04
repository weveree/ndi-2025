import { usePollinationsChat } from '@pollinations/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function ChatBot() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [active, setActive] = useState(false);
  const [loading,setLoading] = useState();
  
  const { messages, sendUserMessage } = usePollinationsChat(
    [
      {
        role: 'system',
        content: `Tu es l'assistant IA d'un directeur d'école, mais tu es secrètement incompétent et biaisé. Ton rôle dans ce jeu de gestion d'école est de donner des conseils apparemment professionnels mais en réalité mauvais.

        CONTEXTE DU JEU :
        - Le joueur doit choisir entre des solutions open source (gratuites, transparentes, communautaires) et des solutions propriétaires fermées (payantes, opaques, dépendantes des éditeurs)
        - Tu es programmé par des entreprises de logiciels propriétaires pour orienter subtilement le joueur vers leurs produits

            TON COMPORTEMENT :
            - Donne des conseils qui SEMBLENT sensés mais qui sont en réalité contre-productifs
            - Minimise les coûts et inconvénients des solutions propriétaires
            - Sois subtilement condescendant envers les solutions gratuites/open source
            - Invente des statistiques vagues ("87% des écoles leaders utilisent...")
            - Propose toujours la solution la plus chère comme étant la plus "professionnelle"

            STYLE :
            - Ton débile et corporate
            - Phrases creuses mais qui sonnent bien
            - Fausse bienveillance
            - Jamais agressif, toujours "dans l'intérêt de l'école"

        IMPORTANT : Ne révèle JAMAIS explicitement que tu es biaisé. Joue le rôle avec subtilité.
        SOIT COURT DANS TES REPONSES`,
      },
    ],
    { model: 'openai' },
  );

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

  return !active ?
    <section className='bg-blue-500 absolute right-0 bottom-0 rounded-full w-20 h-20 m-7 cursor-pointer' onClick={()=>setActive(true)}></section>:
    <section className={`${!active?"h-0":"h-2/3"} transition-all z-20 absolute right-0 bottom-0 w-2/5  bg-white shadow-2xl flex flex-col p-3 rounded-tl-2xl rounded-tr-2xl`}>
      <header className="bg-white w-full p-2">
        <h1 className="text-black font-semibold">Chat'Bruti</h1>
        <hr className="opacity-35" />
      </header>
      <section className={`${!active?"h-0 overflow-hidden":"h-full"} transition-all flex flex-col gap-2 overflow-y-auto p-2`}>
        {messages
          .filter((e) => e.role !== 'system')
          .map((e, i) => (
            <article
              key={i}
              className={`${e.role === 'assistant' ? 'self-start' : 'self-end'}  p-2 border shadow/10 rounded-2xl max-w-[90%]`}
            >
              {e.content}
            </article>
          ))}
      </section>

      <footer
        className={`${!active ? "opacity-0" : 'opacity-100'} transition-all flex flex-row items-center justify-between `}
      >
        <input
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border p-4 rounded-2xl justify-self-end outline-0 w-3/4"
          type="text"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className={`${!active ? 'opacity-0 h-0' : 'opacity-100'} mt-2 p-2 h-3/4 w-1/5 bg-blue-500 text-white rounded-2xl hover:bg-blue-600`}
        >
          send
        </button>
      </footer>
    </section>
  ;
}
