import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const LoggedOutRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  
  // If user is logged in, redirect to home/dashboard
  if (token) {
    return <Navigate to="/dashboard/my-profile" replace />;
  }

  return children;
};

export default LoggedOutRoute;