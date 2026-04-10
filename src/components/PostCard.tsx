import React from 'react';

interface PostCardProps {
  title: string;
  body: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, body }) => {
  return (
    <div className="bg-white p-5 rounded-md border border-gray-200 shadow-sm flex flex-col gap-3 hover:border-gray-400 transition-colors">
      <h3 className="font-bold text-gray-900 leading-tight">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {body}
      </p>
    </div>
  );
};

export default PostCard;
