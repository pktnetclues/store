import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
// import { UserContext } from "./Context/UserContext";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
    };
  }

  //   static contextType = UserContext;

  //   navigate = useNavigate();

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const formData = {
      email,
      password,
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:4000/api/login/admin`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = true;
    xhr.send(JSON.stringify(formData));
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        console.log(xhr);
        if (xhr.status === 200) {
          const json_obj = JSON.parse(xhr.responseText);
          if (json_obj.message === "success") {
            this.setState({ email: "", password: "", loading: false });
            localStorage.setItem("authToken", json_obj.token);
            toast.success("Login Successful", { duration: 2000 });
            this.context.getProfile();
            this.navigate("/listBooks");
          } else {
            toast.error("There is an error");
            console.error(json_obj.message);
            this.setState({ loading: false });
          }
        } else if (xhr.status === 400) {
          toast.error(JSON.parse(xhr.responseText).message);
          this.setState({ loading: false });
          console.error(xhr.message);
        } else {
          toast.error("Something went wrong, try again");
        }
      }
    };
    xhr.onerror = () => {
      toast.error("Something Wrong in Backend");
      this.setState({ loading: false });
      console.error(xhr.statusText);
    };
  };

  render() {
    const { email, password, loading } = this.state;

    return (
      <div className="sign-in__wrapper">
        <Form
          className="shadow p-4 bg-white rounded"
          onSubmit={this.handleFormSubmit}
        >
          <div className="h4 mb-2 text-center">Sign In</div>

          <Form.Group className="mb-2" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={email}
              placeholder="email"
              onChange={(e) => this.setState({ email: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
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

          <div className="text-center mt-2">
            <small>
              Don't have an account?{" "}
              <Link to="/register" className="text-decoration-none">
                Register
              </Link>
            </small>
          </div>
        </Form>
      </div>
    );
  }
}

export default Login;
