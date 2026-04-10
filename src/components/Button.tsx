import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-4 py-2 rounded-md font-semibold transition-all duration-200 focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm";
  
  const variants = {
    primary: "bg-gray-900 text-white hover:bg-black focus:ring-gray-900 border border-transparent",
    outline: "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-900"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span>Loading...</span>
      ) : children}
    </button>
  );
};

export default Button;
