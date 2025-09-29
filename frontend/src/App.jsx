import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// pages & components
import Home from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.token ? true : false;
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <div className="content">
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/jobs/:id" element={<JobPage />} />

            {/* Protected */}
            <Route
              path="/add-job"
              element={
                isAuthenticated ? <AddJobPage /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/edit-job/:id"
              element={
                isAuthenticated ? <EditJobPage /> : <Navigate to="/login" replace />
              }
            />

            {/* Guest only */}
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Signup setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
