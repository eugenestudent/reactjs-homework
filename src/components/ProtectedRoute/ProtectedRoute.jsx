import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectAuthLoading } from '../../store/authSlice';

function ProtectedRoute({ children }) {
  const currentUser = useSelector(selectCurrentUser);
  const loading = useSelector(selectAuthLoading);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;