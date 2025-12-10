import React, { useState } from 'react';
import Przycisk from './Przycisk';

const NowyLicznik: React.FC = () => {
  const [licznik, setLicznik] = useState(0);

  // Funkcja inkrementująca stan, przekazywana jako prop
  const inkrementuj = () => {
    setLicznik(prevLicznik => prevLicznik + 1);
  };

  return (
    <div className="task-section">
      <h3>NowyLicznik (Zadanie 2.2 - Funkcja jako Prop)</h3>
      <div className="counter-display">
        Wartość licznika: <span className="highlight">{licznik}</span>
      </div>
      <Przycisk onClickHandler={inkrementuj} label="Dodaj z zewnątrz" />
    </div>
  );
};

export default NowyLicznik;