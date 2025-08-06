import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Database, 
  Shuffle,
  FileSpreadsheet, 
  Brain, 
  Users, 
  Settings, 
  LogOut,
  Globe
} from 'lucide-react';
import "../../styles/header.css";

interface HeaderProps {
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('FR');
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Tableau de bord', path: '/dashboard' },
    { id: 'datasources', icon: Database, label: 'Sources de données', path: '/datasources' },
    { id: 'etl', icon: Shuffle, label: 'ETL', path: '/etl' },
    { id: 'reports', icon: FileSpreadsheet, label: 'Rapports', path: '/reports' },
    { id: 'ai-insights', icon: Brain, label: 'Insights IA', path: '/ai-insights' },
    { id: 'collaboration', icon: Users, label: 'Collaboration', path: '/collaboration' },
  ];

  const handleLogout = () => {
    // Pour l'instant, rediriger vers login
    navigate('/login');
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    setIsLangDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo-wrapper">
            <BarChart3 className="logo-icon" />
          </div>
          <h1 className="logo-text">BI Analytics</h1>
        </div>

        <nav className="nav-menu">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path || 
                           (item.path === '/dashboard' && location.pathname === '/');
            
            return (
              <Link 
                key={item.id} 
                to={item.path}
                className={`nav-button ${isActive ? 'nav-button-active' : ''}`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="header-right">
          <div className="language-selector">
            <button 
              className="nav-button"
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            >
              <Globe size={18} />
              <span>{currentLang}</span>
            </button>
            {isLangDropdownOpen && (
              <div className="language-dropdown">
                <button onClick={() => handleLanguageChange('FR')}>Français</button>
                <button onClick={() => handleLanguageChange('EN')}>English</button>
              </div>
            )}
          </div>
          
          <button className="nav-button" title="Paramètres">
            <Settings size={20} />
          </button>
          
          <div className="profile-section">
            <div className="profile-avatar">JD</div>
            <span>John Doe</span>
          </div>
          
          <button 
            className="nav-button" 
            title="Déconnexion"
            onClick={handleLogout}
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;