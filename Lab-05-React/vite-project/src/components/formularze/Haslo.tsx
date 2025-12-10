import React, { useState, useMemo } from 'react';

const Haslo: React.FC = () => {
  const [haslo, setHaslo] = useState('');
  const [powtorzHaslo, setPowtorzHaslo] = useState('');

  // Użycie useMemo do obliczenia komunikatu o błędzie,
  // aby komunikat był aktualizowany tylko wtedy, gdy zmieni się stan haseł.
  const komunikat = useMemo(() => {
    const hasloWpisane = haslo.length > 0 || powtorzHaslo.length > 0;

    if (!hasloWpisane) {
      return 'Proszę wprowadzić hasło';
    }
    
    if (haslo !== powtorzHaslo) {
      return 'Hasła nie są zgodne';
    }

    return 'Hasła są zgodne'; 
  }, [haslo, powtorzHaslo]);

  // Kolor komunikatu w zależności od stanu walidacji
  const komunikatStyle: React.CSSProperties = {
    color: komunikat === 'Proszę wprowadzić hasło' || komunikat === 'Hasła nie są zgodne' ? 'red' : '#2ecc71',
    marginTop: '10px',
    fontWeight: 'bold'
  };

  return (
    <div className="task-section">
      <h3>Hasło (Zadanie 3.2 - Walidacja na bieżąco)</h3>

      <div className='task3-input'>
        <label htmlFor="haslo">Hasło:</label>
        <input 
          id="haslo" 
          type="text" 
          value={haslo} 
          onChange={(e) => setHaslo(e.target.value)} 
          placeholder="Wprowadź hasło"
          style={{ display: 'block', marginBottom: '10px' }}
        />
      </div>

      <div className='task3-input'>
        <label htmlFor="powtorz-haslo">Powtórz Hasło:</label>
        <input 
          id="powtorz-haslo" 
          type="text" 
          value={powtorzHaslo} 
          onChange={(e) => setPowtorzHaslo(e.target.value)} 
          placeholder="Powtórz hasło"
          style={{ display: 'block', marginBottom: '10px' }}
        />
      </div>

      <div style={komunikatStyle}>
        {komunikat}
      </div>
    </div>
  );
};

export default Haslo;