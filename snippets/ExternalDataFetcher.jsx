import React, { useState, useEffect } from 'react';

export default function ExternalDataFetcher({ username = 'github' }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-75"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-150"></div>
        </div>
        <p className="text-center text-gray-400 mt-2">Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-900/20 rounded-lg border border-red-700">
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-red-400 font-semibold">Error fetching data</h3>
            <p className="text-red-300 text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700 shadow-lg">
      <div className="flex items-start space-x-4">
        <img
          src={data.avatar_url}
          alt={`${data.login}'s avatar`}
          className="w-20 h-20 rounded-full border-2 border-blue-500"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-1">{data.name || data.login}</h2>
          <p className="text-blue-400 text-sm mb-3">@{data.login}</p>

          {data.bio && (
            <p className="text-gray-300 mb-4">{data.bio}</p>
          )}

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-gray-400 text-xs">Repositories</p>
              <p className="text-white text-xl font-semibold">{data.public_repos}</p>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-gray-400 text-xs">Followers</p>
              <p className="text-white text-xl font-semibold">{data.followers}</p>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-gray-400 text-xs">Following</p>
              <p className="text-white text-xl font-semibold">{data.following}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            {data.company && (
              <span className="flex items-center text-gray-400">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {data.company}
              </span>
            )}
            {data.location && (
              <span className="flex items-center text-gray-400">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {data.location}
              </span>
            )}
            {data.blog && (
              <a
                href={data.blog.startsWith('http') ? data.blog : `https://${data.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-400 hover:text-blue-300"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Website
              </a>
            )}
          </div>

          <a
            href={data.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
}
