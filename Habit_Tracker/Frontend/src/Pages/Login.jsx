import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import AuthShell from "../components/AuthShell.jsx";
import Field from "../components/Field.jsx";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/dashboard", { replace: true });
    } catch (loginError) {
      setError(
        loginError.response?.data?.error ||
          "That email and password did not match an account."
      );
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back."
      subtitle="Pick up where your chain left off."
      footer={
        <>
          No account yet?{" "}
          <Link to="/register" className="font-semibold text-brand underline underline-offset-4">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Field
          label="Email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Field
          label="Password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error && (
          <p role="alert" className="rounded-lg bg-rose-soft px-3.5 py-2.5 text-caption font-medium text-rose">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="min-h-[44px] w-full rounded-lg bg-brand text-sm font-semibold text-on-brand shadow-card transition-[background-color,scale,opacity] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-brand-hover active:scale-[0.96] disabled:opacity-50"
        >
          {submitting ? "Logging in…" : "Log in"}
        </button>
      </form>
    </AuthShell>
  );
}

export default Login;
