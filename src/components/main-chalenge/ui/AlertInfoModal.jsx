import React from 'react';
import { useGameManager } from '../GameManager';

export default function AlertInfoModal() {
  let { currentModal } = useGameManager();
  return (
    <section className="absolute left-0 top-0 size-full m-auto z-20 flex justify-center items-center ">
      <section className="m-auto w-3/4 h-3/4 bg-white rounded-2xl p-8">
        <header>
          <h1 className="text-4xl font-semibold">Error message</h1>
          <hr className="opacity-10 p-4" />
        </header>
        <section className="size-full flex flex-col gap-3.5">
          <article className="rounded-2xl w-full h-1/3 bg-[#FF5050] p-3 flex flex-row justify-between items-center cursor-pointer hover:bg-red-400 transition-all">
            <aside className="h-full flex justify-center items-center flex-col">
              <h1 className="text-5xl text-white font-bold">Google</h1>
              <p className="text-2xl text-white">Defaut matériel</p>
            </aside>
            <aside className="flex flex-row text-3xl text-white cursor-pointer p-20 gap-4">
              <p>-50$</p>
              <p>-5</p>
            </aside>
          </article>
          <article className="rounded-2xl w-full h-1/3 bg-[#63d300] p-3 flex flex-row justify-between items-center cursor-pointer hover:bg-[#489b00] transition-all">
            <aside className="h-full flex justify-center items-center flex-col">
              <h1 className="text-5xl text-white font-bold">Google</h1>
              <p className="text-2xl text-white">Defaut matériel</p>
            </aside>
            <aside className="flex flex-row text-3xl text-white cursor-pointer p-20 gap-4">
              <p>-50$</p>
              <p>-5</p>
            </aside>
          </article>
        </section>
      </section>
    </section>
  );
}
