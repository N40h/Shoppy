import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import AuthenticatedHome from "./pages/Home/AuthenticatedHome";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useSelector } from "react-redux";

export default function App() {
  const token = useSelector((state) => state.auth.token)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!token ? <Home /> : <AuthenticatedHome /> } />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

