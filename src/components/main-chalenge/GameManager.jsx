import { createContext, useContext, useEffect, useState } from 'react';
import { ALERT_POSITIONS, ALERTS } from './constants';

export const GameManagerContext = createContext();

export default function GameManager({ children }) {
  const [data, setData] = useState({
    money: 0,
    energy: 0,
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

  function changeMoney(money) {
    changeAttribute('money', (prev) => prev - money);
  }
  function changeEnergy(energy) {
    changeAttribute('energy', (prev) => prev - energy);
  }

  function addAlert(alert) {
    setAlerts((prev) => [...prev, { id: crypto.randomUUID(), ...alert }]);
  }
  function removeAlert(alert) {
    setAlerts((prev) => prev.filter(el=>el.id!== alert.id));
  }

  function loop() {
    changeMoney(50);

    console.log(data.money);
    const alertTypes = Object.keys(ALERTS);
    addAlert({
      type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
      ...ALERT_POSITIONS[Math.floor(Math.random() * ALERT_POSITIONS.length)],
    });
  }

  return (
    <GameManagerContext.Provider value={{ data, alerts, currentModal, setCurrentModal,changeMoney,changeEnergy,removeAlert }}>
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
