import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Import komponentów, które reprezentują strony (VALUE imports)
import Home from './Home';
import ArticleList from './ArticleList';
import Article from './Article';
import AddArticle from './AddArticle';

// Komponent Layout zapewnia stały pasek nawigacyjny
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{ padding: '20px', border: '2px solid #bdc3c7', margin: '20px 0', borderRadius: '8px' }}>
        <nav style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #bdc3c7', display: 'flex', gap: '20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#2c3e50', fontWeight: 'bold' }}>Strona Główna</Link>
            <Link to="/blog" style={{ textDecoration: 'none', color: '#2c3e50', fontWeight: 'bold' }}>Blog</Link>
            <Link to="/dodaj" style={{ textDecoration: 'none', color: '#2ecc71', fontWeight: 'bold' }}>Dodaj Artykuł</Link>
        </nav>
        {children}
    </div>
);

const BlogRouter: React.FC = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        {/* Ścieżka główna: / */}
        <Route path="/" element={<Home />} />
        
        {/* Lista artykułów: /blog */}
        <Route path="/blog" element={<ArticleList />} />
        
        {/* Detale artykułu: /article/123 (używa parametru :id) */}
        <Route path="/article/:id" element={<Article />} />
        
        {/* Dodawanie nowego artykułu: /dodaj */}
        <Route path="/dodaj" element={<AddArticle />} />
        
        {/* Catch-all dla nieznanych ścieżek */}
        <Route path="*" element={<div className="blog-section"><h1>404</h1><p>Strona nie istnieje</p></div>} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default BlogRouter;