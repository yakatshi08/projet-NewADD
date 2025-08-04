import React, { useState, useCallback } from 'react';
import { Upload, FileSpreadsheet, FileJson, Database, X, CheckCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import '../../styles/etl.css';

interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error';
  data?: any;
}

const DataImporter: React.FC = () => {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [activeTab, setActiveTab] = useState<'file' | 'database' | 'api'>('file');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      const fileUpload: FileUpload = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading'
      };

      setFiles(prev => [...prev, fileUpload]);

      reader.onload = (e) => {
        const content = e.target?.result;
        let parsedData = null;

        try {
          if (file.type === 'application/json') {
            parsedData = JSON.parse(content as string);
          } else if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
            // Parse CSV (simple implementation)
            parsedData = parseCSV(content as string);
          }

          setFiles(prev => prev.map(f => 
            f.id === fileUpload.id 
              ? { ...f, status: 'success', data: parsedData }
              : f
          ));
        } catch (error) {
          setFiles(prev => prev.map(f => 
            f.id === fileUpload.id 
              ? { ...f, status: 'error' }
              : f
          ));
        }
      };

      if (file.type === 'application/json' || file.type === 'text/csv' || file.name.endsWith('.csv')) {
        reader.readAsText(file);
      } else {
        // Pour Excel, on utilisera une librairie dédiée plus tard
        setFiles(prev => prev.map(f => 
          f.id === fileUpload.id 
            ? { ...f, status: 'success' }
            : f
        ));
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    }
  });

  const parseCSV = (text: string): any[] => {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',');
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index]?.trim();
        });
        data.push(row);
      }
    }
    return data;
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="data-importer">
      <h2 className="importer-title">Importer des données</h2>

      {/* Tabs */}
      <div className="importer-tabs">
        <button
          className={`tab-button ${activeTab === 'file' ? 'active' : ''}`}
          onClick={() => setActiveTab('file')}
        >
          <FileSpreadsheet size={20} />
          Fichiers
        </button>
        <button
          className={`tab-button ${activeTab === 'database' ? 'active' : ''}`}
          onClick={() => setActiveTab('database')}
        >
          <Database size={20} />
          Base de données
        </button>
        <button
          className={`tab-button ${activeTab === 'api' ? 'active' : ''}`}
          onClick={() => setActiveTab('api')}
        >
          <FileJson size={20} />
          API REST
        </button>
      </div>

      {/* File Upload Tab */}
      {activeTab === 'file' && (
        <div className="tab-content">
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? 'active' : ''}`}
          >
            <input {...getInputProps()} />
            <Upload size={48} className="dropzone-icon" />
            <p className="dropzone-text">
              {isDragActive
                ? "Déposez les fichiers ici..."
                : "Glissez-déposez des fichiers ici, ou cliquez pour sélectionner"}
            </p>
            <p className="dropzone-subtext">
              Formats supportés : CSV, JSON, Excel (.xls, .xlsx)
            </p>
          </div>

          {/* Files List */}
          {files.length > 0 && (
            <div className="files-list">
              <h3>Fichiers importés</h3>
              {files.map((file) => (
                <div key={file.id} className="file-item">
                  <div className="file-icon">
                    <FileSpreadsheet size={24} />
                  </div>
                  <div className="file-info">
                    <p className="file-name">{file.name}</p>
                    <p className="file-size">{formatFileSize(file.size)}</p>
                  </div>
                  <div className="file-status">
                    {file.status === 'uploading' && (
                      <div className="spinner" />
                    )}
                    {file.status === 'success' && (
                      <CheckCircle size={20} className="status-success" />
                    )}
                    {file.status === 'error' && (
                      <X size={20} className="status-error" />
                    )}
                  </div>
                  <button
                    className="file-remove"
                    onClick={() => removeFile(file.id)}
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Database Tab */}
      {activeTab === 'database' && (
        <div className="tab-content">
          <form className="db-form">
            <div className="form-group">
              <label>Type de base de données</label>
              <select className="form-select">
                <option value="postgresql">PostgreSQL</option>
                <option value="mysql">MySQL</option>
                <option value="mongodb">MongoDB</option>
                <option value="bigquery">Google BigQuery</option>
              </select>
            </div>
            <div className="form-group">
              <label>Hôte</label>
              <input type="text" className="form-input" placeholder="localhost" />
            </div>
            <div className="form-group">
              <label>Port</label>
              <input type="number" className="form-input" placeholder="5432" />
            </div>
            <div className="form-group">
              <label>Base de données</label>
              <input type="text" className="form-input" placeholder="ma_base" />
            </div>
            <div className="form-group">
              <label>Utilisateur</label>
              <input type="text" className="form-input" placeholder="utilisateur" />
            </div>
            <div className="form-group">
              <label>Mot de passe</label>
              <input type="password" className="form-input" placeholder="••••••••" />
            </div>
            <button type="submit" className="btn-primary">
              Tester la connexion
            </button>
          </form>
        </div>
      )}

      {/* API Tab */}
      {activeTab === 'api' && (
        <div className="tab-content">
          <form className="api-form">
            <div className="form-group">
              <label>URL de l'API</label>
              <input 
                type="url" 
                className="form-input" 
                placeholder="https://api.exemple.com/data" 
              />
            </div>
            <div className="form-group">
              <label>Méthode</label>
              <select className="form-select">
                <option value="GET">GET</option>
                <option value="POST">POST</option>
              </select>
            </div>
            <div className="form-group">
              <label>Headers (JSON)</label>
              <textarea 
                className="form-textarea" 
                rows={4}
                placeholder='{"Authorization": "Bearer token"}'
              />
            </div>
            <div className="form-group">
              <label>Body (JSON)</label>
              <textarea 
                className="form-textarea" 
                rows={6}
                placeholder='{}'
              />
            </div>
            <button type="submit" className="btn-primary">
              Tester l'API
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DataImporter;