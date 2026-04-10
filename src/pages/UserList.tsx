import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Layout from '../components/Layout';
import Input from '../components/Input';
import StatusMessage from '../components/StatusMessage';
import UserCard from '../components/UserCard';
import Button from '../components/Button';
import { useStore } from '../store/useStore';

const UserList: React.FC = () => {
  const { users, apiIsLoading, error, fetchUsers } = useStore();
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const lowerQ = searchTerm.toLowerCase();
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(lowerQ) || 
    user.email.toLowerCase().includes(lowerQ)
  );

  return (
    <Layout>
      <div className="flex flex-col mb-4">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <Input 
          icon={Search}
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <StatusMessage isLoading={apiIsLoading} error={error} loadingText="Loading users..." />

      {!apiIsLoading && !error && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  onViewPosts={(id) => navigate(`/users/${id}`)} 
                />
              ))
            ) : (
              <div className="py-12 bg-white rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
                <Search className="w-12 h-12 text-gray-300 mb-2" />
                <p className="text-gray-500 font-medium">No users found matching "{searchTerm}"</p>
              </div>
            )}
          </div>

          <div className="hidden md:block overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-500">Name</th>
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-500">Email</th>
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-500">Company</th>
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 text-sm">
                      <td className="py-5 px-6 font-bold text-gray-900">{user.name}</td>
                      <td className="py-5 px-6 text-gray-500 font-medium">{user.email}</td>
                      <td className="py-5 px-6 text-gray-400 italic">
                        {user.company.name}
                      </td>
                      <td className="py-5 px-6 text-right">
                        <Button 
                          variant="primary"
                          onClick={() => navigate(`/users/${user.id}`)}
                          className="text-[10px] uppercase tracking-[0.15em] py-1.5 px-4"
                        >
                          View Profile
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 px-6 text-center text-gray-500">
                      No users found matching "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserList;
