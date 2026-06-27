interface ButtonProps {
  children: React.ReactNode;
  color?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  disabled?: boolean;
}

const Button = ({
  children,
  color = "bg-blue-500 hover:bg-blue-600 text-white",
  icon,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${color} px-4 py-2 flex gap-1 items-center transition-all cursor-pointer text-center justify-center rounded disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;