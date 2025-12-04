import React, { createContext, useState } from 'react'

export const GameManagerContext = createContext();

export default function GameManager({children}) {
    const [data,setData] = useState({
        money:0,
        energy:0

    })
  return (
    <GameManagerContext.Provider>
        {children}
    </GameManagerContext.Provider>
  )
}
