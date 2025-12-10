import React, { useState } from 'react';

const Licznik: React.FC = () => {
  const [licznik, setLicznik] = useState(0);

  // Funkcja zwiększająca licznik
  const handleDodaj = () => {
    setLicznik(prevLicznik => prevLicznik + 1);
  };

  return (
    <div className="task-section">
      <h3>Licznik (Zadanie 2.1 - Komponent z własnym przyciskiem)</h3>
      <div className="counter-display">
        Wartość licznika: <span className="highlight">{licznik}</span>
      </div>
      <button onClick={handleDodaj}>
        Dodaj
      </button>
    </div>
  );
};

export default Licznik;