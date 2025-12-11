import React from 'react';
import Produkt from './Produkt';

const Produkty: string[] = [
  'Chleb',
  'Mleko',
  'Jajka',
  'Ser',
  'Masło'
];

const NowyKoszyk: React.FC = () => {
  return (
    <div className="task-section">
      <h3>NowyKoszyk (Zadanie 1.2 - Dynamiczne generowanie)</h3>
      <p>Poniżej produkty wygenerowane dynamicznie z tablicy przy użyciu funkcji `map`:</p>
      
      {/* Użycie funkcji map do iteracji po tablicy */}
      {Produkty.map((nazwa, index) => (
        // Klucz (key) jest wymagany przy renderowaniu list
        <Produkt key={index} nazwa={nazwa} />
      ))}
    </div>
  );
};

export default NowyKoszyk;