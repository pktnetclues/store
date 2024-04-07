import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      cnfPassword: "",
      name: "",
      profilePic: null,
      loading: false,
    };
    // this.navigate = useNavigate();
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    if (this.state.name.length < 3) {
      toast.error("Name should be atleast 3 characters long");
      return;
    }

    if (this.state.password.length < 6) {
      toast.error("Password should be atleast 6 characters long");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.state.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password matching validation
    if (this.state.password !== this.state.cnfPassword) {
      toast.error("Passwords do not match");
      return;
    }

    this.setState({ loading: true });

    const formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("name", this.state.name);
    formData.append("profilePic", this.state.profilePic);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:4000/api/register/admin`, true);
    xhr.withCredentials = true;
    xhr.send(formData);
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var json_obj = JSON.parse(xhr.responseText);
          if (json_obj.message === "success") {
            this.setState({
              email: "",
              password: "",
              cnfPassword: "",
              name: "",
              loading: false,
            });
            toast.success("Register Successful", { duration: 2000 });
            this.navigate("/login");
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
          this.setState({ loading: false });
          toast.error("Something went wrong, try again");
        }
      }
    };
    xhr.onerror = () => {
      console.error(xhr.statusText);
    };
  };

  MAX_FILE_SIZE_MB = 1;

  handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file.size > this.MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(`File size should be less than ${this.MAX_FILE_SIZE_MB}MB`);
      return;
    } else if (!file.type.includes("image")) {
      toast.error(`File should be of Image type only`);
      return;
    } else {
      this.setState({ profilePic: file });
    }
  };

  render() {
    return (
      <div className="sign-in__wrapper">
        <Form
          name="form"
          className="shadow p-4 bg-white rounded"
          onSubmit={this.handleFormSubmit}
        >
          <div className="h4 mb-2 text-center">Sign In</div>
          <Form.Group className="mb-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.name}
              placeholder="Name"
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={this.state.email}
              placeholder="Email"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="cnfpassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.cnfPassword}
              placeholder="Password"
              onChange={(e) => this.setState({ cnfPassword: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="profilePic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={this.handleProfilePicChange}
            />
          </Form.Group>

          <Button className="w-100" variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

export default Register;
