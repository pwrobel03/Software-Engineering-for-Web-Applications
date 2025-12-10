import React from 'react';

// Interfejs dla propsów
interface PrzyciskProps {
  onClickHandler: () => void;
  label: string;
}

const Przycisk: React.FC<PrzyciskProps> = ({ onClickHandler, label }) => {
  return (
    <button onClick={onClickHandler}>
      {label}
    </button>
  );
};

export default Przycisk;