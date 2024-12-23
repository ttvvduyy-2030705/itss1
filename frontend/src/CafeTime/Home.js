import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/styles.css';

function Home() {
    const [cafes, setCafes] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    async function fetchCafes() {
      try {
        const response = await fetch('http://localhost:3001/api/cafes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCafes(data);
      } catch (error) {
        console.error('Failed to fetch cafes:', error);
      }
    }
    fetchCafes();
  }, []);

  const handleCardClick = (cafeId) => {
    navigate(`/cafe-detail/${cafeId}`);
  };

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
              <input type="text" placeholder="カフェを探す" />
              <span className="search-icon">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 20L15.514 15.506L20 20ZM18 9.5C18 11.7543 17.1045 13.9163 15.5104 15.5104C13.9163 17.1045 11.7543 18 9.5 18C7.24566 18 5.08365 17.1045 3.48959 15.5104C1.89553 13.9163 1 11.7543 1 9.5C1 7.24566 1.89553 5.08365 3.48959 3.48959C5.08365 1.89553 7.24566 1 9.5 1C11.7543 1 13.9163 1.89553 15.5104 3.48959C17.1045 5.08365 18 7.24566 18 9.5V9.5Z"
                    stroke="#1D1D1D" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            <img src="/assets/avt1.png" alt="User Avatar" className="avatar" onClick={() => navigate('/login')} />
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>コーヒーを楽しむ場所を知っている</h1>
            <p>自分にぴったりのカフェが見つからない？ カフェコンパスがお手伝い。</p>
            <div className="hero-buttons">
              <button className="btn primary">今すぐ探す</button>
              <button className="btn secondary">さらに詳しく</button>
            </div>
          </div>
          <img src="/assets/img-hero.png" alt="Hero Image" className="hero-image" />
        </div>
      </header>
      <section className="cards-section">
        <div className="cards-bg"></div>
        <h2>最近ご覧になった</h2>
        <div className="cards" id="cards-container">
          {cafes.map(cafe => (
            <div className="card" key={cafe.id}onClick={() => handleCardClick(cafe.id)}>
              <img src="/assets/card-dummy.png" alt="Card Image" />
              <div className="card-content">
                <div className="card-header">
                  <span className="rating">{cafe.rating} <img src="/assets/star.svg" alt="Star" className="star-icon" /></span>
                  <span className="distance">{cafe.distance}km</span>
                </div>
                <h3>{cafe.name}</h3>
                <div className="tags">
                  <span className="tag">Hot</span>
                  <span className="tag">Cold</span>
                </div>
                <span className="card-search-icon">
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 20L15.514 15.506L20 20ZM18 9.5C18 11.7543 17.1045 13.9163 15.5104 15.5104C13.9163 17.1045 11.7543 18 9.5 18C7.24566 18 5.08365 17.1045 3.48959 15.5104C1.89553 13.9163 1 11.7543 1 9.5C1 7.24566 1.89553 5.08365 3.48959 3.48959C5.08365 1.89553 7.24566 1 9.5 1C11.7543 1 13.9163 1.89553 15.5104 3.48959C17.1045 5.08365 18 7.24566 18 9.5V9.5Z"
                      stroke="#1D1D1D" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;