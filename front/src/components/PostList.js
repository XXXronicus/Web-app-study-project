import React, { useState, useEffect } from 'react';
import { postsAPI } from '../services/api';

const PostList = ({ onEditPost, refreshTrigger }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
  fetchPosts();
  }, [refreshTrigger]); 

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getPosts();
      setPosts(response.data);
      setError('');
    } catch (err) {
      setError('Ошибка при загрузке постов');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот пост?')) {
      try {
        await postsAPI.deletePost(postId);
        fetchPosts();
      } catch (err) {
        setError('Ошибка при удалении поста');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div>Загрузка постов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
        {error}
        <button 
          onClick={fetchPosts}
          style={{ marginLeft: '10px', padding: '5px 10px' }}
        >
          Повторить
        </button>
      </div>
    );
  }

  return (
    <div>
      {posts.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3>У вас пока нет постов</h3>
          <p>Создайте свой первый пост!</p>
        </div>
      ) : (
        <div>
          <h2>Мои посты ({posts.length})</h2>
          {posts.map((post) => (
            <div 
              key={post.id}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                marginBottom: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                border: '1px solid #e0e0e0'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                    {post.title}
                  </h3>
                  <p style={{ 
                    margin: '0 0 10px 0', 
                    color: '#666',
                    lineHeight: '1.5'
                  }}>
                    {post.content}
                  </p>
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    <div>Создан: {formatDate(post.created_at)}</div>
                    {post.updated_at !== post.created_at && (
                      <div>Обновлен: {formatDate(post.updated_at)}</div>
                    )}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', marginLeft: '15px' }}>
                  <button
                    onClick={() => onEditPost(post)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;