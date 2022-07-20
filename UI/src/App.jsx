import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import { Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  const user = true;
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/register" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/home" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/home" />}
        />

        <Route
          path="/movies"
          element={user ? <Home type="movie" /> : <Navigate to="/register" />}
        />
        <Route
          path="/series"
          element={user ? <Home type="series" /> : <Navigate to="/register" />}
        />
        <Route
          path="/watch"
          element={user ? <Watch /> : <Navigate to="/register" />}
        />
      </Routes>
    </>
  );
};

export default App;
