import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Income from "./components/Income";
import Expense from "./components/Expense";
import Transaction from "./components/Transaction";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";

function AppContent() {
  const location = useLocation();

  // hide navbar on login & register
  const hideNavbar = !localStorage.getItem("token");
  // const hideNavbar = ["/", "/register","/login"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/income" element={
          <PrivateRoute>
            <Income />
          </PrivateRoute>
        } />

        <Route path="/expense" element={
          <PrivateRoute>
            <Expense />
          </PrivateRoute>
        } />

        <Route path="/transaction" element={
          <PrivateRoute>
            <Transaction />
          </PrivateRoute>
        } />


        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;