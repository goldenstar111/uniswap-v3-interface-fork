import { Navigate, useLocation } from 'react-router-dom'

// Redirects to pool but only replace the pathname
export function RedirectPathToPoolOnly() {
  const location = useLocation()
  return <Navigate to={{ ...location, pathname: '/pool' }} replace />
}
