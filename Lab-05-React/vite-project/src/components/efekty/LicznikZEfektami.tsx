import React, { useState, useEffect } from 'react';

const LicznikZEfektami: React.FC = () => {
  const [licznik, setLicznik] = useState(0);
  useEffect(() => {
    console.log('LicznikZEfektami: Hello world (Załadowano komponent)');
  }, []);

  useEffect(() => {
    if (licznik > 0) {
        console.log(`LicznikZEfektami: Licznik zwiększył się do ${licznik}`);
    }
    
    if (licznik === 0) {
        console.log(`LicznikZEfektami: Początkowa wartość licznika: ${licznik}`);
    }

  }, [licznik]);

  const handleDodaj = () => {
    setLicznik(prevLicznik => prevLicznik + 1);
  };

  return (
    <div className="task-section">
      <h3>Licznik z Efektami (Zadanie 6.1 - useEffect)</h3>
      <div className="counter-display">
        Wartość licznika: <span className="highlight">{licznik}</span> (Sprawdź konsolę!)
      </div>
      <button onClick={handleDodaj}>
        Dodaj
      </button>
    </div>
  );
};

export default LicznikZEfektami;