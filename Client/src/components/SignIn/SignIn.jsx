import React, { useState } from "react";
import Container from "../Container/Container";
import styles from "./SignIn.module.css";
import passwordIcon from "../../assets/passwordIcon.png";
import { loginUser } from "../../API/Auth";
import { useToast } from "@chakra-ui/react";

const SignIn = ({ onAuthSuccess, showSignIn, setShowSignIn }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const toast = useToast();

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value.trim(),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await loginUser(formData.username, formData.password);
      localStorage.setItem("token", response?.token);
      localStorage.setItem("userId", response?.userId);
      setSuccess(true);

      if (onAuthSuccess) {
        onAuthSuccess();
      }
      setShowSignIn(false);
      toast({
        title: "User Signed In Successfully",
        status: "success",
        isClosable: true,
        duration: 3000,
        position: "top",
      });
    } catch (error) {
      setError("Invalid credentials. Please try again.");
      toast({
        title: "Invalid Credentials. Please try again.",
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top",
      });
      console.error("Login failed:", error);
    }
  };

  return (
    <Container isOpen={showSignIn} setIsOpen={setShowSignIn}>
      {success ? (
        <>
          <h1 className={styles.formHeader}>Login Successful!</h1>
          <p className={styles.formHeader}>Happy Exploring.</p>
        </>
      ) : (
        <>
          <h1 className={styles.formHeader}>Login to SwipTory</h1>
          <form className={styles.formContainer}>
            <div className={styles.formContainer_div}>
              <label className={styles.formContainer_label}>Username</label>
              <input
                className={styles.formContainer_input}
                name="username"
                value={formData.username}
                onChange={handleFormChange}
                type="text"
                placeholder="Enter username"
              />
            </div>
            <div className={styles.passwordContainer}>
              <label className={styles.formContainer_label}>Password</label>
              <input
                className={styles.formContainer_input}
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
              />
              <img
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordIcon}
                src={passwordIcon}
                alt="password icon"
              />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.formContainer_div}>
              <button
                onClick={handleSubmit}
                className={styles.formContainer_button}>
                Login
              </button>
            </div>
          </form>
        </>
      )}
    </Container>
  );
};

export default SignIn;
