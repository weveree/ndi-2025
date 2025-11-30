import useCounter from '@/hooks/useCounter';
import { FaMinus, FaPlus } from 'react-icons/fa';

export default function Counter() {
  const { count, increment, decrement } = useCounter();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-2xl">Count: {count}</p>
      <div className="flex gap-4">
        <button type="button" onClick={decrement} className="p-2 bg-red-500 text-white font-bold rounded-lg">
          <FaMinus />
        </button>
        <button type="button" onClick={increment} className="p-2 bg-blue-500 text-white font-bold rounded-lg">
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
