import { useEffect, useRef, useState } from "react";

interface SearchProps {
  type: "button" | "input";
}

const Search = ({ type }: SearchProps) => {
  const [showInput, setShowInput] = useState(type === "input");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type !== "button") return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [type]);

  return (
    <div
      ref={searchRef}
      className="  flex items-center gap-2"
    >
      {showInput && (
        <input
          type="text"
          placeholder="Search..."
          autoFocus
          className="border-b w-80 border-black/40 py-1 outline-none text-sm px-1"
        />
      )}

      <svg
        onClick={() => setShowInput(true)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5 cursor-pointer border rounded-full h-10 w-10 p-2 bg-gray-100"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  );
};

export default Search;