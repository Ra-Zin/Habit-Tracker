import { SignOut } from "@phosphor-icons/react/dist/ssr/SignOut";
import { useAuth } from "../context/AuthContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import LoopMark from "./LoopMark.jsx";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2.5 rounded-lg">
          <LoopMark className="h-6 w-6 text-brand" />
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            Habit<span className="text-brand">Loop</span>
          </span>
        </a>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          {user && (
            <>
              <span
                className="ml-1 hidden max-w-[10rem] truncate text-sm font-semibold text-ink-2 sm:inline"
                title={user.username}
              >
                {user.username}
              </span>

              <button
                type="button"
                onClick={logout}
                aria-label="Log out"
                className="flex h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-ink-2 transition-[background-color,color,scale] duration-150 hover:bg-surface-2 hover:text-ink active:scale-[0.96]"
              >
                <SignOut weight="regular" className="h-5 w-5" aria-hidden="true" />
                <span className="hidden md:inline">Log out</span>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
