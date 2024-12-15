import React from 'react';
import { useParams } from 'react-router-dom';

function Explore() {
  const { search } = useParams();

  return (
    <div className="mt-[70px] md:ml-6 mx-auto p-6 max-w-4xl bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="text-center">
        {search ? (
          <ul className="space-y-4">
            <li>
              <a
                href={`/explore/post/${search}`}
                className="text-blue-500 hover:underline text-lg"
              >
                Explore Posts
              </a>
            </li>
            <li>
              <a
                href={`/explore/user/${search}`}
                className="text-blue-500 hover:underline text-lg"
              >
                Explore People
              </a>
            </li>
          </ul>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Search in the input above to get started.
            </p>
            <button
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
              onClick={() => alert('Add a search term to explore!')}
            >
              Explore Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
