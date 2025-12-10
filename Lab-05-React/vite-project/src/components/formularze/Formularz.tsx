import React, { useState } from 'react';

const Formularz: React.FC = () => {
  const [tekst, setTekst] = useState('');

  // Handler aktualizujący stan przy każdej zmianie inputu
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTekst(event.target.value);
  };

  return (
    <div className="task-section">
      <h3>Formularz (Zadanie 3.1 - Kontrolowany input)</h3>
      
      <label htmlFor="input-3-1">Wpisz tekst:</label>
      <input
        id="input-3-1"
        type="text"
        style={{marginLeft: "15px"}}
        value={tekst} // Kontrolowanie wartości przez stan
        onChange={handleInputChange} // Wywołanie handlera przy zmianie
        placeholder="Wpisz tutaj..."
      />

      <div style={{ marginTop: '15px', borderBottom: '1px solid #ccc', padding: '10px' }}>
        Replikacja: <span className="highlight">{tekst}</span>
      </div>
    </div>
  );
};

export default Formularz;