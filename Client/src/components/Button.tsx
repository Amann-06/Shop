interface ButtonProps {
  children: React.ReactNode;
  color?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  color = "bg-blue-500 hover:bg-blue-600",
  onClick,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${color} px-4 py-2 rounded text-white`}
    >
      {children}
    </button>
  );
};

export default Button;