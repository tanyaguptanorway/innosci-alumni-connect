import { ChevronDown, type LucideIcon } from "lucide-react";

export function Field({
  label,
  placeholder,
  name,
  type = "text",
  icon: Icon,
  required = false,
}: {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
  icon?: LucideIcon;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-teal-600">*</span>}
      </span>
      <span className="relative block">
        {Icon && <Icon className="absolute left-3.5 top-3.5 size-4 text-slate-400" />}
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-slate-200 bg-white py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 ${Icon ? "pl-10 pr-4" : "px-4"}`}
        />
      </span>
    </label>
  );
}

export function SelectField({ label, options, name }: { label: string; options: string[]; name: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <span className="relative block">
        <select name={name} className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10">
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-3.5 size-4 text-slate-400" />
      </span>
    </label>
  );
}