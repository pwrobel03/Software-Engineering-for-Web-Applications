import React, { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'licznikValue';
const LicznikLocalStorage: React.FC = () => {
  const getInitialState = (): number => {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedValue ? parseInt(storedValue) : 0;
  };
  
  const [licznik, setLicznik] = useState<number>(getInitialState);
  useEffect(() => {
    console.log(`Zapisywanie licznika: ${licznik} do LocalStorage`);
    localStorage.setItem(LOCAL_STORAGE_KEY, licznik.toString());
  }, [licznik]); // Zależność od licznika

  const handleDodaj = () => {
    setLicznik(prevLicznik => prevLicznik + 1);
  };

  return (
    <div>
      <div className='display'>
        Wartość licznika: <span className="highlight">{licznik}</span>
      </div>
      <div style={{display:'flex', flexDirection:'row', gap:'10px', }}>
          <button onClick={handleDodaj} style={{ backgroundColor: '#2ecc71', color: 'white'}}>
            Dodaj
          </button>
          <p style={{ fontSize: '0.9em', color: '#7f8c8d', marginTop: '10px' }}>
            Spróbuj odświeżyć stronę lub zamknąć i otworzyć przeglądarkę – stan zostanie zachowany.
          </p>
      </div>
    </div>
  );
};

export default LicznikLocalStorage;