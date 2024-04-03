import "./style.scss";
import {Outlet} from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/choice" />;
    }

    return children
  };

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
