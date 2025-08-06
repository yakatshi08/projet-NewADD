import React, { useState } from 'react';
import { Package, AlertTriangle, TrendingDown, RotateCw, Download } from 'lucide-react';
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

interface InventoryReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InventoryReportModal: React.FC<InventoryReportModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [alertThreshold, setAlertThreshold] = useState('10');

  // Données simulées
  const stockData = [
    { product: 'Laptop Pro 15', stock: 45, min: 20, category: 'Électronique' },
    { product: 'Smartphone X12', stock: 12, min: 30, category: 'Électronique' },
    { product: 'Tablet Ultra', stock: 78, min: 25, category: 'Électronique' },
    { product: 'T-shirt Classic', stock: 5, min: 50, category: 'Vêtements' },
    { product: 'Chaussures Sport', stock: 89, min: 40, category: 'Vêtements' },
    { product: 'Casque Audio', stock: 34, min: 15, category: 'Accessoires' }
  ];

  const stockStatus = [
    { name: 'Stock optimal', value: 45, color: '#10B981' },
    { name: 'Stock faible', value: 30, color: '#F59E0B' },
    { name: 'Rupture proche', value: 20, color: '#EF4444' },
    { name: 'En rupture', value: 5, color: '#991B1B' }
  ];

  const rotationData = [
    { month: 'Jan', rotation: 2.5 },
    { month: 'Fév', rotation: 2.8 },
    { month: 'Mar', rotation: 2.3 },
    { month: 'Avr', rotation: 3.1 },
    { month: 'Mai', rotation: 2.9 },
    { month: 'Jun', rotation: 3.4 }
  ];

  const generateReport = () => {
    alert('Génération du rapport d\'inventaire en cours...');
  };

  return (
    <ReportModal isOpen={isOpen} onClose={onClose} title="Créer un rapport d'inventaire">
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
                Catégorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white'
                }}
              >
                <option value="all">Toutes les catégories</option>
                <option value="electronics">Électronique</option>
                <option value="clothing">Vêtements</option>
                <option value="accessories">Accessoires</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Entrepôt
              </label>
              <select
                value={selectedWarehouse}
                onChange={(e) => setSelectedWarehouse(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white'
                }}
              >
                <option value="all">Tous les entrepôts</option>
                <option value="paris">Paris</option>
                <option value="lyon">Lyon</option>
                <option value="marseille">Marseille</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Seuil d'alerte (%)
              </label>
              <input
                type="number"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white'
                }}
              />
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
            <Package size={24} style={{ color: '#4F46E5', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>263</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Produits totaux</div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #E5E7EB',
            textAlign: 'center' 
          }}>
            <AlertTriangle size={24} style={{ color: '#EF4444', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>12</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Ruptures proches</div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #E5E7EB',
            textAlign: 'center' 
          }}>
            <TrendingDown size={24} style={{ color: '#F59E0B', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>8.2%</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Taux de rupture</div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #E5E7EB',
            textAlign: 'center' 
          }}>
            <RotateCw size={24} style={{ color: '#10B981', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>3.4</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Rotation/mois</div>
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
              État des stocks par produit
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" fill="#4F46E5" name="Stock actuel" />
                <Bar dataKey="min" fill="#EF4444" name="Stock minimum" />
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
              Répartition par statut
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stockStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {stockStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
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

export default InventoryReportModal;