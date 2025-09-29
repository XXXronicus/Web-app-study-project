import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import PostList from './PostList';
import PostForm from './PostForm';
import PublicFeed from './PublicFeed';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('my-posts');
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowPostForm(true);
    setActiveTab('my-posts');
  };

  const handlePostSuccess = () => {
    setShowPostForm(false);
    setEditingPost(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCancel = () => {
    setShowPostForm(false);
    setEditingPost(null);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar />
      
      <div style={{ padding: '20px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h1>Личный кабинет</h1>
          {!showPostForm && activeTab === 'my-posts' && (
            <button 
              onClick={() => setShowPostForm(true)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              📝 Добавить пост
            </button>
          )}
        </div>
        {!showPostForm && (
          <div style={{ 
            display: 'flex', 
            marginBottom: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <button
              onClick={() => setActiveTab('my-posts')}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: activeTab === 'my-posts' ? '#007bff' : 'transparent',
                color: activeTab === 'my-posts' ? 'white' : '#333',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              📋 Мои посты
            </button>
            <button
              onClick={() => setActiveTab('public-feed')}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: activeTab === 'public-feed' ? '#28a745' : 'transparent',
                color: activeTab === 'public-feed' ? 'white' : '#333',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              📰 Публичная лента
            </button>
          </div>
        )}
        {showPostForm ? (
          <PostForm 
            post={editingPost}
            onSuccess={handlePostSuccess}
            onCancel={handleCancel}
          />
        ) : (
          <>
            {activeTab === 'my-posts' && (
              <PostList 
                onEditPost={handleEditPost}
                refreshTrigger={refreshTrigger}
              />
            )}
            {activeTab === 'public-feed' && (
              <PublicFeed />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;