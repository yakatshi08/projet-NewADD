import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import DataSources from './pages/DataSources';
import ETL from './pages/ETL';
import Reports from './pages/Reports'; // Import ajouté ici
import './styles/index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        } />
        <Route path="/dashboard" element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        } />
        <Route path="/datasources" element={
          <MainLayout>
            <DataSources />
          </MainLayout>
        } />
        <Route path="/reports" element={
          <MainLayout>
            <Reports /> {/* Route modifiée ici */}
          </MainLayout>
        } />
        <Route path="/ai-insights" element={
          <MainLayout>
            <div className="p-8">Insights IA</div>
          </MainLayout>
        } />
        <Route path="/collaboration" element={
          <MainLayout>
            <div className="p-8">Collaboration</div>
          </MainLayout>
        } />
        <Route path="/etl" element={
          <MainLayout>
            <ETL />
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;