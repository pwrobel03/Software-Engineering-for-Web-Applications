import React, { useState, useMemo } from 'react';

const Logowanie: React.FC = () => {
  const [nazwaUzytkownika, setNazwaUzytkownika] = useState('');
  const [haslo, setHaslo] = useState('');
  const [powtorzHaslo, setPowtorzHaslo] = useState('');

  // 1. Logika wyłączania przycisku (disabled)
  const isButtonDisabled = useMemo(() => {
    return !nazwaUzytkownika || !haslo || !powtorzHaslo;
  }, [nazwaUzytkownika, haslo, powtorzHaslo]);

  const handleLogowanie = () => {
    // Sprawdzenie, czy hasła są zgodne
    if (haslo === powtorzHaslo) {
      alert('Zalogowano poprawnie');
    } else {
      alert('Hasła nie są zgodne');
    }
  };

  return (
    <div className="task-section">
      <h3>Logowanie (Zadanie 3.3 - Logika przycisku)</h3>

      <div className='task3-input'>
        <label htmlFor="nazwa-uzytkownika">Nazwa użytkownika:</label>
        <input 
          id="nazwa-uzytkownika" 
          type="text" 
          value={nazwaUzytkownika} 
          onChange={(e) => setNazwaUzytkownika(e.target.value)} 
          placeholder="Nazwa użytkownika"
          style={{ display: 'block', marginBottom: '10px' }}
        />
      </div>

      <div className='task3-input'>
        <label htmlFor="haslo-log">Hasło:</label>
        <input 
          id="haslo-log" 
          type="text" 
          value={haslo} 
          onChange={(e) => setHaslo(e.target.value)} 
          placeholder="Hasło"
          style={{ display: 'block', marginBottom: '10px' }}
        />
      </div>

      <div className='task3-input'>
        <label htmlFor="powtorz-haslo-log">Powtórz Hasło:</label>
        <input 
          id="powtorz-haslo-log" 
          type="text" 
          value={powtorzHaslo} 
          onChange={(e) => setPowtorzHaslo(e.target.value)} 
          placeholder="Powtórz hasło"
          style={{ display: 'block', marginBottom: '10px' }}
        />
      </div>
      
      <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap:"10px"}}>
          <button 
            onClick={handleLogowanie}
            disabled={isButtonDisabled} // Atrybut disabled
            style={{ backgroundColor: isButtonDisabled ? '#95a5a6' : '#2ecc71' }}
          >
            Logowanie
          </button>

          <p style={{ fontSize: '0.8em', color: '#7f8c8d' }}>
            {isButtonDisabled ? 'Wypełnij wszystkie pola, aby aktywować przycisk.' : ''}
          </p>
      </div>
     

    </div>
  );
};

export default Logowanie;