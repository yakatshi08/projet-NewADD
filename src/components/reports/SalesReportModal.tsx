import React, { useState } from 'react';
import { BarChart3, Calendar, Download, TrendingUp, DollarSign } from 'lucide-react';
import ReportModal from './ReportModal';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface SalesReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SalesReportModal: React.FC<SalesReportModalProps> = ({ isOpen, onClose }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('12');

  // Données simulées
  const salesData = [
    { month: 'Jan', sales: 45000, orders: 890 },
    { month: 'Fév', sales: 52000, orders: 920 },
    { month: 'Mar', sales: 48000, orders: 850 },
    { month: 'Avr', sales: 61000, orders: 1100 },
    { month: 'Mai', sales: 58000, orders: 1050 },
    { month: 'Jun', sales: 67000, orders: 1200 }
  ];

  const topProducts = [
    { name: 'Laptop Pro 15', value: 35, revenue: 52500 },
    { name: 'Smartphone X12', value: 25, revenue: 31250 },
    { name: 'Tablet Ultra', value: 20, revenue: 18000 },
    { name: 'Smart Watch', value: 12, revenue: 7200 },
    { name: 'Autres', value: 8, revenue: 4800 }
  ];

  const COLORS = ['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B', '#10B981'];

  const generateReport = () => {
    alert('Génération du rapport en cours...');
    // Ici, vous appelleriez votre API pour générer le rapport
  };

  return (
    <ReportModal isOpen={isOpen} onClose={onClose} title="Créer un rapport de ventes">
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
                <option value="month">Mensuel</option>
                <option value="quarter">Trimestriel</option>
                <option value="year">Annuel</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Année
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white'
                }}
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Mois
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                disabled={selectedPeriod !== 'month'}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  backgroundColor: selectedPeriod !== 'month' ? '#F3F4F6' : 'white'
                }}
              >
                <option value="12">Décembre</option>
                <option value="11">Novembre</option>
                <option value="10">Octobre</option>
              </select>
            </div>
          </div>
        </div>

        {/* Aperçu des données */}
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            Aperçu des données
          </h3>

          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              border: '1px solid #E5E7EB',
              textAlign: 'center' 
            }}>
              <DollarSign size={24} style={{ color: '#4F46E5', margin: '0 auto 0.5rem' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>67 000 €</div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>CA Total</div>
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              border: '1px solid #E5E7EB',
              textAlign: 'center' 
            }}>
              <BarChart3 size={24} style={{ color: '#10B981', margin: '0 auto 0.5rem' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>1 200</div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Commandes</div>
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              border: '1px solid #E5E7EB',
              textAlign: 'center' 
            }}>
              <TrendingUp size={24} style={{ color: '#F59E0B', margin: '0 auto 0.5rem' }} />
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
              <Calendar size={24} style={{ color: '#EC4899', margin: '0 auto 0.5rem' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>55.8 €</div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Panier moyen</div>
            </div>
          </div>

          {/* Graphiques */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              border: '1px solid #E5E7EB' 
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                Évolution des ventes
              </h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#4F46E5" name="Ventes (€)" />
                  <Line type="monotone" dataKey="orders" stroke="#10B981" name="Commandes" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              border: '1px solid #E5E7EB' 
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                Top produits
              </h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={topProducts}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {topProducts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
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

export default SalesReportModal;