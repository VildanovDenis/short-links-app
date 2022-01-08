import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'materialize-css'
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';

function App() {
  const { token, login, logout, userId, isReady } = useAuth()
  const isAuthentificated = Boolean(token)
  const routes = useRoutes(isAuthentificated)

  if (!isReady) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAuthentificated }}>
      <Router>
        {isAuthentificated && (<Navbar />)}
        <div className='container'>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App
