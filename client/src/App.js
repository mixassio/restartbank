import 'materialize-css';
import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';

function App() {
  const { login, logout, token, userId, ready } = useAuth();
  const isAutentificated = !!token;
  const routes = useRoutes(isAutentificated);

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{ login, logout, token, userId , isAutentificated }}>
      <Router>
        { isAutentificated && <Navbar /> }
        <div className='container'>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
