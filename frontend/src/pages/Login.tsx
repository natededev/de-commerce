// Login page: user authentication form and login logic
import React, { Suspense, lazy, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { Copy } from 'lucide-react';

const AuthForm = lazy(() =>
  import('@/features/auth/components/AuthForm').then(m => ({
    default: m.AuthForm,
  }))
);

const DEMO_CREDENTIALS = [
  {
    id: 'admin',
    label: 'Admin',
    email: 'admin@gmail.com',
    password: 'demo123456', // Note: Use Supabase Auth for actual authentication
  },
  {
    id: 'user',
    label: 'User',
    email: 'user@gmail.com',
    password: 'demo123456', // Note: Use Supabase Auth for actual authentication
  },
];

const Login: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { user } = useAuth();
  const demoFillRef = React.useRef<((email: string, password: string) => void) | null>(null);
  const navigate = useNavigate();

  // Redirect if user is already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  // Handler for demo credential copy
  const handleDemoCopy = (email: string, password: string) => {
    if (demoFillRef.current) {
      demoFillRef.current(email, password);
    }
    // Copy to clipboard as well
    navigator.clipboard.writeText(`${email}\n${password}`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4 relative">
      <Suspense fallback={<div>Loading form…</div>}>
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Demo Credentials Notification Banner */}
          <div className="mb-4 w-full">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">i</div>
                <span className="font-semibold">Demo Credentials Available</span>
              </div>
              <p className="text-xs">
                Reviewers can use the demo credentials below for quick testing.
                <br />
                <strong>Note:</strong> New signups require email confirmation.
              </p>
            </div>
          </div>
          
          <AuthForm
            mode={mode}
            onModeChange={setMode}
            onDemoFill={fill => {
              demoFillRef.current = fill;
            }}
          />
          {/* Horizontally scrollable demo credentials bar just below the form */}
          <div className="mt-4 w-full">
            <div className="flex gap-2 overflow-x-auto rounded-lg border border-primary/20 bg-white/90 shadow-md p-2 text-xs demo-scrollbar">
              {DEMO_CREDENTIALS.map(cred => (
                <div
                  key={cred.id}
                  className="flex items-center gap-2 px-3 py-1 rounded bg-muted/40 border border-muted-foreground/10 whitespace-nowrap"
                >
                  <span className="font-medium text-primary">
                    {cred.label}:
                  </span>
                  <span>
                    Email: <b>{cred.email}</b>
                  </span>
                  <span>
                    Password: <b>{cred.password}</b>
                  </span>
                  <button
                    type="button"
                    className="ml-1 p-1 hover:bg-primary/10 rounded"
                    aria-label={`Copy and autofill ${cred.label} credentials`}
                    onClick={() => handleDemoCopy(cred.email, cred.password)}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Login;
