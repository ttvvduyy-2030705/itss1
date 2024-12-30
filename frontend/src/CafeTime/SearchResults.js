import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './assets/styles.css';

function SearchResults() {
    const [cafes, setCafes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const searchQuery = searchParams.get('q') || '';

    useEffect(() => {
        async function fetchCafes() {
            setLoading(true);
            setError(null);  // Reset error state
            try {
                const response = await fetch('http://localhost:3001/api/cafes');
                if (!response.ok) {
                    throw new Error('ネットワークエラーが発生しました');
                }
                const data = await response.json();
                setCafes(data);
            } catch (error) {
                setError('カフェデータの取得に失敗しました。後で再試行してください。');
                console.error('カフェデータの取得に失敗しました:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCafes();
    }, []);

    // Lọc quán cà phê khi có thay đổi searchQuery
    const filteredCafes = useMemo(() => {
        return cafes.filter(
            (cafe) =>
                cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cafe.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [cafes, searchQuery]);

    const handleCardClick = (cafeId) => {
        navigate(`/cafe-detail/${cafeId}`);
    };

    if (loading) {
        return <div>読み込み中...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="search-results">
            <header>
                <h1>検索結果</h1>
            </header>
            {filteredCafes.length > 0 ? (
                <div className="cards">
                    {filteredCafes.map((cafe) => (
                        <div className="card" key={cafe.id} onClick={() => handleCardClick(cafe.id)}>
                            <img
                                src={cafe.url_image || '/assets/card-dummy.png'} // Thêm url_image vào đây
                                alt="カフェの画像"
                            />
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
