// src/blog/ArticleList.tsx (Poprawiona wersja usuwająca useEffect do ładowania)

import React, { useState } from 'react'; // Usuwamy useEffect
import { Link } from 'react-router-dom';
import { getArticles } from '../blog/utils';
import type { Article } from '../blog/blog'; // Prawidłowa ścieżka

const ArticleList: React.FC = () => {
  // Ładujemy dane z LocalStorage tylko raz, podczas inicjalizacji stanu
  const [articles] = useState<Article[]>(getArticles);  
  if (articles.length === 0) {
    return (
      <div className="blog-section">
        Brak artykułów do wyświetlenia.
        <Link to="/dodaj">Dodaj pierwszy artykuł!</Link>
      </div>
    );
  }

  return (
    <div className="blog-section">
      <h2>📚 Lista wszystkich artykułów</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {articles.map((article) => (
          <li key={article.id} className='display'>
            <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
              {article.tytul}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/dodaj" style={{ float: 'right', textDecoration: 'none' }}>
          <button style={{ margin:"0", marginBottom: '15px' }}>+ Dodaj nowy</button>
      </Link>
    </div>
  );
};

export default ArticleList;