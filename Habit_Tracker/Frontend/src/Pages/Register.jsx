import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import AuthShell from "../components/AuthShell.jsx";
import Field from "../components/Field.jsx";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (username.trim().length < 3) {
      setError("Usernames need at least 3 characters.");
      return;
    }
    if (password.length < 6) {
      setError("Passwords need at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      await register(username.trim(), email, password);
      navigate("/", { replace: true });
    } catch (registerError) {
      setError(
        registerError.response?.data?.error ||
          "That account could not be created. Try a different email."
      );
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Start a chain."
      subtitle="One habit is enough to begin."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-brand underline underline-offset-4">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Field
          label="Username"
          required
          minLength={3}
          autoComplete="username"
          placeholder="sleepyy"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

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
          minLength={6}
          autoComplete="new-password"
          hint="At least 6 characters."
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
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}

export default Register;
