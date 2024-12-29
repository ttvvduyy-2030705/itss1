import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './assets/styles.css';

function SearchResults() {
    const [cafes, setCafes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const searchQuery = searchParams.get('q') || ''; // 検索クエリを取得

    useEffect(() => {
        async function fetchCafes() {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3001/api/cafes');
                if (!response.ok) {
                    throw new Error('ネットワークエラーが発生しました');
                }
                const data = await response.json();

                // 検索クエリに一致するカフェをフィルタリング
                const filteredCafes = data.filter(
                    (cafe) =>
                        cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        cafe.address.toLowerCase().includes(searchQuery.toLowerCase())
                );

                setCafes(filteredCafes);
                setSearchResults(filteredCafes);
            } catch (error) {
                console.error('カフェデータの取得に失敗しました:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCafes();
    }, [searchQuery]);

    const handleCardClick = (cafeId) => {
        navigate(`/cafe-detail/${cafeId}`);
    };

    if (loading) {
        return <div>読み込み中...</div>;
    }

    return (
        <div className="search-results">
            <header>
                <h1>検索結果</h1>
            </header>
            {searchResults.length > 0 ? (
                <div className="cards">
                    {searchResults.map((cafe) => (
                        <div className="card" key={cafe.id} onClick={() => handleCardClick(cafe.id)}>
                            <img src={cafe.image || '/assets/card-dummy.png'} alt="カフェの画像" />
                            <div className="card-content">
                                <h3>{cafe.name}</h3>
                                <p className="cafe-address">{cafe.address}</p>
                                <div className="tags">
                                    {cafe.categories?.map((category) => (
                                        <span className="tag" key={category}>
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>該当するカフェは見つかりませんでした。</p>
            )}
        </div>
    );
}

export default SearchResults;
