import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';

import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/auth/LoginPage';
import OnboardingWizard from './components/auth/OnboardingWizard';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Profile from './components/dashboard/pages/Profile';

// ✅ Private route wrapper
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  if (isLoading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// ✅ App routes (clean logic — no looping redirects)
const AppRoutes = () => {
  const { isAuthenticated, user, isLoading } = useContext(AuthContext);

  if (isLoading) return null;

  return (
    <Routes>
      {/* 🌍 Public Routes */}
      <Route
        path="/"
        element={
          <LandingPage/>
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated
            ? user?.onboardingCompleted
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/onboarding" replace />
            : <LoginPage />
        }
      />

      {/* 🧭 Onboarding route */}
      <Route
        path="/onboarding"
        element={
          <PrivateRoute>
            {user?.onboardingCompleted ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <OnboardingWizard />
            )}
          </PrivateRoute>
        }
      />

      {/* 👤 Profile page under dashboard */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      {/* 🏠 Main Dashboard layout */}
      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute>
            {user?.onboardingCompleted ? (
              <DashboardLayout />
            ) : (
              <Navigate to="/onboarding" replace />
            )}
          </PrivateRoute>
        }
      />

      {/* 🚫 Fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// ✅ Final App Wrapper
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
