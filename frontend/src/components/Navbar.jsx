import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {

  
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Jobify</h1>
      </Link>
      <div className="links">
        {isAuthenticated && (
          <>
            <Link to="/jobs/add-job">Add Job</Link>
            <button onClick={handleLogout}>Log out</button>
          </>
        )}


        {!isAuthenticated && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
