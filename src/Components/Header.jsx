import React, { useContext, useEffect } from "react";
import { Navbar, Container, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../Context/UserContext";
import logo from "../assets/netclues_logo.png";

import { toast } from "sonner";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logout Success");
    navigate("/login");
  };

  useEffect(() => {
    checkTokenExpiration();

    setInterval(() => {
      checkTokenExpiration();
    }, 60000);

    return () => {
      clearInterval();
    };
  }, []);

  const checkTokenExpiration = () => {
    const authToken = localStorage.getItem("token");

    if (!authToken) {
      return;
    }

    try {
      const decodedToken = jwtDecode(authToken);

      if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
        handleLogout();
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  const authToken = localStorage.getItem("token");
  const profilePicPath = user ? user.profilePic : null;
  const profilePic = profilePicPath
    ? `http://localhost:4000/assets/profilePics/${profilePicPath}`
    : ``;

  return (
    <Navbar fixed="top" className="bg-body-tertiary">
      <Container>
        <Link to="/">
          <Image src={logo} alt="Logo" width="50" roundedCircle />
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <div className="d-flex gap-4">
            {user?.email ? (
              <div className="d-flex justify-content-center align-items-center gap-4">
                <Link to="/create/product">
                  <Button variant="primary">Add Product</Button>
                </Link>
                <Link to="/list/products">
                  <Button variant="secondary">Products</Button>
                </Link>
                <Link to="/profile">
                  <Image
                    src={profilePic}
                    alt="Profile"
                    roundedCircle
                    width="50"
                  />
                </Link>
                <Button onClick={handleLogout} variant="secondary">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center gap-4">
                <Link to="/register">
                  <Button variant="secondary">Register</Button>
                </Link>
                <Link to="/login">
                  <Button variant="primary">Login</Button>
                </Link>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
