const SearchNav = () => {
  return (
    <div className="flex  m-10 rounded-xl -mt-14 h-16 justify-between px-4 items-center bg-white z-10">
        <h1 className="font-bold text-xl text-black/90">Give All You Need</h1>
        <div className="border flex items-center p-1 rounded-full">
            <label htmlFor="search" className="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </label>
            <input
                type="text" id="search" className="outline-none px-2"
                placeholder="Search..."
            />
            <button className="bg-black/90 text-white px-6 py-1 rounded-full">Search</button>
        </div>
    </div>
  )
}

export default SearchNav
