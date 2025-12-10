import React, { useState } from 'react';

// Interfejs dla obiektu produktu
interface ProduktState {
  nazwa: string;
  cena: number;
}

const Aktualizacja: React.FC = () => {
  const [produkt, setProdukt] = useState<ProduktState>({
    nazwa: 'Pomidor',
    cena: 50,
  });

  const zmienCene = () => {
    // Użycie funkcji 'prev' oraz Spread Operatora (...)
    // To zapobiega utracie pola 'nazwa' podczas aktualizacji stanu.
    setProdukt(prevProdukt => ({
      ...prevProdukt,
      cena: 100,
    }));
  };

  return (
    <div className="task-section">
      <h3>Aktualizacja (Zadanie 4.2 - Spread Operator)</h3>

      <div className='counter-display'>
        Aktualnie <span className='highlight'>{produkt.nazwa}</span> kosztuje <span className="highlight">{produkt.cena}</span> jednostek.
      </div>
      
      <button onClick={zmienCene} style={{ marginTop: '15px' }}>
        Zmień cenę na 100
      </button>

      <p style={{ fontSize: '0.8em', color: '#7f8c8d' }}>
        * Stan: `{JSON.stringify(produkt)}`
      </p>
    </div>
  );
};

export default Aktualizacja;