import { useState } from "react";
import { Eye, EyeOff, RefreshCw } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showStrength?: boolean;
  showGenerator?: boolean;
  error?: string;
}

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Password",
  showStrength = false,
  showGenerator = false,
  error,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    onChange(password);
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: "Weak", color: "bg-red-500" };
    if (strength <= 3)
      return { strength, label: "Medium", color: "bg-yellow-500" };
    return { strength, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = showStrength ? getPasswordStrength(value) : null;

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-white dark:bg-dark-surface border border-primary-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-500 text-[#1A1A1A] dark:text-dark-text pr-24"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
          {showGenerator && (
            <button
              type="button"
              onClick={generatePassword}
              className="p-2 hover:bg-primary-100 dark:hover:bg-dark-border rounded-lg transition-colors"
              title="Generate password"
            >
              <RefreshCw className="w-5 h-5 text-primary dark:text-primary-500" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-2 hover:bg-primary-100 dark:hover:bg-dark-border rounded-lg transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-primary dark:text-primary-500" />
            ) : (
              <Eye className="w-5 h-5 text-primary dark:text-primary-500" />
            )}
          </button>
        </div>
      </div>

      {showStrength && value && passwordStrength && (
        <div className="space-y-1">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded ${
                  i < passwordStrength.strength
                    ? passwordStrength.color
                    : "bg-gray-200 dark:bg-dark-border"
                }`}
              />
            ))}
          </div>
          <p
            className={`text-sm ${
              passwordStrength.strength <= 2
                ? "text-red-500"
                : passwordStrength.strength <= 3
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            Password strength: {passwordStrength.label}
          </p>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
