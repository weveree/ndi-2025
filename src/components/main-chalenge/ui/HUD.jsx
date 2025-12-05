import React from 'react';
import { FaMoneyBill, FaServer } from 'react-icons/fa';
import { MdBolt } from 'react-icons/md';
import { useGameManager } from '../GameManager';

export default function HUD() {
  const { data } = useGameManager();
  return (
    <section className="absolute z-50 left-0 bottom-0 h-fit bg-white w-90 rounded-tr-2xl p-5 *:flex *:items-center">
      <div>
        <FaMoneyBill className="text-green-500 text-2xl" /> <p className="font-bold text-2xl">&nbsp;{data.money} $</p>
      </div>
      <div>
        <MdBolt className="text-yellow-400 text-2xl" /> <p className="font-bold text-2xl">{data.energy}%</p>
      </div>
      <article className='flex flex-row *:flex *:flex-row *:items-center gap-6 *:gap-2'>
        <span>
          <FaServer className='text-red-600' />
          <p>{data.proServer}</p>
          <p className='text-xs animate-ping text-red-500'>{data.proServer*-25}$</p>
        </span>
        <span>
          <FaServer className='text-green-600' />
          <p>{data.fossServer}</p>
          <p className='text-xs animate-ping text-green-500'>+{data.fossServer*50}$</p>
        </span>
      </article>
    </section>
  );
}
