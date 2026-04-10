import React from 'react';

interface StatusMessageProps {
  isLoading?: boolean;
  error?: string | null;
  loadingText?: string;
}

import { Loader2, AlertCircle } from 'lucide-react';

const StatusMessage: React.FC<StatusMessageProps> = ({ 
  isLoading, 
  error, 
  loadingText = "Loading results..." 
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-xs uppercase tracking-[0.2em] font-bold italic">{loadingText}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center gap-3 py-6 px-10 bg-red-50/50 border border-red-100 rounded-md text-red-600 w-fit mx-auto">
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm font-medium">{error}</span>
      </div>
    );
  }

  return null;
};

export default StatusMessage;
