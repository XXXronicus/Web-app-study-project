import React, { useState, useEffect } from 'react';
import { postsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCurrentUser } from '../hooks/useCurrentUser';

const PublicFeed = () => {
  const currentUser = useCurrentUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchPublicFeed();
  }, []);

  const fetchPublicFeed = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getPublicFeed();
      setPosts(response.data.results || response.data);
      setError('');
    } catch (err) {
      setError('Ошибка при загрузке ленты');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

    const isAuthor = (postAuthor) => {
    return postAuthor === currentUser;
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div>Загрузка публичной ленты...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
        {error}
        <button 
          onClick={fetchPublicFeed}
          style={{ marginLeft: '10px', padding: '5px 10px' }}
        >
          Повторить
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>📰 Публичная лента</h2>
        <button 
          onClick={fetchPublicFeed}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Обновить
        </button>
      </div>

      {posts.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3>В ленте пока нет постов</h3>
          <p>Будьте первым, кто поделится чем-то интересным!</p>
        </div>
      ) : (
        <div>
          {posts.map((post) => (
            <div 
              key={post.id}
              style={{
                backgroundColor: 'white',
                padding: '25px',
                marginBottom: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e8e8e8',
                position: 'relative'
              }}
            >
              {/* Бейдж автора */}
              {isAuthor(post.author) && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  Ваш пост
                </div>
              )}
              
              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ 
                  margin: '0 0 10px 0', 
                  color: '#333',
                  fontSize: '20px'
                }}>
                  {post.title}
                </h3>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '14px',
                  color: '#666'
                }}>
                  <span>
                    <strong>Автор:</strong> {post.author}
                  </span>
                  <span>
                    {formatDate(post.created_at)}
                  </span>
                </div>
              </div>
              
              <p style={{ 
                margin: '0', 
                color: '#444',
                lineHeight: '1.6',
                fontSize: '16px'
              }}>
                {post.content}
              </p>
              

              {isAuthor(post.author) && (
                <div style={{ 
                  display: 'flex', 
                  gap: '10px', 
                  marginTop: '15px',
                  paddingTop: '15px',
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <button
                    onClick={() => {}}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    ✏️ Редактировать
                  </button>
                  <button
                    onClick={() => {}}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    🗑️ Удалить
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicFeed;