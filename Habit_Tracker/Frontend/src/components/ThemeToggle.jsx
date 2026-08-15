import { Sun } from "@phosphor-icons/react/dist/ssr/Sun";
import { Moon } from "@phosphor-icons/react/dist/ssr/Moon";
import { useTheme } from "../context/ThemeContext.jsx";

/**
 * Both icons stay mounted and cross-fade, so the swap has an exit as well as an
 * enter without pulling in an animation library.
 */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-11 w-11 place-items-center rounded-lg text-ink-2 transition-[background-color,color,scale] duration-150 hover:bg-surface-2 hover:text-ink active:scale-[0.96]"
    >
      <span className="relative grid h-5 w-5 place-items-center">
        <Sun
          weight="regular"
          className="absolute h-5 w-5 transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
          style={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? "0.25" : "1",
            filter: isDark ? "blur(4px)" : "blur(0px)",
          }}
          aria-hidden="true"
        />
        <Moon
          weight="regular"
          className="absolute h-5 w-5 transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
          style={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? "1" : "0.25",
            filter: isDark ? "blur(0px)" : "blur(4px)",
          }}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}

export default ThemeToggle;
