import React from 'react';

interface LayoutProps {
  children: React.ReactNode,
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 w-full max-w-5xl mx-auto flex flex-col gap-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
