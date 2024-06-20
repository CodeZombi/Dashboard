import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from 'react-redux';



const AuthHandler = ({ setIsGoogleAuth, setIsAuth }) => {
    const navigate = useNavigate();
    
    
  
    useEffect(() => {
      
      const checkGoogleOAuthSuccess = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const oauthSuccess = urlParams.get('oauth_success'); 
        if (oauthSuccess === 'true') {
          
          setIsGoogleAuth(true);
          navigate('/products');
        }
      };
  
      checkGoogleOAuthSuccess();
    }, [navigate, setIsGoogleAuth]);
    const isAuth = Boolean(useSelector((state) => state.auth.token));
    if (isAuth) {
      setIsAuth(true); }

    return null; 
  };

export default AuthHandler;
  