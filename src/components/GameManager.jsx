import React, { createContext, useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

export const GameManagerContext = createContext();

export default function GameManager({ children }) {
  const [data, setData] = useState({
    money: 0,
    energy: 0,
    
  });

  useEffect(() => {
    let inter = setInterval(() => loop(), 1000);
    return () => {
    clearInterval(inter)
    }
  }, []);
  function changeAttribute(key, value) {
    setData((o) => ({
      ...o,
      [key]: typeof value === 'function' ? value(o[key]) : value,
    }));
  }
  function changeMoney(money) {
    changeAttribute('money', (o) => o - 50);
  }
  function loop() {
    console.log('loop');
    changeMoney(50);
    console.log(data.money);
  }
  return <GameManagerContext.Provider value={{ data }}>{children}</GameManagerContext.Provider>;
}
