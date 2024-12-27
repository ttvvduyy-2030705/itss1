import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/styles.css';


const FIXED_COORDINATES = [105.845438, 21.005187]; // [longitude, latitude]
const MAPBOX_TOKEN = "pk.eyJ1IjoibWluaHNpZXU5MTAyMDAzIiwiYSI6ImNsdmNlZ2tzejBobm4ya3BmYWM4YXZwNDEifQ.R5AhdNQCqft1gzh1dAVBmA";


function Home() {
    const [cafes, setCafes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
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
                        const distance = calculateDistance(FIXED_COORDINATES, coordinates);
                        return { ...cafe, distance: distance.toFixed(2) };
                    })
                );
                setCafes(cafesWithDistance);
                setSearchResults(cafesWithDistance);
            } catch (error) {
                console.error('Failed to fetch cafes:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCafes();
    }, []);

    const geocodeAddress = async (address) => {
        const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}`;
        try {
            const response = await fetch(geocodeUrl);
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                return data.features[0].center; // [lng, lat]
            }
            console.warn(`No results for address: ${address}`);
            return FIXED_COORDINATES; // Default to fixed location
        } catch (error) {
            console.error("Geocoding error:", error);
            return FIXED_COORDINATES; // Fallback on error
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
    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            const filteredCafes = cafes.filter(cafe =>
                cafe.categories.some(category =>
                    category.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setSearchResults(filteredCafes);
        } else {
            setSearchResults(cafes);
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
                <div className="filters">


                    {/* 🔹 Sort Dropdown */}
                    <select value={sortOrder} onChange={(e) => handleSortChange(e.target.value)} className="dropdown">
                        <option value="asc">距離 (昇順)</option>
                        <option value="desc">距離 (降順)</option>
                    </select>
                </div>
                <div className="cards-bg"></div>

                <h2>最近ご覧になった</h2>
                <div className="cards" id="cards-container">
                    {searchResults.length > 0 ? (
                        searchResults.map((cafe) => (
                            <div className="card" key={cafe.id} onClick={() => handleCardClick(cafe.id)}>
                                <img src={cafe.image || '/assets/card-dummy.png'} alt="Card Image" />
                                <div className="card-content">
                                    <div className="card-header">
                                        <span className="rating">
                                            {cafe.rating}{' '}
                                            <img
                                                src="/assets/star.svg"
                                                alt="Star"
                                                className="star-icon"
                                            />
                                        </span>
                                        <span className="distance">{cafe.distance}km</span>
                                    </div>
                                    <h3>{cafe.name}</h3>
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