import { InputHTMLAttributes } from 'react';

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  error?: string;
}

export const FormInput = ({ label, error, id, ...props }: FormInputProps) => {
  const inputClasses = `block w-full px-4 py-2.5 text-gray-900 border rounded-lg focus:ring-2 focus:border-transparent bg-white/50 shadow-sm transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${
    error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
  }`;

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>
      <input id={id} className={inputClasses} {...props} />
      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>}
    </div>
  );
};
