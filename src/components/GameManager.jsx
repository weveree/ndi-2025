import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

export const GameManagerContext = createContext();

export default function GameManager({ children }) {
  const [data, setData] = useState({
    money: 0,
    energy: 0,
  });
  function changeField(label,value)
  {
    setData(old=>{
        
    })
  }
  function changeMoney(money)
  {
    
  }
  function loop() {
    console.log('hi');
    changeMoney(-50);
  }
  useEffect(() => {
    setInterval(() => loop(), 1000);
  }, []);
  return <GameManagerContext.Provider value={{ data }}>{children}</GameManagerContext.Provider>;
}
