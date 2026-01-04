import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-content">
        <h1 className="logo">Capital Annex Bank</h1>

        <nav>
          <Link to="/">Auth</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </div>
    </header>
  );
}
