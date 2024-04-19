import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Recipes } from "../pages/Recipes";
import { login } from "../services/login";

export const AppRoutes = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Login navigate={navigate} login={login} />} />
      <Route path="/recipes" element={<Recipes />} />
    </Routes>
  );
};
