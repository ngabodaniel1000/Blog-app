import React from 'react';
import { useParams } from 'react-router-dom';

function Explore() {
  const { search } = useParams();

  return (
    <div className='h-screen'>
    <div className="mt-[70px] px-4 md:px-6 lg:px-8 mx-auto max-w-screen-md bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="text-center">
        {search ? (
          <ul className="space-y-6 sm:space-y-8">
            <li>
              <a
                href={`/explore/post/${search}`}
                className="text-pink-500 hover:underline text-lg sm:text-xl"
              >
                Explore Posts
              </a>
            </li>
            <li>
              <a
                href={`/explore/user/${search}`}
                className="text-pink-500 hover:underline text-lg sm:text-xl"
              >
                Explore People
              </a>
            </li>
          </ul>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl leading-relaxed">
              Search in the input above to get started.
            </p>
            <button
              className="px-6 py-3 bg-pink-600 text-white font-medium rounded-md hover:bg-pink-700 transition duration-200"
              onClick={() => alert('Add a search term to explore!')}
            >
              Explore Now
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default Explore;
