import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy từ khóa tìm kiếm từ URL
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    async function fetchSearchResults() {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/api/cafes?search=${query}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        setResults(data); // Lưu kết quả
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    }

    if (query) {
      fetchSearchResults();
    } else {
      setLoading(false); // Nếu không có từ khóa, không tải gì cả
    }
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Kết quả tìm kiếm cho: {query}</h1>
      <div className="cards">
        {results.length > 0 ? (
          results.map((cafe) => (
            <div className="card" key={cafe.id}>
              <h3>{cafe.name}</h3>
              <p>{cafe.types?.join(', ') || 'No categories'}</p>
            </div>
          ))
        ) : (
          <p>Không tìm thấy quán cafe nào phù hợp.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
