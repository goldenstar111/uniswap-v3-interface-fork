import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppDispatch } from 'state/hooks'

import { ApplicationModal, setOpenModal } from '../../state/application/reducer'

// Redirects to pool but only replace the pathname
export function RedirectPathToPoolOnly() {
  const location = useLocation()
  return <Navigate to={{ ...location, pathname: '/pool' }} replace />
}

export function OpenClaimAddressModalAndRedirectToSwap() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setOpenModal(ApplicationModal.ADDRESS_CLAIM))
  }, [dispatch])
  return <RedirectPathToPoolOnly />
}
