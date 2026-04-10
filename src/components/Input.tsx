import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  icon: Icon,
  className = '', 
  ...props 
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        <input 
          className={`w-full border border-gray-300 rounded py-2 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black ${Icon ? 'pl-10 pr-3' : 'px-3'} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
};

export default Input;
