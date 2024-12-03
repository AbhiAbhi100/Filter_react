'use client';

import { useEffect, useState } from 'react';
import Card from './Card';
import Buttons from './Buttons';

export default function Home() {
  const [data, setData] = useState([]); //[]. rakhna padega beacause data initially null hai null me map nahi lag skta hai hai because data is the array

  const [originalData, setOriginalData] = useState([]);

  const colors = [...new Set(data.map((val) => val.albumId))];

  const filterItems = (cat) => {
    const newItems = data.filter((newval) => newval.albumId === cat);
    console.log(newItems);
    setData(newItems);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/photos'
      );
      const result = await response.json();
      const chunk1 = result.slice(0, 5);
      const chunk2 = result.slice(105, 108);
      const chunk3 = result.slice(159, 162);
      const results = chunk1.concat(chunk2, chunk3);
      setData(results);
      setOriginalData(results); //original data me value dal rhe search se hatane ko
    };

    const fetchMovieData = async () => {
      const options = {
          method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjdiZWI2ODZjN2JmZjRiZGYzMzk0YTJjYWJlZjE2MCIsIm5iZiI6MTczMzI0NDg0MS4yMTcsInN1YiI6IjY3NGYzN2E5ODczNTNiYTFjNDhjNjU4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5GFUjIBtQDSwmXBV3ixJFACypYHi2YfPC_Y0gKtheck',
        },
      };

      const response = await fetch(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        options
      );
      const data = await response.json();
      console.log('movie data : ', data);
    };
    fetchMovieData();
    fetchData();
  }, []);

  //search ko handle krna hai

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    if (query === '') {
      setData(originalData);
    } else {
      const filteredData = data.filter(
        (item) => item.title.toLowerCase().includes(query) //data ko filter by title
      );
      setData(filteredData);
    }
  };

  const clearAllFilters = () => {
    setData(originalData);
  };

  return (
    <div>
      <h1 className="text-center font-semibold py-10  ">Filter data</h1>

      <div>
        <input
          type="text"
          placeholder="Search here"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none  flex justify-center items-center  "
          onChange={handleSearch}
        />
      </div>

      <Buttons colors={colors} filterItems={filterItems} setData={setData} />

      <div className="text-center py-4">
        <button
          onClick={clearAllFilters}
          className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
        >
          Clear All Filters
        </button>
      </div>

      <main className="max-w-[1320px] mx-auto grid lg:grid-cols-3 md:grid-cols-2 gap-6 px-[20px]">
        {data.map((item) => (
          <Card key={item.id} index={item} />
        ))}
      </main>
    </div>
  );
}
