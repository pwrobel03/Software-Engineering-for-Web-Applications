import React, { useState, useEffect } from 'react';
import type { Comment, CommentsResponse } from './comment'; // Użycie type-only import
import Komentarz from './Komentarz';

const API_URL = 'https://dummyjson.com/comments';

const Komentarze: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log('🌐 Rozpoczynam pobieranie danych z:', API_URL);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Błąd HTTP: ${response.status}`);
        }
        const data: CommentsResponse = await response.json();
        setComments(data.comments);
      } catch (err) {
        console.error('Błąd podczas pobierania komentarzy:', err);
        setError(`Nie udało się załadować danych: ${err instanceof Error ? err.message : 'Nieznany błąd'}`);
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);
  return (
    <div>
      <h3>Lista Komentarzy</h3>
      
      {isLoading && <p style={{ color: 'cornflowerblue' }}>Ładowanie komentarzy...</p>}
      
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      {!isLoading && comments.length === 0 && !error && (
        <p>Brak komentarzy do wyświetlenia.</p>
      )}

      {/* Renderowanie komentarzy po pomyślnym załadowaniu */}
      <div style={{ maxHeight: '300px', overflowY: 'scroll', padding: '10px', border: '1px solid #eee' }}>
        {comments.map((comment) => (
          <Komentarz key={comment.id} commentData={comment} />
        ))}
      </div>
    </div>
  );
};

export default Komentarze;