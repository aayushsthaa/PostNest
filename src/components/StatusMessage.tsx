import React from 'react';

interface StatusMessageProps {
  isLoading?: boolean;
  error?: string | null;
  loadingText?: string;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ 
  isLoading, 
  error, 
  loadingText = "Loading users..." 
}) => {
  if (isLoading) {
    return (
      <div className="py-4 text-gray-500 text-sm italic">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 text-red-500 text-sm">
        Error: {error}
      </div>
    );
  }

  return null;
};

export default StatusMessage;
