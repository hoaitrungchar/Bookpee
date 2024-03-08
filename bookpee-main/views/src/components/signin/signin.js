import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const SignIn = () => {
  const [user_id, setUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState("customer"); // Default to "customer"
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/api/signin", {
      user_id,
      role: selectedRole,
    })
    .then((response) => {
      cookies.set("TOKEN", response.data.token, {
        path: "/",
      });

      setTimeout(() => {
        window.location.reload();
      }, 100);

      const userRole = response.data.member.role;

      if (userRole === "customer") {
        navigate("/order");
      } else if (userRole === "provider") {
        navigate("/crudBook");
      }
    })
    .catch((error) => {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    });
  };

  return (
    <form>
      <div className="mb-3" style={{marginLeft: "20%", marginRight: "20%"}}>
        <label htmlFor="user_id" className="form-label">
          User ID
        </label>
        <input
          type="text"
          className="form-control"
          id="user_id"
          value={user_id}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div className="mb-3" style={{marginLeft: "20%", marginRight: "20%"}}>
        <label htmlFor="role" className="form-label">
          Role
        </label>
        <select
          className="form-select"
          id="role"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="provider">Provider</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary" style={{marginLeft: "20%", marginRight: "20%"}} onClick={(e) => handleSubmit(e)}>
        Đăng nhập
      </button>
      <p>{errorMessage ? errorMessage : ""}</p>
    </form>
  );
};

export default SignIn;