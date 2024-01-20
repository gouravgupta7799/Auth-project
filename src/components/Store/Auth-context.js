import React, { useState } from "react"
const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => { },
  logout: () => { },
})

export const AuthContextProvider = (props) => {
  const intitalToken = localStorage.getItem('token')
  const [token, setToken] = useState(intitalToken)
  const UserIsLoggedIn = !!token
  let timeOut;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token)
    timeOut = setTimeout(() => {
      localStorage.removeItem('token')
      console.log('setTimeout')
    }, (5 * 60 * 1000))

  }
  const logoutHandler = () => {
    setToken(null)
    localStorage.removeItem('token')
    clearTimeout(timeOut)
  }
  const contextValue = {
    token: token,
    isLoggedIn: UserIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }
  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}
export default AuthContext;