import React from 'react';
import Produkt from './Produkt';

const Koszyk: React.FC = () => {
  return (
    <div className="task-section">
      <h3>Koszyk (Zadanie 1.1)</h3>
      <p>Poniżej 5 produktów utworzonych statycznie:</p>
      <Produkt nazwa="Jabłko" />
      <Produkt nazwa="Gruszka" />
      <Produkt nazwa="Banany" />
      <Produkt nazwa="Pomarańcze" />
      <Produkt nazwa="Śliwki" />
    </div>
  );
};

export default Koszyk;