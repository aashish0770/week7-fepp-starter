import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Jobify</h1>
      </Link>
      <div className="links">
        <div>
          <Link to="/jobs/add-job">Add Job</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
