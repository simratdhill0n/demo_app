import React, { useState } from 'react';
import Qr from './Qr';
import Details from './Details';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<any>(null);

  const handleClick = async () => {
    const url = new URL('http://127.0.0.1:8000/user/search/');
    url.searchParams.append('address', searchTerm);

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const newData = await response.json();
        setData(newData);
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="flex-row justify-center h-screen">
        <div className="max-w-md mx-auto w-full">
          <div className="relative">
            <input
              type="text"
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search..."
            />
            <button
              onClick={handleClick}
              className="absolute inset-y-0 right-0 flex items-center px-4 bg-gray-50 text-gray-500 rounded-r-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {/* Search icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.5 1.5a7 7 0 100 14 7 7 0 000-14zM0 8a8 8 0 1116 0A8 8 0 010 8z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M13.121 14.5a5.499 5.499 0 101.378-1.378l5.352 5.353a1 1 0 11-1.414 1.414l-5.353-5.353zm.707-2.121a4 4 0 11-5.656 5.657A4 4 0 0113.828 12.38z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <Qr myStringProp={searchTerm} />
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </div>
        <div>
          {data && <Details data={data} />}
        </div>
      </div>
    </div>
  );
};

export default Search;
