import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
        password_confirmation: cpassword,

      });

      alert(res.data.message);

      // clear form
      setName("");
      setEmail("");
      setPassword("");
      setCpassword("");

    } catch (err) {
      console.log(err.response.data);

      if (err.response.data.errors) {
        alert(Object.values(err.response.data.errors).join("\n"));
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Register</h3>

            <form onSubmit={handleRegister}>

              <div className="mb-3">
                <label className="form-label">Name <sup style={{ color: "red" }}>*</sup></label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email <sup style={{ color: "red" }}>*</sup></label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password <sup style={{ color: "red" }}>*</sup></label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password <sup style={{ color: "red" }}>*</sup></label>
                <input
                  type="password"
                  className="form-control"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>

              <p className="text-center mt-3">
                Already registered? <a href="/">Login</a>
              </p>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;