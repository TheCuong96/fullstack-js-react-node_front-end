import { Navigate } from 'react-router-dom'
import _ from 'lodash'
export default function AuthenticatedGuards({ children }) {
  let account = JSON.parse(sessionStorage.getItem('account'))
  if (account && !_.isEmpty(account) && account.isAuthenticated) {
    return <>{children}</>
  }
  return <Navigate to={'/login'} />
}
