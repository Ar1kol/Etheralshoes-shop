import { useState, forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../Slices/userSlice";
import "./User.css";

import { Form } from "react-bootstrap";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [open, setOpen] = useState(false);

  const togglePassword = () => {
    // When the handler is invoked inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
    handleClick();
    dispatch(loginAsync({ username, password }));
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <div className="user-page">
        <div className="container-user">
          <div className="card-user">
            <div className="user-form">
              <div className="user-left-side">
                <img src={require("../../assets/reg_log.jpg")} alt="" />
              </div>
              <div className="user-right-side">
                <div className="user-heading">
                  <h3>Log in to Ethereal Shoes.</h3>
                  <p>
                    Welcome Back! Login with your data that you entered during
                    registration.
                  </p>
                </div>
                <Form onSubmit={submitForm}>
                  <div className="user-input-text">
                    <Form.Control
                      required
                      type="text"
                      placeholder="User Name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      name="username"
                    />
                  </div>
                  <div className="user-input-text">
                    <Form.Control
                      required
                      type={passwordShown ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                    />
                    <label>Password</label>
                  </div>
                  <div className="show_pass">
                    <div className="show-user">
                      <span
                        onClick={togglePassword}
                        className={`${passwordShown ? "user-green" : ""}`}
                      ></span>
                      <p>{passwordShown ? "Hide password" : "Show password"}</p>
                    </div>
                  </div>
                  <div className="user-button">
                    <button type="submit">Login</button>
                  </div>
                </Form>
                <div className="register">
                  <p className="user-bottom-text">
                    Don't have an account?<Link to="/register"> Sign Up</Link>
                  </p>
                </div>
                <p className="image-author">
                  Image by{" "}
                  <a href="https://pixabay.com/users/oldiefan-740865/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1376855">
                    Christiane
                  </a>{" "}
                  from{" "}
                  <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1376855">
                    Pixabay
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          User {username} signed in
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
