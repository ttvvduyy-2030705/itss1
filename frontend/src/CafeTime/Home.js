import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/styles.css';


// const FIXED_COORDINATES = [105.845438, 21.005187]; 
// [longitude, latitude]
const MAPBOX_TOKEN = "pk.eyJ1IjoibWluaHNpZXU5MTAyMDAzIiwiYSI6ImNsdmNlZ2tzejBobm4ya3BmYWM4YXZwNDEifQ.R5AhdNQCqft1gzh1dAVBmA";


function Home() {
    const [cafes, setCafes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [recommendedCafes, setRecommendedCafes] = useState([]);
    const [coordinates1, setCoordinates] = useState([105.845438, 21.005187]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCafes() {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3001/api/cafes');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                const cafesWithDistance = await Promise.all(
                    data.map(async (cafe) => {
                        const coordinates = await geocodeAddress(cafe.address);
                        const distance = calculateDistance(coordinates1, coordinates);
                        return { ...cafe, distance: distance.toFixed(2) };
                    })
                );

                setCafes(cafesWithDistance);
                setSearchResults(cafesWithDistance);

                generateRecommendations(cafesWithDistance);

                const tags = new Set(cafesWithDistance.flatMap(cafe => cafe.categories));
                setAvailableTags([...tags]);
            } catch (error) {
                console.error('Failed to fetch cafes:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCafes();
    }, [coordinates1]);
    useEffect(() => {
        console.log('Bookmarked cafes updated');
        generateRecommendations(cafes);
    }, [cafes]);

    const geocodeAddress = async (address) => {
        const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}`;
        try {
            const response = await fetch(geocodeUrl);
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                return data.features[0].center; // [lng, lat]
            }
            console.warn(`No results for address: ${address}`);
            return coordinates1; // Default to fixed location
        } catch (error) {
            console.error("Geocoding error:", error);
            return coordinates1; // Fallback on error
        }
    };

    // Haversine formula to calculate distance
    const calculateDistance = ([lon1, lat1], [lon2, lat2]) => {
        const toRad = (deg) => deg * (Math.PI / 180);
        const R = 6371; // Radius of Earth in km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const generateRecommendations = (allCafes) => {
        const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedCafes')) || [];
        console.log('Saved bookmarks:', savedBookmarks);
        if (savedBookmarks.length === 0) {
            setRecommendedCafes([]);
            return;
        }
        const bookmarkedTags = savedBookmarks.flatMap(cafe => cafe.categories || []);
        console.log('Bookmarked tags:', bookmarkedTags);

        const recommended = allCafes
            .filter(cafe =>
                cafe.categories &&
                cafe.categories.some(category => bookmarkedTags.includes(category)) &&
                !savedBookmarks.some(bookmarkedCafe => bookmarkedCafe.id === cafe.id) &&
                parseFloat(cafe.distance) < 20
            )
            .slice(0, 15);

        console.log('Recommended cafes:', recommended);
        setRecommendedCafes(recommended);
    };
    const handleCoordinateChange = (e) => {
        const { name, value } = e.target;
        const updatedCoordinates = [...coordinates1];
        updatedCoordinates[name === 'longitude' ? 0 : 1] = parseFloat(value);
        setCoordinates(updatedCoordinates);
    };
    const handleFilterChange = (tag) => {
        const updatedTags = selectedTags.includes(tag)
            ? selectedTags.filter(t => t !== tag)
            : [...selectedTags, tag];
        setSelectedTags(updatedTags);
    };

    const applyFilters = () => {
        const filteredCafes = cafes.filter(cafe =>
            selectedTags.every(tag => cafe.categories.includes(tag))
        );
        setSearchResults(filteredCafes);
        setShowFilterModal(false);
    };

    const toggleModal = () => {
        setShowFilterModal(!showFilterModal);
    };

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        const sortedCafes = [...searchResults].sort((a, b) => {
            return order === 'asc' ? a.distance - b.distance : b.distance - a.distance;
        });
        setSearchResults(sortedCafes);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleCardClick = (cafeId) => {
        navigate(`/cafe-detail/${cafeId}`);
    };

    const handleBookmarkPage = () => {
        navigate('/bookmark'); // Điều hướng đến trang bookmark
    };
    const handleBookmark = (cafe) => {
        let savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedCafes')) || [];
        // Kiểm tra xem quán đã có trong danh sách bookmark chưa
        if (!savedBookmarks.some(bookmarkedCafe => bookmarkedCafe.id === cafe.id)) {
            savedBookmarks.push(cafe);
            localStorage.setItem('bookmarkedCafes', JSON.stringify(savedBookmarks));
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <header className="hero-section">
                <div className="navbar">
                    <img src="/assets/logo.png" alt="Cafe Compass Logo" className="logo" />
                    <nav>
                        <a href="#">私たちについて</a>
                        <a href="#">カフェ</a>
                        <a href="#">言語: 日本語</a>
                    </nav>
                    <div className="nav-right">
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="カフェを探す (カテゴリー)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button className="search-icon" onClick={handleSearch} aria-label="Search">
                                <svg
                                    width="21"
                                    height="21"
                                    viewBox="0 0 21 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M20 20L15.514 15.506L20 20ZM18 9.5C18 11.7543 17.1045 13.9163 15.5104 15.5104C13.9163 17.1045 11.7543 18 9.5 18C7.24566 18 5.08365 17.1045 3.48959 15.5104C1.89553 13.9163 1 11.7543 1 9.5C1 7.24566 1.89553 5.08365 3.48959 3.48959C5.08365 1.89553 7.24566 1 9.5 1C11.7543 1 13.9163 1.89553 15.5104 3.48959C17.1045 5.08365 18 7.24566 18 9.5V9.5Z"
                                        stroke="#1D1D1D"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </div>
                        <img
                            src="/assets/avt1.png"
                            alt="User Avatar"
                            className="avatar"
                            onClick={() => navigate('/login')}
                        />
                    </div>
                </div>
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>コーヒーを楽しむ場所を知っている</h1>
                        <p>自分にぴったりのカフェが見つからない？ カフェコンパスがお手伝い。</p>
                        <div className="hero-buttons">
                            <button className="btn primary" onClick={() => navigate('/search')}>
                                今すぐ探す
                            </button>
                            <button className="btn secondary" onClick={() => navigate('/details')}>
                                さらに詳しく
                            </button>
                            <button className="btn bookmark" onClick={handleBookmarkPage}>
                                ブックマーク
                            </button>
                        </div>
                    </div>
                    <img src="/assets/img-hero.png" alt="Hero Image" className="hero-image" />
                </div>
            </header>

            <section className="cards-section">

            <div className="recommend-section">
    <h2>あなたのブックマークに似たカフェ</h2>
    <div className="cards">
        {recommendedCafes.length > 0 ? (
            recommendedCafes.map(cafe => (
                <div className="card" key={cafe.id} onClick={() => handleCardClick(cafe.id)}>
                    <img src={cafe.url_image || '/assets/card-dummy.png'} alt={cafe.name} />
                    <div className="card-content">
                        <h3>{cafe.name}</h3>
                        <p>{cafe.address}</p>
                        <div className="tags">
                            {cafe.categories?.map((category) => (
                                <span className="tag" key={category}>
                                    {category}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <p>おすすめのカフェがありません。</p>
        )}
    </div>
</div>
                <div className='things-1'>
                    <label>経度: </label>
                    <input
                        type="number"
                        name="longitude"
                        value={coordinates1[0]}
                        onChange={handleCoordinateChange}
                    />
                    <label>緯度: </label>
                    <input
                        type="number"
                        name="latitude"
                        value={coordinates1[1]}
                        onChange={handleCoordinateChange}
                    />
                </div>
                <div className="filters">
                    <button className='filter-button' onClick={toggleModal}>フィルター</button>

                    {/* 🔹 Sort Dropdown */}
                    <select value={sortOrder} onChange={(e) => handleSortChange(e.target.value)} className="dropdown">
                        <option value="asc">距離 (昇順)</option>
                        <option value="desc">距離 (降順)</option>
                    </select>
                </div>
                {showFilterModal && (
                    <div className="filter-modal">
                        <div className="modal-content">
                            <h3>タグでフィルタリング</h3>
                            {availableTags.map(tag => (
                                <div className="checkbox-wrapper" key={tag}>
                                    <input
                                        type="checkbox"
                                        checked={selectedTags.includes(tag)}
                                        onChange={() => handleFilterChange(tag)}
                                    />
                                    <label>{tag}</label>
                                </div>
                            ))}
                            <div className="modal-actions">
                                <button className="apply-button" onClick={applyFilters}>適用</button>
                                <button className="cancel-button" onClick={toggleModal}>キャンセル</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="cards-bg"></div>

                <h2>最近ご覧になった</h2>
                <div className="cards" id="cards-container">
                    {searchResults.length > 0 ? (
                        searchResults.map((cafe) => (
                            <div className="card" key={cafe.id} onClick={() => handleCardClick(cafe.id)}>
                                <img src={cafe.url_image || '/assets/card-dummy.png'} alt="Card Image" />
                                <div className="card-content">
                                    <div className="card-header">
                                        {/* Remove the star icon */}
                                        <span className="distance">{cafe.distance}km</span>
                                    </div>
                                    <h3>{cafe.name}</h3>
                                    {/* Add "住所" before the address */}
                                    <p className="cafe-address">住所: {cafe.address}</p>
                                    <div className="tags">
                                        {cafe.categories?.map((category) => (
                                            <span className="tag" key={category}>
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>一致するカフェが見つかりませんでした。</p>
                    )}
                </div>

            </section>
        </div>
    );
}

export default Home;
