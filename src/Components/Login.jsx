import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserContext } from "../Context/UserContext";

import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { getProfile } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:4000/api/login/user`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
        getProfile();
        toast.success("Login Success");
      } else if (response.status === 401) {
        console.log(response);
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="sign-in__wrapper">
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleFormSubmit}>
        <div className="h4 mb-2 text-center">Sign In</div>

        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={email}
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
      </Form>
    </div>
  );
};

export default Login;
