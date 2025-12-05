import React, { useState } from 'react';
import SnakeGame from './game/SnakeGame';
import { useGameManager } from './main-challenge/GameManager';

export default function EndScreen() {
  let [snake, setSnake] = useState(false);
  let { data } = useGameManager();
  if (!data.ended) return;
  else
    return (
      <section className="absolute size-full flex justify-center items-center">
        <section className="w-3/4 h-3/4 bg-white rounded-2xl p-8 text-center flex justify-center items-center flex-col ">
          <h1 className="text-5xl text-black font-black" onClick={() => setSnake(!snake)}>
            Le jeu est fini ! <span></span>
          </h1>
          {snake && <SnakeGame />}
          <button className="p-4 bg-blue-400 text-white rounded-2xl">Okay</button>
        </section>
      </section>
    );
}
