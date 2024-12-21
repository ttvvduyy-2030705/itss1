import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './assets/styles.css';

const CafeDetail = () => {
  const { id } = useParams();
  const [cafeDetails, setCafeDetails] = useState(null);

  useEffect(() => {
    // Fetch the cafe details from the API
    const fetchCafeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/cafes/${id}`);
        const data = await response.json();
        setCafeDetails(data); 
      } catch (error) {
        console.error("Error fetching cafe details:", error);
      }
    };

    fetchCafeDetails();
  }, [id]);

  if (!cafeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Navbar */}
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
              </span>
            </div>
            <img src="/assets/avt1.png" alt="User Avatar" className="avatar" />
          </div>
        </div>
      </header>

      {/* Detail Content */}
      <div className="detail-container">
        {/* Left Side */}
        <div className="detail-left">
          <img src="/assets/card-dummy.png" alt="Cafe Photo" className="cafe-photo" />
          <div className="review-stats">
            <h3>レビュー</h3>
            <div className="review-bar">
              <span>⭐ 5</span>
              <div className="bar" style={{ width: "80%" }}></div>
            </div>
            <div className="review-bar">
              <span>⭐ 4</span>
              <div className="bar" style={{ width: "60%" }}></div>
            </div>
            <div className="review-bar">
              <span>⭐ 3</span>
              <div className="bar" style={{ width: "30%" }}></div>
            </div>
            <div className="review-bar">
              <span>⭐ 2</span>
              <div className="bar" style={{ width: "10%" }}></div>
            </div>
            <div className="review-bar">
              <span>⭐ 1</span>
              <div className="bar" style={{ width: "5%" }}></div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="detail-right">
          <h1>{cafeDetails.name}</h1>
          <p className="description">
            ここは素晴らしいカフェで、美味しいコーヒーと素敵な雰囲気を楽しむことができます。
          </p>
          <div className="actions">
            <button className="btn">📌 ブックマーク</button>
            <button className="btn">⚠️ レポート</button>
            <button className="btn">🔗 シェア</button>
          </div>
          <div className="info">
            <p>
              <img src="/assets/location.svg" alt="Location" /> {cafeDetails.address}
            </p>
            <p>
              <img src="/assets/clock.svg" alt="Clock" /> 営業時間: {cafeDetails.opening_hours}
            </p>
            <p>
              <img src="/assets/phone.svg" alt="Phone" /> 電話番号: {cafeDetails.phone || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Below Section */}
      <div className="other-media">
        <h3>その他の写真・動画</h3>
        <div className="media-grid">
          <img src="/assets/card-dummy.png" alt="Photo 1" />
          <img src="/assets/card-dummy.png" alt="Photo 2" />
          <img src="/assets/card-dummy.png" alt="Photo 3" />
          <img src="/assets/card-dummy.png" alt="Photo 4" />
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h2>の貢献に感謝する。</h2>
          <p>ミン、ズオン、クエット</p>
        </div>
      </footer>
    </div>
  );
};

export default CafeDetail;
