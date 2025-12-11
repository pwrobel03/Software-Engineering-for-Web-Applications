// src/blog/Article.tsx (Poprawiony, ostateczna wersja)

import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticles } from '../blog/utils';

const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const articleId = parseInt(id || '0');

  const article = useMemo(() => {
    const articles = getArticles(); 
    return articles.find(a => a.id === articleId) || null;
  }, [articleId]); // Zależność tylko od articleId

  if (!article) {
    return (
      <div className="blog-section">
        <p>Artykuł o ID: {articleId} nie został znaleziony.</p>
        <Link to="/blog">Powrót do listy</Link>
      </div>
    );
  }

  return (
    <div className="blog-section">
  
      <h2 style={{ color: '#2c3e50', marginTop: '10px' }}>{article.tytul}</h2>
      <p style={{ color: '#7f8c8d', fontStyle: 'italic' }}>ID artykułu: {article.id}</p>
      <div style={{ lineHeight: '1.6' }} className='display'>
        {article.tresc}
      </div>
      <Link to="/blog">
          <button style={{ margin:"0", marginTop: '30px' }}>Powrót do listy</button>
      </Link>
    </div>
  );
};

export default Article;