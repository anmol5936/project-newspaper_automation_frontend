import React from 'react';

interface Props {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  min?: string | number;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export const CustomerFormInput: React.FC<Props> = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  min,
  required = false,
  placeholder,
  disabled = false
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-serif mb-2" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-lg font-serif
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100' : ''}
          focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default CustomerFormInput;