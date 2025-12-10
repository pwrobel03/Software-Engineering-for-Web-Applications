// src/blog/Article.tsx (Poprawiony, ostateczna wersja)

import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Article } from '../blog/utils';
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
      <Link to="/blog" style={{ fontSize: '0.9em', color: '#3498db' }}>&larr; Powrót do listy</Link>
      <h2 style={{ color: '#2c3e50', marginTop: '10px' }}>{article.tytul}</h2>
      <p style={{ color: '#7f8c8d', fontStyle: 'italic' }}>ID artykułu: {article.id}</p>
      <div style={{ border: '1px solid #ddd', padding: '15px', marginTop: '20px', lineHeight: '1.6' }}>
        {article.tresc}
      </div>
    </div>
  );
};

export default Article;