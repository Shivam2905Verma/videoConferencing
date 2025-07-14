import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WithAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useNavigate();

    const isAuthenticated = () => {
      return !!localStorage.getItem("token"); // Simplified
    };

    useEffect(() => {
      if (!isAuthenticated()) { // <-- fixed: call the function
        router("/login");
      }
    }, []);

    return <WrappedComponent {...props} />; // Capitalized component
  };

  return AuthComponent;
};

export default WithAuth;
