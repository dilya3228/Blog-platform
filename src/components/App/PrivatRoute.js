import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children }) => {
  const { isIn, isReg } = useSelector((state) => state.user)
  return isIn || isReg ? children : <Navigate to="../sign-in" />
}
export default PrivateRoute
