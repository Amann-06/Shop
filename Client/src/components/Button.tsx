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
  color = "bg-blue-500 hover:bg-blue-600",
  icon,
  onClick,
  type = "button",
  disabled = false
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${color} px-4 py-2 flex gap-1 items-center text-center justify-center rounded ${color.includes("bg-white") ? "text-black" : "text-white"}`}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;