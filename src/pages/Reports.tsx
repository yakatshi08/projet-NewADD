import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Search,
  BarChart3,
  PieChart,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import SalesReportModal from '../components/reports/SalesReportModal';
import InventoryReportModal from '../components/reports/InventoryReportModal';
import CustomerReportModal from '../components/reports/CustomerReportModal';
import PerformanceReportModal from '../components/reports/PerformanceReportModal';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const reports = [
    {
      id: '1',
      name: 'Rapport des ventes Q4 2024',
      type: 'Ventes',
      author: 'John Doe',
      status: 'Publié',
      date: '20/12/2024',
      icon: BarChart3
    },
    {
      id: '2',
      name: 'Analyse des stocks - Décembre',
      type: 'Inventaire',
      author: 'Jane Smith',
      status: 'Publié',
      date: '18/12/2024',
      icon: FileSpreadsheet
    },
    {
      id: '3',
      name: 'Performance des magasins 2024',
      type: 'Performance',
      author: 'John Doe',
      status: 'Brouillon',
      date: '22/12/2024',
      icon: TrendingUp
    }
  ];

  const reportTemplates = [
    { id: 'sales', name: 'Ventes mensuelles', icon: BarChart3, color: '#3B82F6' },
    { id: 'inventory', name: 'Inventaire', icon: FileSpreadsheet, color: '#10B981' },
    { id: 'customers', name: 'Analyse clients', icon: PieChart, color: '#8B5CF6' },
    { id: 'performance', name: 'Performance', icon: TrendingUp, color: '#F59E0B' }
  ];

  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      paddingTop: '5rem',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      paddingBottom: '2rem',
      backgroundColor: '#f5f5dc', 
      minHeight: '100vh' 
    }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '0.5rem' }}>
          Rapports
        </h1>
        <p style={{ color: '#666' }}>
          Créez, gérez et partagez vos rapports d'analyse
        </p>
      </div>

      {/* Actions et filtres */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '1.5rem', 
        borderRadius: '0.5rem', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '2rem' 
      }}>
        {/* Barre d'actions */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <button 
            onClick={() => setActiveModal('sales')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#4F46E5',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            <Plus size={20} />
            Nouveau rapport
          </button>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search 
                size={20} 
                style={{ 
                  position: 'absolute', 
                  left: '0.75rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#9CA3AF' 
                }} 
              />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  paddingLeft: '2.5rem',
                  paddingRight: '1rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  width: '200px'
                }}
              />
            </div>

            <select style={{
              padding: '0.5rem 1rem',
              border: '1px solid #D1D5DB',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}>
              <option>Tous les types</option>
              <option>Ventes</option>
              <option>Inventaire</option>
              <option>Performance</option>
              <option>Clients</option>
            </select>

            <select style={{
              padding: '0.5rem 1rem',
              border: '1px solid #D1D5DB',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}>
              <option>Tous les statuts</option>
              <option>Publié</option>
              <option>Brouillon</option>
            </select>
          </div>
        </div>

        {/* Templates */}
        <div>
          <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
            Templates disponibles
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
            {reportTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <button
                  key={template.id}
                  onClick={() => setActiveModal(template.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1rem',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.5rem',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#4F46E5';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    backgroundColor: template.color + '20',
                    marginBottom: '0.5rem'
                  }}>
                    <Icon size={24} style={{ color: template.color }} />
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                    {template.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Table des rapports */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '0.5rem', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ 
          padding: '1.5rem', 
          borderBottom: '1px solid #E5E7EB' 
        }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1F2937' }}>
            Mes rapports ({filteredReports.length})
          </h2>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#F9FAFB' }}>
              <tr>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                  Rapport
                </th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                  Type
                </th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                  Auteur
                </th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                  Statut
                </th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                  Dernière modification
                </th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => {
                const Icon = report.icon;
                return (
                  <tr key={report.id} style={{ borderTop: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <FileText size={20} style={{ color: '#9CA3AF' }} />
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1F2937' }}>
                            {report.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#1F2937' }}>
                        <Icon size={16} />
                        {report.type}
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#1F2937' }}>
                      {report.author}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: report.status === 'Publié' ? '#D1FAE5' : '#FEF3C7',
                        color: report.status === 'Publié' ? '#065F46' : '#92400E'
                      }}>
                        {report.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#6B7280' }}>
                      {report.date}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button style={{ padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
                          <Eye size={20} />
                        </button>
                        <button style={{ padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
                          <Edit size={20} />
                        </button>
                        <button style={{ padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
                          <Download size={20} />
                        </button>
                        <button style={{ padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modales */}
      <SalesReportModal 
        isOpen={activeModal === 'sales'} 
        onClose={() => setActiveModal(null)} 
      />
      <InventoryReportModal 
        isOpen={activeModal === 'inventory'} 
        onClose={() => setActiveModal(null)} 
      />
      <CustomerReportModal 
        isOpen={activeModal === 'customers'} 
        onClose={() => setActiveModal(null)} 
      />
      <PerformanceReportModal 
        isOpen={activeModal === 'performance'} 
        onClose={() => setActiveModal(null)} 
      />
    </div>
  );
};

export default Reports;