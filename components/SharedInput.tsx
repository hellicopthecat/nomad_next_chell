import {HTMLInputTypeAttribute, ReactNode} from "react";

interface ISharedInputProps {
  name: string;
  icon: ReactNode;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  className?: string;
  required?: boolean;
  errMsg: string[];
}
export default function SharedInput({
  name,
  icon,
  type,
  placeholder,
  className,
  required,
  errMsg,
}: ISharedInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex items-center">
        <label htmlFor={name} className="absolute left-2">
          {icon}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`pl-10 py-2 border rounded-full w-full focus:ring-2 focus:ring-offset-4 focus:ring-gray-200 outline-none
            invalid:focus:ring-red-500 invalid:ring-red-500 ${className}
            ${errMsg.length > 0 ? "focus:ring-red-500" : "focus:ring-gray-200 "}
            `}
          required={required}
        />
      </div>
      {errMsg.map((err, index) => (
        <span key={index} className="text-red-400">
          {err}
        </span>
      ))}
    </div>
  );
}
