import React, { useState } from 'react';
import type { Student } from './student';

interface DodawanieProps {
  onAddStudent: (newStudent: Student) => void;
}

const Dodawanie: React.FC<DodawanieProps> = ({ onAddStudent }) => {
  const [imie, setImie] = useState('');
  const [nazwisko, setNazwisko] = useState('');
  const [rocznik, setRocznik] = useState(''); // Stan jako string, aby kontrolować input

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // A. Walidacja: Sprawdzenie, czy wszystkie pola są wypełnione
    if (!imie || !nazwisko || !rocznik) {
      setError('Wszystkie pola muszą być wypełnione.');
      return;
    }

    const rocznikNumber = parseInt(rocznik);

    // B. Walidacja: Sprawdzenie, czy rocznik jest liczbą
    if (isNaN(rocznikNumber)) {
      setError('Rocznik musi być poprawną liczbą.');
      return;
    }

    onAddStudent({ imie, nazwisko, rocznik: rocznikNumber });

    // Wyczyść formularz
    setImie('');
    setNazwisko('');
    setRocznik('');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginTop: '20px' }}>
      <p style={{fontWeight: 'bold'}}>Dodaj nowego studenta</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Imię" 
          value={imie} 
          onChange={(e) => setImie(e.target.value)} 
          style={{ margin: '5px', padding: '5px' }}
        />
        <input 
          type="text" 
          placeholder="Nazwisko" 
          value={nazwisko} 
          onChange={(e) => setNazwisko(e.target.value)} 
          style={{ margin: '5px', padding: '5px' }}
        />
        <input 
          type="text" // Pozostawiamy text, aby móc kontrolować walidację 'isNaN'
          placeholder="Rocznik (Liczba)" 
          value={rocznik} 
          onChange={(e) => setRocznik(e.target.value)} 
          style={{ margin: '5px', padding: '5px' }}
        />
        <button type="submit" style={{ backgroundColor: '#2ecc71' }}>Dodaj</button>
      </form>
      {error && <p style={{ color: 'tomato', marginTop: '10px' }}>Błąd: {error}</p>}
    </div>
  );
};

export default Dodawanie;