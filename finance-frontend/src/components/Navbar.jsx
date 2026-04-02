import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    await axios.post("http://localhost:8000/api/logout", {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Finance Tracker</h2>

      <div>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/income" style={styles.link}>Income</Link>
        <Link to="/expense" style={styles.link}>Expense</Link>
        <Link to="/transaction" style={styles.link}>Transaction</Link>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </nav>

  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "#333",
    color: "#fff"
  },
  logo: {
    margin: 0
  },
  link: {
    margin: "0 10px",
    color: "#fff",
    textDecoration: "none"
  }
};

export default Navbar;