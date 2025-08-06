import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // ===== AUTHENTIFICATION TEMPORAIREMENT DÉSACTIVÉE POUR LE DÉVELOPPEMENT =====
  // Retourne directement les enfants sans vérifier l'authentification
  return <>{children}</>;
  
  /* ===== CODE ORIGINAL À RÉACTIVER PLUS TARD =====
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
  ===== FIN DU CODE ORIGINAL ===== */
};

export default PrivateRoute;