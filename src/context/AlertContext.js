import React, { useState } from 'react'

const AlertContext = React.createContext({ message: '' })

export const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: '' })

  const setAlertTimeout = (msg, timeout = 5000) => {
    setAlert(msg)

    setTimeout(() => setAlert({ message: '' }), timeout)
  }

  return (
    <AlertContext.Provider value={{ alert, setAlertTimeout }}>
      {children}
    </AlertContext.Provider>
  )
}

export const useAlert = () => React.useContext(AlertContext)
