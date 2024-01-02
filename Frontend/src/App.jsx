import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import AuthenticatedHome from "./pages/Home/AuthenticatedHome";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateToken } from "./redux/reducers/authSlice";

export default function App() {
  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = sessionStorage.getItem('user');

    if (storedToken && !token) {
      dispatch(updateToken(storedToken))
    }
  }, [token, dispatch])

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

