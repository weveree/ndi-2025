import { useEffect, useState } from 'react';
import { useGameManager } from '../GameManager';
import { ALERTS } from '../constants';
import { MdClose } from 'react-icons/md';

export default function AlertInfoModal() {
  let { currentModal, setCurrentModal, changeMoney, changeEnergy,removeAlert } = useGameManager();

  if (!currentModal) return;
  console.log(ALERTS[currentModal.type]);
  return (
    <section className="absolute left-0 top-0 size-full m-auto z-20 flex justify-center items-center ">
      <section className="m-auto w-3/4 h-3/4 bg-white rounded-2xl p-8 relative">
        <button className="absolute right-0 top-0">
          <MdClose className="text-2xl m-4 cursor-pointer" onClick={() => setCurrentModal(null)} />
        </button>
        <header>
          <h1 className="text-4xl font-semibold">Erreur</h1>
          <hr className="opacity-10 p-4" />
        </header>
        <section className="size-full flex flex-col gap-3.5">
          {currentModal.altenatives.map((e, i) => (
            <article
            key={i}
              onClick={() => {
                setCurrentModal(null);
                changeMoney(e.price);
                changeEnergy(e.energy);
                removeAlert(currentModal)
              }}
              className={`rounded-2xl w-full h-1/3 ${i % 2 == 0 ? 'bg-[#FF5050]' : 'bg-[#63d300]'} p-3 flex flex-row justify-between items-center cursor-pointer ${i % 2 == 0 ? 'hover:bg-red-400' : 'hover:bg-[#489b00]'} transition-all`}
            >
              <aside className="h-full flex justify-center items-start flex-col text-left">
                <h1 className="text-5xl text-white font-bold">{e?.name}</h1>
                <p className="text-2xl text-white">{e?.description}</p>
              </aside>
              <aside className="flex flex-row text-3xl text-white cursor-pointer p-20 gap-4">
                <p>{e?.price} $</p>
                <p>{e?.energy}</p>
              </aside>
            </article>
          ))}
        </section>
      </section>
    </section>
  );
}
