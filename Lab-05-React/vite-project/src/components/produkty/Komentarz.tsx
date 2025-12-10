import React, { useState } from 'react';
import type { Comment } from './comment'; // Użycie type-only import

interface KomentarzProps {
  commentData: Comment;
}

const Komentarz: React.FC<KomentarzProps> = ({ commentData }) => {
  const [currentLikes, setCurrentLikes] = useState(commentData.likes);

  const handleLike = () => {
    setCurrentLikes(prevLikes => prevLikes + 1);
  };

  const handleDislike = () => {
    setCurrentLikes(prevLikes => Math.max(0, prevLikes - 1));
  };

  return (
    <div className='counter-display'>
      <div style={{ fontWeight: 'bold', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px' }}>
        👤 {commentData.user.fullName} (@{commentData.user.username})
      </div>
      
      <p>💬 {commentData.body}</p>
      <div style={{ marginTop: '10px', fontSize: '0.9em', color: '#777' }}>
        Post ID: {commentData.postId} | Comment ID: {commentData.id}
      </div>

      <div style={{ marginTop: '10px' }}>
        <span style={{ marginRight: '15px', fontWeight: 'bold', color: 'cornflowerblue' }}>
          👍 Polubienia: {currentLikes}
        </span>
        
        <button onClick={handleLike} style={{ backgroundColor: '#2ecc71', padding: '5px 10px', marginRight: '5px' }}>
          Łapka w górę
        </button>
        <button onClick={handleDislike} style={{ backgroundColor: 'tomato', padding: '5px 10px' }}>
          Łapka w dół
        </button>
      </div>
    </div>
  );
};

export default Komentarz;