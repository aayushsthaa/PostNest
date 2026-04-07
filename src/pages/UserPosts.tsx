import React from 'react';
import { useParams } from 'react-router-dom';

const UserPosts = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800">User Posts Page</h1>
    </div>
  );
};

export default UserPosts;
