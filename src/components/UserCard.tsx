import React from 'react';
import { Mail, Briefcase } from 'lucide-react';
import Button from './Button';

interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
    company: {
      name: string;
    };
  };
  onViewPosts: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onViewPosts }) => {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between gap-5 transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-gray-900 leading-tight">{user.name}</h3>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="w-4 h-4 text-gray-400" /> 
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Briefcase className="w-4 h-4 text-gray-400" /> 
            <span className="truncate">{user.company.name}</span>
          </div>
        </div>
      </div>
      <Button 
        variant="primary" 
        className="w-full text-xs font-bold uppercase tracking-widest py-2.5" 
        onClick={() => onViewPosts(user.id)}
      >
        View Profile
      </Button>
    </div>
  );
};

export default UserCard;

