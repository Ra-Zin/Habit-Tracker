import { useId } from "react";

function Field({ label, hint, type = "text", value, onChange, ...rest }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="block text-caption font-semibold text-ink-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-2 min-h-[44px] w-full rounded-lg bg-surface-2 px-3.5 text-base text-ink ring-1 ring-line transition-[box-shadow] duration-150 placeholder:text-ink-3 focus:outline-none focus:ring-2 focus:ring-brand"
        {...rest}
      />
      {hint && <p className="mt-1.5 text-caption text-ink-3">{hint}</p>}
    </div>
  );
}

export default Field;
