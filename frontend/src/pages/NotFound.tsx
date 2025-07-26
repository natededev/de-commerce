// NotFound page: displays 404 error for unknown routes
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log 404 errors for analytics/monitoring purposes
    // In production, this could be sent to an analytics service
    if (import.meta.env.DEV) {
      console.warn(
        '404 Error: User attempted to access non-existent route:',
        location.pathname
      );
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a
          href="/"
          className="text-blue-500 hover:text-blue-700 underline"
          aria-label="Return to Home"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
