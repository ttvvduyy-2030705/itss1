import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/styles.css';

function Home() {
    const [cafes, setCafes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
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
                setCafes(data);
                setSearchResults(data);  // Lưu dữ liệu quán cafe vào searchResults
            } catch (error) {
                console.error('Failed to fetch cafes:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCafes();
    }, []);

    // Hàm tìm kiếm
    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            const filteredCafes = cafes.filter(cafe =>
                cafe.categories.some(category =>
                    category.toLowerCase().includes(searchQuery.toLowerCase())
                ) || cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) || cafe.address.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filteredCafes);
        } else {
            setSearchResults(cafes); // Nếu không có từ khóa tìm kiếm, hiển thị tất cả
        }
    };

    // Hàm để xử lý sự kiện khi nhấn phím Enter trong ô tìm kiếm
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    // Hàm để điều hướng đến trang chi tiết quán cafe
    const handleCardClick = (cafeId) => {
        navigate(`/cafe-detail/${cafeId}`);
    };

    // Hàm xử lý việc lưu lại quán cafe vào danh sách yêu thích
    const handleBookmark = (cafe) => {
        let savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedCafes')) || [];
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
                            <button className="btn primary" onClick={() => navigate('/search')}>今すぐ探す</button>
                            <button className="btn secondary" onClick={() => navigate('/details')}>さらに詳しく</button>
                            <button className="btn bookmark" onClick={() => navigate('/bookmark')}>ブックマーク</button>
                        </div>
                    </div>
                    <img src="/assets/img-hero.png" alt="Hero Image" className="hero-image" />
                </div>
            </header>

            <section className="cards-section">
                <div className="cards-bg"></div>
                <h2>最近ご覧になった</h2>
                <div className="cards" id="cards-container">
                    {searchResults.length > 0 ? (
                        searchResults.map((cafe) => (
                            <div className="card" key={cafe.id} onClick={() => handleCardClick(cafe.id)}>
                                <img src={cafe.image || '/assets/card-dummy.png'} alt="Card Image" />
                                <div className="card-content">
                                    <div className="card-header">
                                        <span className="rating">{cafe.rating} <img src="/assets/star.svg" alt="Star" className="star-icon" /></span>
                                        <span className="distance">{cafe.distance}km</span>
                                    </div>
                                    <h3>{cafe.name}</h3>
                                    <p>{cafe.address}</p> {/* Hiển thị địa chỉ quán cafe */}
                                    <div className="tags">
                                        {cafe.categories?.map((category) => (
                                            <span className="tag" key={category}>{category}</span>
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
