import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import LoopMark from "./LoopMark.jsx";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="grid min-h-dvh place-items-center bg-paper px-4">
        <div className="flex flex-col items-center gap-3">
          <LoopMark className="h-8 w-8 animate-pulse text-brand" />
          <p className="text-caption text-ink-3">Checking your session…</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
