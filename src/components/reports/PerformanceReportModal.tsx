import React, { useState } from 'react';
import { TrendingUp, Store, Target, Award, Download } from 'lucide-react';
import ReportModal from './ReportModal';
import {
  ComposedChart,
  Line,
  Bar,
  BarChart,  // Ajout de BarChart comme demandé
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  RadialBarChart,
  RadialBar
} from 'recharts';

interface PerformanceReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PerformanceReportModal: React.FC<PerformanceReportModalProps> = ({ isOpen, onClose }) => {
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [comparisonPeriod, setComparisonPeriod] = useState('month');

  // Données simulées
  const performanceData = [
    { month: 'Jan', revenue: 45000, target: 50000, conversion: 3.2, traffic: 12000 },
    { month: 'Fév', revenue: 52000, target: 50000, conversion: 3.5, traffic: 13500 },
    { month: 'Mar', revenue: 48000, target: 52000, conversion: 3.1, traffic: 14000 },
    { month: 'Avr', revenue: 61000, target: 55000, conversion: 3.8, traffic: 15000 },
    { month: 'Mai', revenue: 58000, target: 58000, conversion: 3.6, traffic: 14500 },
    { month: 'Jun', revenue: 67000, target: 60000, conversion: 4.1, traffic: 16000 }
  ];

  const storeComparison = [
    { store: 'Paris', performance: 85, revenue: 250000 },
    { store: 'Lyon', performance: 78, revenue: 180000 },
    { store: 'Marseille', performance: 92, revenue: 220000 },
    { store: 'Bordeaux', performance: 71, revenue: 150000 },
    { store: 'Lille', performance: 88, revenue: 190000 }
  ];

  const kpiData = [
    { name: 'Objectif atteint', value: 89, fill: '#4F46E5' },
    { name: 'Croissance', value: 15.5, fill: '#10B981' },
    { name: 'Efficacité', value: 94, fill: '#F59E0B' },
    { name: 'ROI', value: 312, fill: '#EC4899' }
  ];

  const generateReport = () => {
    alert('Génération du rapport de performance en cours...');
  };

  return (
    <ReportModal isOpen={isOpen} onClose={onClose} title="Créer un rapport de performance">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Formulaire */}
        <div style={{ 
          backgroundColor: '#F9FAFB', 
          padding: '1.5rem', 
          borderRadius: '0.5rem',
          border: '1px solid #E5E7EB' 
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            Paramètres du rapport
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Magasin/Unité
              </label>
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white'
                }}
              >
                <option value="all">Tous les magasins</option>
                <option value="paris">Paris</option>
                <option value="lyon">Lyon</option>
                <option value="marseille">Marseille</option>
                <option value="bordeaux">Bordeaux</option>
                <option value="lille">Lille</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Métrique principale
              </label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white'
                }}
              >
                <option value="revenue">Chiffre d'affaires</option>
                <option value="conversion">Taux de conversion</option>
                <option value="traffic">Trafic</option>
                <option value="aov">Panier moyen</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Période de comparaison
              </label>
              <select
                value={comparisonPeriod}
                onChange={(e) => setComparisonPeriod(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white'
                }}
              >
                <option value="month">Mois précédent</option>
                <option value="quarter">Trimestre précédent</option>
                <option value="year">Année précédente</option>
              </select>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #E5E7EB',
            textAlign: 'center' 
          }}>
            <TrendingUp size={24} style={{ color: '#4F46E5', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>+15.5%</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Croissance</div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #E5E7EB',
            textAlign: 'center' 
          }}>
            <Target size={24} style={{ color: '#10B981', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>111.7%</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Objectif atteint</div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #E5E7EB',
            textAlign: 'center' 
          }}>
            <Store size={24} style={{ color: '#F59E0B', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>5/5</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Magasins performants</div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #E5E7EB',
            textAlign: 'center' 
          }}>
            <Award size={24} style={{ color: '#EC4899', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>312%</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>ROI</div>
          </div>
        </div>

        {/* Graphiques */}
        <div>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #E5E7EB',
            marginBottom: '1rem' 
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
              Performance vs Objectifs
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="revenue" fill="#E0E7FF" stroke="#4F46E5" />
                <Line yAxisId="left" type="monotone" dataKey="target" stroke="#EF4444" strokeDasharray="5 5" />
                <Bar yAxisId="right" dataKey="conversion" fill="#10B981" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              border: '1px solid #E5E7EB' 
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                Comparaison des magasins
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={storeComparison} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="store" type="category" />
                  <Tooltip />
                  <Bar dataKey="performance" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              border: '1px solid #E5E7EB' 
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                KPIs globaux
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="90%" data={kpiData}>
                  <RadialBar dataKey="value" cornerRadius={10} fill="#4F46E5" />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #E5E7EB' 
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #D1D5DB',
              borderRadius: '0.375rem',
              backgroundColor: 'white',
              color: '#374151',
              cursor: 'pointer'
            }}
          >
            Annuler
          </button>
          <button
            onClick={generateReport}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#4F46E5',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Download size={20} />
            Générer le rapport
          </button>
        </div>
      </div>
    </ReportModal>
  );
};

export default PerformanceReportModal;