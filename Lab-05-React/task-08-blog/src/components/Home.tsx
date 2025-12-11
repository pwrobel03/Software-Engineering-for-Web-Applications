import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <div className="blog-section">
    <h2>Witaj na Stronie Głównej Bloga!</h2>
    <p className='display'>To jest Twoja aplikacja blogowa wykorzystująca React Router i Local Storage.</p>
    <Link to="/blog" style={{ textDecoration: 'none' }}>
      <button style={{ backgroundColor: '#2ecc71', marginTop: '20px' }}>
        Przejdź do listy artykułów
      </button>
    </Link>
  </div>
);

export default Home;