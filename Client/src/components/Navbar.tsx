import Search from "./Search"

export const Navbar = () => {
  return (
    <nav className="mx-10 z-10 flex absolute left-0 right-0 bg-white h-14 shadow-md items-center justify-between px-4 rounded-b-xl">
        <h1 className="font-bold">Shopyy</h1>
        <ul className="flex gap-5 text-gray-500 text-sm">
            <li>item-1</li>
            <li>item-2</li>
            <li>item-3</li>
        </ul>
        <div className="flex gap-5 items-center">
            <Search/>
            <div className="p-1.5 border rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
            </div>
            <div className="p-4 border rounded-full">

            </div>
        </div>
    </nav>
  )
}
