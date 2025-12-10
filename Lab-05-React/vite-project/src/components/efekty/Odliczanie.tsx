import React, { useState, useEffect, useRef, useCallback } from 'react';

const INITIAL_TIME = 15.0; 

const Odliczanie: React.FC = () => {
  const [licznik, setLicznik] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Używamy useRef do przechowywania ID interwału, aby był dostępny w całej funkcji.
  const intervalRef = useRef<number | null>(null);

  // Funkcja START/STOP
  const toggleTimer = useCallback(() => {
    if (isFinished) return;
    setIsRunning(prev => !prev);
  }, [isFinished]);

  useEffect(() => {
    if (isRunning && licznik > 0) {
      intervalRef.current = setInterval(() => {
        setLicznik(prevLicznik => {
          const newLicznik = prevLicznik - 0.1;
          if (newLicznik <= 0) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            setIsRunning(false);
            setIsFinished(true);
            return 0.0;
          }

          return newLicznik;
        });
      }, 100) as unknown as number; // Rzutowanie dla czystości TypeScript

      // Cleanup Function: Wymagane, aby zatrzymać interwał
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    } else if (!isRunning && intervalRef.current) {
      // Jeśli isRunning = false (przez przycisk STOP), czyścimy interwał
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [isRunning, licznik]);

  const formattedLicznik = licznik.toFixed(1);
  const buttonText = isFinished 
    ? 'Odliczanie zakończone'
    : isRunning 
      ? 'STOP' 
      : 'START';
  
  const buttonColor = isFinished ? '#7f8c8d' : isRunning ? 'tomato' : '#2ecc71';

  return (
    <div className="task-section">
      <h3>Odliczanie (Zadanie 6.3 - Timer z useEffect i Cleanup)</h3>
      
      <div className='counter-display' style={{ fontSize: '2em', fontWeight: 'bold', margin: '20px 0', color: isFinished ? 'tomato' : '#2c3e50' }}>
        ⏳ {formattedLicznik} sek.
      </div>

      <div style={{display:'flex', alignItems:'center', flexDirection:'row', gap:'10px'}}>
          <button
          onClick={toggleTimer}
          disabled={isFinished}
          style={{ backgroundColor: buttonColor }}
          >
          {buttonText}
          </button>

          <p style={{ fontSize: '0.8em', color: '#7f8c8d', marginTop: '10px' }}>
            Kliknij START, aby rozpocząć odliczanie.
          </p>
      </div>
    </div>
  );
};

export default Odliczanie;