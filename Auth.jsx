import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [tab, setTab] = useState("login");
  const navigate = useNavigate();

  // LOGIN
  function handleLogin(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const pass  = e.target.password.value;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === pass);

    if (!user) return alert("Invalid login");

    localStorage.setItem("user_name", user.name);
    localStorage.setItem("user_email", user.email);

    navigate("/dashboard");
  }

  // SIGNUP
  function handleSignup(e) {
    e.preventDefault();

    const name  = e.target.name.value;
    const email = e.target.email.value;
    const pass  = e.target.password.value;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ name, email, password: pass });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user_name", name);
    localStorage.setItem("user_email", email);

    navigate("/dashboard");
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-tabs">
          <div
            className={`auth-tab ${tab === "login" && "active"}`}
            onClick={() => setTab("login")}
          >
            Log In
          </div>

          <div
            className={`auth-tab ${tab === "signup" && "active"}`}
            onClick={() => setTab("signup")}
          >
            Create Account
          </div>
        </div>

        {tab === "login" && (
          <form className="auth-form" onSubmit={handleLogin}>
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />
            <button className="btn-primary">Log In</button>
          </form>
        )}

        {tab === "signup" && (
          <form className="auth-form" onSubmit={handleSignup}>
            <input name="name" type="text" placeholder="Full name" required />
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />
            <button className="btn-primary">Create Account</button>
          </form>
        )}
      </div>
    </div>
  );
}
