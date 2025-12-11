import React from 'react';

const Ternary: React.FC = () => {
  const a: boolean = true;
  const b: boolean = false;

  return (
    <div className="task-section">
      <h3>Ternary (Zadanie 4.1 - Operator Warunkowy)</h3>
      {/* Warunek dla zmiennej 'a' */}
      <div className='counter-display'>
        <p>Zmienna a jest ustawiona na: <span className='highlight'>{a.toString()}</span></p>
        {a ? (
          <div style={{ color: '#2ecc71' }}>Stwierdzenie a jest prawdziwe</div>
        ) : (
          <div style={{ color: 'tomato' }}>Stwierdzenie a jest fałszywe</div>
        )}
      </div>

      {/* Warunek dla zmiennej 'b' */}
      <div className='counter-display'>
        <p>Zmienna b jest ustawiona na: <span className='highlight'>{b.toString()}</span></p>
        {b ? (
          <div style={{ color: '#2ecc71' }}>Stwierdzenie b jest prawdziwe</div>
        ) : (
          <div style={{ color: 'tomato' }}>Stwierdzenie b jest fałszywe</div>
        )}
      </div>
    </div>
  );
};

export default Ternary;