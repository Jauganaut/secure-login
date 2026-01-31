
import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';

interface AlibabaThemeProps {
  prefilledEmail?: string;
}

const AlibabaTheme: React.FC<AlibabaThemeProps> = ({ prefilledEmail }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-[440px]">
          <LoginForm prefilledEmail={prefilledEmail} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AlibabaTheme;
