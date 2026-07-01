import { useState } from "react";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../components/PageTitle.jsx";

export function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const users = [
    { username: "abdi", password: "123" },
    { username: "ladiif", password: "123" }
  ];

  function submit(event) {
    event.preventDefault();
    const username = values.username.trim().toLowerCase();
    const canLogin = users.some((user) => user.username === username && user.password === values.password);

    if (canLogin) {
      sessionStorage.setItem("tourismLoggedIn", "true");
      sessionStorage.setItem("tourismUser", username);
      setMessage("Login successful. Redirecting...");
      setTimeout(() => navigate("/"), 500);
    } else {
      setMessage("Invalid username or password.");
    }
  }

  return (
    <section className="page narrow">
      <PageTitle title="Login Page" subtitle="Sign in to use the tourism management system." />
      <form className="panel formPanel" onSubmit={submit}>
        <label>Username<input value={values.username} onChange={(event) => setValues({ ...values, username: event.target.value })} placeholder="abdi" /></label>
        <label>Password<input type="password" value={values.password} onChange={(event) => setValues({ ...values, password: event.target.value })} placeholder="123" /></label>
        <button className="button primary" type="submit"><LogIn size={18} /> Login</button>
        {message && <p className="feedback">{message}</p>}
      </form>
    </section>
  );
}
