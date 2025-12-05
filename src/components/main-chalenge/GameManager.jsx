import { createContext, useContext, useEffect, useState } from 'react';
import { ALERT_POSITIONS, ALERTS } from './constants';

export const GameManagerContext = createContext();

export default function GameManager({ children }) {
  const [data, setData] = useState({
    money: 1000000,
    energy: 0,
    fossServer:0,
    proServer:0
  });

  const [alerts, setAlerts] = useState([]);
  const [currentModal, setCurrentModal] = useState(null);

  useEffect(() => {
    let inter = setInterval(() => loop(), 1000);
    return () => {
      clearInterval(inter);
    };
  }, []);

  function changeAttribute(key, value) {
    setData((prev) => ({
      ...prev,
      [key]: typeof value === 'function' ? value(prev[key]) : value,
    }));
  }

  function changeFossCount(amount) {
    changeAttribute('fossServer', (prev) => prev + amount);
  }
  function changeProServerCount(amount) {
    changeAttribute('proServer', (prev) => prev + amount);
  }
  function changeMoney(money) {
    changeAttribute('money', (prev) => prev + money);
  }
  function changeEnergy(energy) {
    changeAttribute('energy', (prev) => prev + energy);
  }

  function addAlert(alert) {
    setAlerts((prev) => [...prev, { id: crypto.randomUUID(), ...alert }]);
  }
  function removeAlert(alert) {
    setAlerts((prev) => prev.filter((el) => el.id !== alert.id));
  }

  function loop() {
    setData((prev)=>({
     ...prev,
     money:prev.money-1+50*prev.fossServer+ -25*prev.proServer
    }))
    const alertTypes = Object.keys(ALERTS);

    if (Math.random() < 0.2) {
      const position = ALERT_POSITIONS[Math.floor(Math.random() * ALERT_POSITIONS.length)];

      if (alerts.find((a) => a.x === position.x && a.y === position.y)) {
        return;
      }

      addAlert({
        type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
        ...position,
      });
    }
  }

  return (
    <GameManagerContext.Provider value={{ data, alerts, currentModal, setCurrentModal,changeMoney,changeEnergy,removeAlert,changeFossCount,changeProServerCount }}>
      {children}
    </GameManagerContext.Provider>
  );
}

export function useGameManager() {
  const context = useContext(GameManagerContext);
  if (!context) {
    throw new Error('useGameManager must be used within a GameManager');
  }
  return context;
}
