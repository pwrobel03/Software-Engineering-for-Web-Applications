// src/blog/ArticleList.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../blog/utils';
import type{ Article } from '../blog/utils';

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  
  // Pobieranie artykułów raz przy załadowaniu i za każdym razem, gdy wracamy do tej strony
  if (typeof window !== 'undefined') {
    setArticles(getArticles());
  }

  if (articles.length === 0) {
    return <div className="blog-section">Brak artykułów do wyświetlenia.</div>;
  }

  return (
    <div className="blog-section">
      <h2>📚 Lista wszystkich artykułów</h2>
      <Link to="/dodaj" style={{ float: 'right', textDecoration: 'none' }}>
        <button style={{ backgroundColor: '#2ecc71', marginBottom: '15px' }}>+ Dodaj nowy</button>
      </Link>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {articles.map((article) => (
          <li key={article.id} style={{ border: '1px dashed #ccc', padding: '10px', margin: '10px 0', backgroundColor: '#f9f9f9' }}>
            <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
              {article.tytul}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;