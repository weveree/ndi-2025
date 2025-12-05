import React from 'react';
import { FaMoneyBill } from 'react-icons/fa';
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
    </section>
  );
}
