// Register page: user sign-up form and registration logic
import React, { Suspense, lazy, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/use-auth';
const AuthForm = lazy(() =>
  import('@/features/auth/components/AuthForm').then(m => ({
    default: m.AuthForm,
  }))
);

const Register: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const { user } = useAuth();

  // Redirect if user is already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <Suspense fallback={<div>Loading form…</div>}>
        <AuthForm mode={mode} onModeChange={setMode} />
      </Suspense>
    </div>
  );
};

export default Register;
