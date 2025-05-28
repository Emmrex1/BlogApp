import React from 'react';

const SearchBlogs = ({ search, handleSearchChange, handleSearch }) => {
   const handleKeyPress = (event) => {
     if(event.key === "Enter") {
        handleSearch()
     }
   }


  return (
    <div className="w-full  flex items-center bg-white p-2 rounded-xl shadow-md">
      <input
        value={search}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        type="text"
        placeholder="Search for your hotel..."
        className="flex-1 px-4 py-2 text-gray-700 bg-[#f7f8f9] rounded-l-xl focus:outline-none focus:ring-2 focus:ring-[#1a79cc]"
      />
      <button
        onClick={handleSearch}
        className="px-6 py-2 bg-[#1a79cc] text-white font-medium rounded-r-xl hover:bg-[#166bb2] transition duration-200"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBlogs;
