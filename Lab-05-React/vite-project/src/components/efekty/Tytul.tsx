import React, { useState, useEffect } from 'react';

const Tytul: React.FC = () => {
  const [tytul, setTytul] = useState('Domyślny Tytuł Strony');

  useEffect(() => {
    document.title = tytul;
    console.log(`📄 Tytuł strony został zmieniony na: "${tytul}"`);
  }, [tytul]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTytul(e.target.value);
  };

  return (
    <div className="task-section">
      <h3>Tytuł Strony (Zadanie 6.2 - useEffect na document.title)</h3>
      <div className="counter-display">
          <label htmlFor="title-input">Nowy tytuł strony:</label>
          <input
            id="title-input"
            type="text"
            value={tytul}
            onChange={handleInputChange}
            placeholder="Wpisz nowy tytuł..."
            style={{ margin: '5px', padding: '5px', display: 'block', width: '90%' }}
          />
          <p style={{ marginTop: '10px' }}>
            Tytuł w karcie przeglądarki to teraz: <span className="highlight">{tytul}</span>
          </p>
      </div>
    </div>
  );
};

export default Tytul;