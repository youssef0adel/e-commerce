import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { apiService } from "../services/api";

export default function Signup() 
{
  const [form, setForm] = useState(
  {
    name: "",
    email: "",
    password: "",
    avatar: "../assets/user_avatar",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup, login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) 
  {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Signup attempt with:", form);

    try {
      const result = await apiService.createUser(form);
      console.log("Signup response:", result);


      if (result._id || result.id) 
      {
        const user = {
          id: result._id || result.id,
          name: result.name,
          email: result.email,
          avatar: result.avatar,
        };

        login(user);
        navigate("/");
      } else {
        setError("Signup failed:No user id receive");
      }
    } catch (error) 
    {
      console.error("Signup error details:", error);

      if (
        error.message.includes("Email already exists") ||
        error.message.includes("11000")
      ) {
        setError("Email already exists. Please use a different email.");
      } else if (error.message.includes("400")) {
        setError("Invalid data. Please check your information.");
      } else {
        setError(`Signup failed: ${error.message}`);
      }
    } finally 
    {
      setLoading(false);
    }
  }

  return (
    <div className="row justify-content-center py-5 m-0">
      <div className="col-md-6">
        <h4>Sign up</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="Choose a password (min 4 characters)"
              minLength="4"
            />
          </div>
          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Creating Account..." : "Create account"}
          </button>
        </form>

        <div className="mt-4 p-3 bg-light rounded">
          <h6 className="mb-2">Test Account:</h6>
          <small className="text-muted">
            Try signing up with a new email, or use the demo credentials on the
            login page.
          </small>
        </div>
      </div>
    </div>
  );
}
