import React, { useState } from 'react';
import { 
  Shuffle, 
  Filter, 
  Calculator, 
  Columns, 
  Trash2, 
  Plus,
  Play,
  Eye,
  Save,
  ChevronDown
} from 'lucide-react';

interface TransformStep {
  id: string;
  type: 'filter' | 'aggregate' | 'calculate' | 'join' | 'clean';
  config: any;
  name: string;
}

interface DataColumn {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  sample: any[];
}

const DataTransformer: React.FC = () => {
  const [steps, setSteps] = useState<TransformStep[]>([]);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [columns] = useState<DataColumn[]>([
    { name: 'product_id', type: 'string', sample: ['P001', 'P002', 'P003'] },
    { name: 'product_name', type: 'string', sample: ['Laptop', 'Mouse', 'Keyboard'] },
    { name: 'price', type: 'number', sample: [999.99, 29.99, 79.99] },
    { name: 'quantity', type: 'number', sample: [5, 15, 8] },
    { name: 'date', type: 'date', sample: ['2024-01-15', '2024-01-16', '2024-01-17'] }
  ]);

  const transformTypes = [
    { id: 'filter', name: 'Filtrer', icon: Filter, color: '#3B82F6' },
    { id: 'aggregate', name: 'Agréger', icon: Calculator, color: '#16A34A' },
    { id: 'calculate', name: 'Calculer', icon: Calculator, color: '#F59E0B' },
    { id: 'join', name: 'Joindre', icon: Columns, color: '#8B5CF6' },
    { id: 'clean', name: 'Nettoyer', icon: Shuffle, color: '#DC2626' }
  ];

  const addStep = (type: string) => {
    const newStep: TransformStep = {
      id: Date.now().toString(),
      type: type as any,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} #${steps.length + 1}`,
      config: {}
    };
    setSteps([...steps, newStep]);
    setSelectedStep(newStep.id);
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter(s => s.id !== id));
    if (selectedStep === id) {
      setSelectedStep(null);
    }
  };

  return (
    <div className="data-transformer">
      <div className="transformer-header">
        <h2>Pipeline de transformation</h2>
        <div className="transformer-actions">
          <button className="btn-secondary">
            <Eye size={18} />
            Aperçu
          </button>
          <button className="btn-primary">
            <Play size={18} />
            Exécuter
          </button>
          <button className="btn-success">
            <Save size={18} />
            Sauvegarder
          </button>
        </div>
      </div>

      <div className="transformer-body">
        <div className="transform-types-panel">
          <h3>Transformations</h3>
          <div className="transform-types-grid">
            {transformTypes.map(type => (
              <button
                key={type.id}
                className="transform-type-card"
                onClick={() => addStep(type.id)}
                style={{ '--accent-color': type.color } as any}
              >
                <type.icon size={24} />
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pipeline-panel">
          <h3>Pipeline</h3>
          {steps.length === 0 ? (
            <div className="empty-pipeline">
              <p>Aucune transformation</p>
              <p className="hint">Cliquez sur une transformation pour commencer</p>
            </div>
          ) : (
            <div className="pipeline-steps">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`pipeline-step ${selectedStep === step.id ? 'selected' : ''}`}
                  onClick={() => setSelectedStep(step.id)}
                >
                  <div className="step-header">
                    <span className="step-number">{index + 1}</span>
                    <span className="step-name">{step.name}</span>
                    <button
                      className="step-remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeStep(step.id);
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="step-connector">
                      <ChevronDown size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="config-panel">
          <h3>Configuration</h3>
          {selectedStep ? (
            <div className="step-config">
              <p>Configuration pour: {steps.find(s => s.id === selectedStep)?.name}</p>
              <div className="config-group">
                <label>Options de transformation</label>
                <p className="hint">Les options apparaîtront ici</p>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <p>Sélectionnez une étape pour la configurer</p>
            </div>
          )}
        </div>
      </div>

      <div className="data-preview-panel">
        <h3>Aperçu des données</h3>
        <div className="preview-table-wrapper">
          <table className="preview-table">
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col.name}>
                    {col.name}
                    <span className="column-type">{col.type}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2].map(rowIndex => (
                <tr key={rowIndex}>
                  {columns.map(col => (
                    <td key={col.name}>{col.sample[rowIndex]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTransformer;
