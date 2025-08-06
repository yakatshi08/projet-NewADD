import React, { useState } from 'react';
import { Users, UserCheck, TrendingUp, Target, Download } from 'lucide-react';
import ReportModal from './ReportModal';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface CustomerReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerReportModal: React.FC<CustomerReportModalProps> = ({ isOpen, onClose }) => {
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [analysisType, setAnalysisType] = useState('segmentation');
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  // Données simulées pour le clustering
  const clusterData = [
    { x: 45, y: 78, z: 120, cluster: 'Premium', name: 'Clients Premium' },
    { x: 32, y: 45, z: 80, cluster: 'Regular', name: 'Clients Réguliers' },
    { x: 12, y: 23, z: 40, cluster: 'Occasional', name: 'Clients Occasionnels' },
    { x: 78, y: 89, z: 150, cluster: 'VIP', name: 'Clients VIP' },
    { x: 25, y: 34, z: 60, cluster: 'New', name: 'Nouveaux Clients' }
  ];

  const segmentData = [
    { segment: 'VIP', count: 120, revenue: 450000, avgOrder: 3750 },
    { segment: 'Premium', count: 340, revenue: 680000, avgOrder: 2000 },
    { segment: 'Réguliers', count: 890, revenue: 890000, avgOrder: 1000 },
    { segment: 'Occasionnels', count: 1200, revenue: 480000, avgOrder: 400 },
    { segment: 'Nouveaux', count: 450, revenue: 225000, avgOrder: 500 }
  ];

  const behaviorData = [
    { metric: 'Fréquence', VIP: 85, Premium: 70, Regular: 50, New: 30 },
    { metric: 'Montant', VIP: 95, Premium: 75, Regular: 45, New: 35 },
    { metric: 'Récence', VIP: 90, Premium: 80, Regular: 60, New: 85 },
    { metric: 'Fidélité', VIP: 95, Premium: 85, Regular: 65, New: 20 },
    { metric: 'Satisfaction', VIP: 88, Premium: 82, Regular: 75, New: 70 }
  ];

  const COLORS = {
    VIP: '#4F46E5',
    Premium: '#7C3AED',
    Regular: '#10B981',
    Occasional: '#F59E0B',
    New: '#EC4899'
  };

  const generateReport = () => {
    alert('Génération du rapport clients en cours...');
  };

  return (
    <ReportModal isOpen={isOpen} onClose={onClose} title="Créer un rapport d'analyse clients">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Formulaire */}
        <div style={{ 
          backgroundColor: '#F9FAFB', 
          padding: '1.5rem', 
          borderRadius: '0.5rem',
          border: '1px solid #E5E7EB' 
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            Paramètres de l'analyse
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Type d'analyse
              </label>
              <select
                value={analysisType}
                onChange={(e) => setAnalysisType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white'
                }}
              >
                <option value="segmentation">Segmentation</option>
                <option value="behavior">Comportement</option>
                <option value="retention">Rétention</option>
                <option value="clv">Valeur client (CLV)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Segment
              </label>
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white'
                }}
              >
                <option value="all">Tous les segments</option>
                <option value="vip">VIP</option>
                <option value="premium">Premium</option>
                <option value="regular">Réguliers</option>
                <option value="new">Nouveaux</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Période
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white'
                }}
              >
                <option value="1month">1 mois</option>
                <option value="3months">3 mois</option>
                <option value="6months">6 mois</option>
                <option value="1year">1 an</option>
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
            <Users size={24} style={{ color: '#4F46E5', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>3,000</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Clients actifs</div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #E5E7EB',
            textAlign: 'center' 
          }}>
            <UserCheck size={24} style={{ color: '#10B981', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>82%</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Taux de rétention</div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #E5E7EB',
            textAlign: 'center' 
          }}>
            <TrendingUp size={24} style={{ color: '#F59E0B', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>908 €</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>CLV moyen</div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #E5E7EB',
            textAlign: 'center' 
          }}>
            <Target size={24} style={{ color: '#EC4899', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>4.2</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Score satisfaction</div>
          </div>
        </div>

        {/* Graphiques */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #E5E7EB' 
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
              Clustering K-means des clients
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" name="Fréquence" />
                <YAxis dataKey="y" name="Montant moyen" />
                <ZAxis dataKey="z" range={[60, 400]} name="CLV" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                {Object.keys(COLORS).map((cluster) => (
                  <Scatter
                    key={cluster}
                    name={cluster}
                    data={clusterData.filter(d => d.cluster === cluster)}
                    fill={COLORS[cluster as keyof typeof COLORS]}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #E5E7EB' 
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
              Analyse comportementale
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={behaviorData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="VIP" dataKey="VIP" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.6} />
                <Radar name="Premium" dataKey="Premium" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.6} />
                <Radar name="Regular" dataKey="Regular" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
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

export default CustomerReportModal;