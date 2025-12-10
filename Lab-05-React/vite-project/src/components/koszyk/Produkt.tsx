import React from 'react';

// Definicja interfejsu dla propsów
interface ProduktProps {
  nazwa: string;
}

const Produkt: React.FC<ProduktProps> = ({ nazwa }) => {
  return (
    <div className="product-item">
    🧸 Produkt: **{nazwa}**
    </div>
  );
};

export default Produkt;