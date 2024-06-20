import {CssBaseline,ThemeProvider} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from 'theme';
import Dashboard from "scenes/Dashboard";
import Layout from 'scenes/Layout';
import Products from 'scenes/Products';
import appRoutes from 'routes/appRoutes';
import Buy from 'scenes/Buy';
import LoginPage from "scenes/loginPage";
import { useState} from 'react';
import AuthHandler from 'authHandler'





function App() {
  const mode = useSelector((state) => state.appState.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const isAuths = isGoogleAuth || isAuth;
  
  return (
    
    <div className="app">
      <BrowserRouter>
       <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthHandler setIsGoogleAuth={setIsGoogleAuth} setIsAuth={setIsAuth} />
        <Routes>
        <Route path="/" element={<LoginPage />} />
            <Route
              path = "/products"
              element={isAuths ? <Layout /> : <Navigate to="/" />}
            >
           <Route index element={<Products />} />
           <Route path="dashboard" element={<Dashboard />} />
           {appRoutes.map((route, index) => {
             if (route.child) {
              return route.child.map((childRoute, childIndex) => (
               <Route key={childIndex} path={childRoute.path} element={childRoute.element} />
              ));
              }
              return <Route key={index} path={route.path} element={route.element} />;
            })}
            
          <Route path="buy" element={<Buy />} />
         </Route>
        </Routes>
       </ThemeProvider>
      </BrowserRouter>
      
    
    </div>
  );
}

export default App;


