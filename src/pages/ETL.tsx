import React, { useState } from 'react';
import DataImporter from '../components/etl/DataImporter';
import DataTransformer from '../components/etl/DataTransformer';

const ETL = () => {
  const [activeTab, setActiveTab] = useState<'import' | 'transform'>('import');

  return (
    <div className="etl-page">
      <div className="etl-tabs">
        <button
          className={`etl-tab ${activeTab === 'import' ? 'active' : ''}`}
          onClick={() => setActiveTab('import')}
        >
          1. Importer
        </button>
        <button
          className={`etl-tab ${activeTab === 'transform' ? 'active' : ''}`}
          onClick={() => setActiveTab('transform')}
        >
          2. Transformer
        </button>
      </div>

      <div className="etl-content">
        {activeTab === 'import' && <DataImporter />}
        {activeTab === 'transform' && <DataTransformer />}
      </div>
    </div>
  );
};

export default ETL;