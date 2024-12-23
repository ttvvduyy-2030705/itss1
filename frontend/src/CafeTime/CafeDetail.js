import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import './assets/styles.css';

const MAPBOX_TOKEN = "pk.eyJ1IjoibWluaHNpZXU5MTAyMDAzIiwiYSI6ImNsdmNlZ2tzejBobm4ya3BmYWM4YXZwNDEifQ.R5AhdNQCqft1gzh1dAVBmA";
const DEFAULT_COORDINATES = [139.6917, 35.6895];

const CafeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cafeDetails, setCafeDetails] = useState(null);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Fetch the cafe details from the API
    const fetchCafeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/cafes/${id}`);
        const data = await response.json();
        setCafeDetails(data);
        if (data.address) {
          geocodeAddress(data.address);
        } else {
          console.warn("Cafe address is missing.");
          initializeMap(DEFAULT_COORDINATES);  // Fallback if address is missing
        }
      } catch (error) {
        console.error("Error fetching cafe details:", error);
      }
    };

    fetchCafeDetails();
  }, [id]);

  const geocodeAddress = async (address) => {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const coordinates = data.features[0].center;
        initializeMap(coordinates);
      } else {
        console.warn("No results from geocoding. Falling back to Tokyo.");
        initializeMap(DEFAULT_COORDINATES);  // Fallback to Tokyo if no results
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      initializeMap(DEFAULT_COORDINATES);
    }
  };

  const initializeMap = (coordinates) => {
    if (!mapContainerRef.current) return;
    mapboxgl.accessToken = MAPBOX_TOKEN;

    // Prevent reinitialization if the map already exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center: coordinates,
        zoom: 14,
      });
      return;
    }

    // Initialize the map
    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: coordinates,
      zoom: 14,
    });

    // Place a marker at the cafe's location
    new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(mapInstanceRef.current);

    // Ensure the map resizes properly
    mapInstanceRef.current.on('load', () => {
      mapInstanceRef.current.resize();
    });
  };

  if (!cafeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <header className="hero-section">
        <div className="navbar">
          <img src="/assets/logo.png" alt="Cafe Compass Logo" className="logo" onClick={() => navigate('/')} />
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
          {/* Map Section */}
          <div
            ref={mapContainerRef}
            style={{ height: "400px", width: "100%", marginTop: "20px" }}
            id="map-container"
          />
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