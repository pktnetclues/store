import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const errMess = {
  message: "OTP Is required",
};

const validationSchema = yup.object().shape({
  otp: yup.string().required(errMess.message),
});

const VerifyUser = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const email = location?.state?.email || user.email;

  useEffect(() => {
    if (user && user?.verified == 1) {
      navigate("/profile");
      toast.success("You are already verified");
    }
  });

  const sendOTP = async () => {
    const response = await axios.get(`http://localhost:4000/api/sendotp/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status == 200) {
      toast.success("OTP Sent Syccessfully");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleFormSubmit = async (data) => {
    const { otp } = data;
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/api/verify/user`,
        { email, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        navigate("/login");
        toast.success("OTP verified successfully.");
      }
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  const handleError = (error) => {
    let errorMessage = "An error occurred. Please try again.";
    if (error.response && error.response.status === 400) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
  };

  return (
    <div className="sign-in__wrapper">
      <Form
        name="form"
        className="shadow p-4 bg-white rounded"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="h4 mb-2 text-center">OTP Verification</div>
        <p className="mb-3 text-center">
          An OTP has been sent to your email. Please enter it below:
        </p>

        <Form.Group className="mb-2" controlId="otp">
          <Form.Control
            type="text"
            name="otp"
            placeholder="Enter OTP"
            {...register("otp")}
            isInvalid={errors.otp}
          />
          <Form.Control.Feedback type="invalid">
            {errors.otp?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Submit Button */}
        <div className="d-flex gap-2">
          {!loading ? (
            <Button className="w-100" variant="primary" type="submit">
              Verify OTP
            </Button>
          ) : (
            <Button className="w-100" variant="primary" type="submit" disabled>
              Verifying OTP...
            </Button>
          )}
          <Link to={"/profile"}>
            <Button className="w-100" variant="primary">
              Verify Later
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default VerifyUser;
