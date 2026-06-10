const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-[14px] text-black outline-none transition-colors focus:border-[#38ab8a]";

const labelClass = "mb-1.5 block text-[18px] font-medium text-black/80";

export function AdminField({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
      {hint ? (
        <p className="mt-1 text-[15px] leading-relaxed text-black/55">{hint}</p>
      ) : null}
    </div>
  );
}

export function AdminInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string },
) {
  const { label, hint, className = "", ...rest } = props;
  return (
    <AdminField label={label} hint={hint}>
      <input className={`${inputClass} ${className}`} {...rest} />
    </AdminField>
  );
}

export function AdminTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    hint?: string;
  },
) {
  const { label, hint, className = "", ...rest } = props;
  return (
    <AdminField label={label} hint={hint}>
      <textarea className={`${inputClass} min-h-24 ${className}`} {...rest} />
    </AdminField>
  );
}

export function AdminSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    hint?: string;
    options: { value: string; label: string }[];
  },
) {
  const { label, hint, options, className = "", ...rest } = props;
  return (
    <AdminField label={label} hint={hint}>
      <select className={`${inputClass} ${className}`} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </AdminField>
  );
}

export function linesToList(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function listToLines(items: string[]): string {
  return items.join("\n");
}
