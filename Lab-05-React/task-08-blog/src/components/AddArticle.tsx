// src/blog/AddArticle.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveArticle } from '../blog/utils';

const AddArticle: React.FC = () => {
  const [tytul, setTytul] = useState('');
  const [tresc, setTresc] = useState('');
  const navigate = useNavigate(); // Hook do programowego przekierowania

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tytul || !tresc) {
      alert('Tytuł i treść nie mogą być puste!');
      return;
    }

    // Wywołanie funkcji zapisującej i przekierowującej
    saveArticle(tytul, tresc, navigate);
  };

  return (
    <div className="blog-section">
      <h2>➕ Dodaj Nowy Artykuł</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <label>Tytuł:</label>
        <input 
          type="text" 
          value={tytul} 
          onChange={(e) => setTytul(e.target.value)} 
          placeholder="Wprowadź tytuł artykułu"
          style={{ padding: '8px', border: '1px solid #ccc' }}
        />

        <label>Treść:</label>
        <textarea 
          value={tresc} 
          onChange={(e) => setTresc(e.target.value)} 
          placeholder="Wprowadź pełną treść artykułu"
          rows={6}
          style={{ padding: '8px', border: '1px solid #ccc', resize: 'vertical' }}
        />

        <button 
          type="submit" 
          style={{cursor: 'pointer', maxWidth: '150px', paddingLeft: '30px', paddingRight: '30px', height:'40px'}}
        >
          DODAJ
        </button>
      </form>
    </div>
  );
};

export default AddArticle;