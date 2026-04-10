import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import StatusMessage from '../components/StatusMessage';
import PostCard from '../components/PostCard';
import AddPostForm from '../components/AddPostForm';
import Button from '../components/Button';
import { useStore, type User } from '../store/useStore';

const UserPosts: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const { posts, apiIsLoading, error, fetchUserWithPosts, addPost } = useStore();

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const userData = await fetchUserWithPosts(id);
        if (userData) setUser(userData);
      }
    };
    loadData();
  }, [id, fetchUserWithPosts]);

  const handleAddPost = (title: string, body: string) => {
    addPost({
      id: Date.now(),
      userId: Number(id),
      title: title,
      body: body
    });
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="w-fit text-[10px] uppercase tracking-widest px-4 py-1.5"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Users
        </Button>

        <StatusMessage 
          isLoading={apiIsLoading} 
          error={error} 
          loadingText="Loading user information..." 
        />

        {!apiIsLoading && !error && user && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6 py-4 border-b border-gray-100 mb-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
                <div>
                  <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{user.name}</h1>
                  <p className="text-lg text-gray-500 font-medium">@{user.username}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-xl font-bold text-gray-800">{user.company.name}</p>
                  <p className="text-gray-500 italic text-sm">"{user.company.catchPhrase}"</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-12 mt-4">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">Email</span>
                  <span className="text-gray-800 font-medium mt-1">{user.email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">Phone</span>
                  <span className="text-gray-800 font-medium mt-1 font-mono">{user.phone}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">Website</span>
                  <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="text-gray-900 font-bold mt-1 hover:underline">
                    {user.website}
                  </a>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">Location</span>
                  <span className="text-gray-800 font-medium mt-1">{user.address.city}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <AddPostForm onAddPost={handleAddPost} />
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">Posts</h2>
                <span className="text-sm font-bold text-gray-400">
                  {posts.length} TOTAL
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.id} title={post.title} body={post.body} />
                ))}
              </div>
              
              {posts.length === 0 && (
                <div className="py-20 text-center text-gray-400 font-medium">
                  No posts yet. Be the first to add one!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserPosts;
