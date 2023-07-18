import React from 'react'

const App = () => {
  return (
    <>
      <div className="
        p-6 border border-b-orange-500 
        bg-gradient-to-br from-blue-500 to-pink-400
        dark:bg-gradient-to-r
        dark:from-gray-500
        dark:to-green-400
      ">
        <h1 className='text-orange-500 font-bold text-[44px]'>Ola</h1>
      </div>
      <button 
        type="button" 
        className="
          text-white
          bg-blue-700
          hover:bg-blue-800
            focus:outline-none 
            focus:ring-4 
          focus:ring-blue-300 
            font-medium
            rounded-full 
            text-sm
            px-5
            py-2.5
            text-center
            mr-2 
            mb-2
          dark:bg-orange-600
          dark:hover:bg-orange-700
          dark:focus:ring-orange-800
          ">Default</button>

    </>
  )
}

export default App
