import React, { useContext, useEffect } from "react";
import { Navbar, Container, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../Context/UserContext";

import { toast } from "sonner";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({});
    toast.success("Logout Success");
    navigate("/login");
  };

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  const checkTokenExpiration = () => {
    const authToken = localStorage.getItem("token");

    if (!authToken) {
      return;
    }

    try {
      const decodedToken = jwtDecode(authToken);
      console.log(decodedToken.exp, Math.floor(Date.now() / 1000));

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
          <Image
            src="https://dynamic.brandcrowd.com/asset/logo/230da536-f2f2-4479-8c0f-87ad3a0dc7e8/logo-search-grid-1x?logoTemplateVersion=2&v=638374669166830000&text=store"
            alt="Logo"
            width="50"
            roundedCircle
          />
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <div className="d-flex gap-4">
            {authToken ? (
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
