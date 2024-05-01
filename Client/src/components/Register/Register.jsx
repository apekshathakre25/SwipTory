import React, { useState } from "react";
import { registerUser } from "../../API/Auth";
import styles from "./Register.module.css";
import passwordIcon from "../../assets/passwordIcon.png";
import Container from "../Container/Container";
import { useToast } from "@chakra-ui/react";

const Register = ({ showRegister, setShowRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const toast = useToast();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.password) {
      alert("Fields can't be empty");
      return;
    }

    try {
      const response = await registerUser({ ...formData });
      setShowRegister(false);
      toast({
        title: "User Registered Successfully",
        description: "Sign in with the same credentials",
        status: "success",
        isClosable: true,
        duration: 3000,
        position: "top",
      });
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.message);
      toast({
        title: "Invalid credentials",
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top",
      });
      console.log(error);
    }
  };

  return (
    <>
      <Container isOpen={showRegister} setIsOpen={setShowRegister}>
        <h1 className={styles.formHeader}>Register to SwipTory</h1>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formContainer_div}>
            <label className={styles.formContainer_label}>Username</label>
            <input
              className={styles.input}
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
              placeholder="Enter username"
            />
          </div>
          <div className={styles.passwordContainer}>
            <label className={styles.formContainer_label}>Password</label>
            <input
              className={styles.input}
              name="password"
              value={formData.password}
              onChange={handleChange}
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
          {showError && <div className={styles.error}>{errorMessage}</div>}
          <div className={styles.formContainer_div}>
            <button
              type="submit"
              onClick={handleSubmit}
              className={styles.formContainer_button}
            >
              Register
            </button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default Register;
