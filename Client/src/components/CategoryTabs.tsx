import React from 'react'
import Search from './Search'
import SearchNav from './SearchNav'

const CategoryTabs = () => {
  return (
    <div className=' h-14 flex z-10 sticky top-14 bg-white items-center'>
      <div className='flex items-center px-10 justify-between flex-1 border-b h-full'>
            <h1 className='font-semibold text-black/90 text-2xl'>Explore</h1>
            {/* <div>
                <div className=' bg-gray-100 shadow-sm py-2 px-4 rounded-full'>All</div>
            </div> */}
            <div className='flex items-center gap-2'>
                <Search type='input'/>
                <div className='flex items-center gap-1 text-sm bg-gray-100 px-2 py-2 rounded-full shadow-sm border'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                    Filter
                </div>
            </div>
      </div>
    </div>
  )
}

export default CategoryTabs
