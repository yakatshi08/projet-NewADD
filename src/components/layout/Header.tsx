import React, { useState } from 'react';
import { 
  BarChart3, 
  Database, 
  Shuffle, // Nouvelle icône ajoutée
  FileSpreadsheet, 
  Brain, 
  Users, 
  Settings, 
  LogOut,
  Globe
} from 'lucide-react';
import "../../styles/header.css";

const Header = ({ onMenuClick, isSidebarOpen }) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('FR');

  const navigationItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Tableau de bord' },
    { id: 'datasources', icon: Database, label: 'Sources de données' },
    { id: 'etl', icon: Shuffle, label: 'ETL' }, // Nouvel élément ajouté ici
    { id: 'reports', icon: FileSpreadsheet, label: 'Rapports' },
    { id: 'ai-insights', icon: Brain, label: 'Insights IA' },
    { id: 'collaboration', icon: Users, label: 'Collaboration' },
  ];

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
          {navigationItems.map((item) => (
            <button key={item.id} className="nav-button">
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="header-right">
          <button className="nav-button">
            <Globe size={18} />
            <span>{currentLang}</span>
          </button>
          <button className="nav-button">
            <Settings size={20} />
          </button>
          <div className="profile-section">
            <div className="profile-avatar">JD</div>
            <span>John Doe</span>
          </div>
          <button className="nav-button">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
