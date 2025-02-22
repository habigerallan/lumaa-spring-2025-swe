import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const styles: Record<string, React.CSSProperties> = {
  div: {
    margin: "1% 2% 2% 1%",
    width: "40%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(226, 226, 226)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "10px",
    border: "3px solid rgb(78, 78, 78)",
    boxShadow: "0 4px 8px rgb(0, 0, 0)",
  },
  error: {
    color: "rgb(187, 2, 2)",
    fontSize: "2vh",
    margin: 0,
    userSelect: "none",
  },
  h2: {
    fontSize: "5vh",
    userSelect: "none",
    margin: "2% 0% 0% 0%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
  },
  label: {
    marginTop: "2%",
    fontSize: "4vh",
    fontWeight: "bold",
    userSelect: "none",
  },
  input: {
    marginTop: "1%",
    border: "2px solid rgb(0, 0, 0)",
    borderRadius: "5px",
    padding: "1%",
    fontSize: "3vh",
  },
  button: {
    backgroundColor: "rgb(255, 255, 255)",
    marginTop: "6%",
    padding: "2%",
    border: "2px solid rgb(0, 0, 0)",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "3vh",
    userSelect: "none",
  },
  link: {
    userSelect: "none",
    marginTop: "3%",
    fontSize: "2vh",
    color: "rgb(71, 131, 241)",
    textDecoration: "underline",
    cursor: "pointer",
  }
};


const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9]{3,8}$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setUsernameError("");
    setPasswordError("");

    if (isLogin) {
      try {
        await login(username, password);
        navigate("/tasks");
      } catch (error) {
        setPasswordError("Incorrect username or password");
      }
    } else {
      let valid = true;

      if (!validateUsername(username)) {
        setUsernameError("Username must be 3-8 characters and only contain letters or numbers.");
        valid = false;
      }
      if (!validatePassword(password)) {
        setPasswordError("Password must be at least 6 characters long.");
        valid = false;
      }

      if (valid) {
        await register(username, password);
        navigate("/login");
      }
    }
  };

  return (
    <div style={styles.div}>
      <h2 style={styles.h2}>{isLogin ? "Login" : "Register"}</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label} htmlFor="username">Username:</label>
        <input
          style={styles.input}
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        {usernameError && <p style={styles.error}>{usernameError}</p>}

        <label style={styles.label} htmlFor="password">Password:</label>
        <input
          style={styles.input}
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isLogin ? "current-password" : "new-password"} 
        />
        {passwordError && <p style={styles.error}>{passwordError}</p>}

        <button style={styles.button} type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <p 
        style={styles.link} 
        onClick={() => navigate(isLogin ? "/register" : "/login")}>
        {isLogin ? "Don't have an account? Register here." : "Already have an account? Login here."}
      </p>
    </div>
  );
};

export default AuthForm;
