import React, { useContext, useEffect } from "react";
import { Navbar, Container, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { UserContext } from "../Context/UserContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser, getProfile } = useContext(UserContext);

  useEffect(() => {
    getProfile();
  }, []);

  const handleLogout = () => {};

  console.log(user);

  const authToken = localStorage.getItem("token");
  const profilePicPath = user ? user.profilePic : null;
  const profilePic = profilePicPath
    ? `http://localhost:4000/assets/${profilePicPath}`
    : ``;

  return (
    <Navbar fixed="top" className="bg-body-tertiary">
      <Container>
        <Link to="/">
          <Button variant="Link">Book Store</Button>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <div className="d-flex gap-4">
            {authToken ? (
              <div className="d-flex justify-content-center align-items-center gap-4">
                <Link to="/add">
                  <Button variant="primary">Add Book</Button>
                </Link>
                <Link to="/listBooks">
                  <Button variant="secondary">Books</Button>
                </Link>
                <Link to="/profile">
                  <Image
                    src={profilePic}
                    alt="Profile"
                    roundedCircle
                    width="55"
                    height="50"
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
