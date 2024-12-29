import React, { useEffect, useState, useRef, useCallback } from "react";
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
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Fetch cafe details
  const fetchCafeDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/cafes/${id}`);
      const data = await response.json();
      setCafeDetails(data);

      if (data.address) {
        geocodeAddress(data.address);
      } else {
        console.warn("Cafe address is missing.");
        initializeMap(DEFAULT_COORDINATES);
      }

      // Check if the cafe is bookmarked
      const bookmarks = JSON.parse(localStorage.getItem("bookmarkedCafes")) || [];
      setIsBookmarked(bookmarks.some((bookmark) => bookmark.id === data.id));
    } catch (error) {
      console.error("Error fetching cafe details:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCafeDetails();
  }, [fetchCafeDetails]);

  // Geocode address
  const geocodeAddress = useCallback(async (address) => {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const coordinates = data.features[0].center;
        initializeMap(coordinates);
      } else {
        console.warn("No results from geocoding. Falling back to Tokyo.");
        initializeMap(DEFAULT_COORDINATES);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      initializeMap(DEFAULT_COORDINATES);
    }
  }, []);

  // Initialize map
  const initializeMap = useCallback((coordinates) => {
    if (!mapContainerRef.current) return;
    mapboxgl.accessToken = MAPBOX_TOKEN;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center: coordinates,
        zoom: 14,
      });
      return;
    }

    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: coordinates,
      zoom: 14,
    });

    new mapboxgl.Marker().setLngLat(coordinates).addTo(mapInstanceRef.current);

    mapInstanceRef.current.on("load", () => {
      mapInstanceRef.current.resize();
    });
  }, []);

  // Handle bookmark
  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarkedCafes")) || [];
    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== cafeDetails.id);
      localStorage.setItem("bookmarkedCafes", JSON.stringify(updatedBookmarks));
    } else {
      const newBookmark = {
        id: cafeDetails.id,
        name: cafeDetails.name,
        address: cafeDetails.address,
        image: cafeDetails.image || "/assets/card-dummy.png",
        categories: cafeDetails.categories,
      };
      bookmarks.push(newBookmark);
      localStorage.setItem("bookmarkedCafes", JSON.stringify(bookmarks));
    }
    setIsBookmarked(!isBookmarked);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cafeDetails) {
    return <div>No cafe details available.</div>;
  }

  // Default to 4 images if not enough images are provided
  const cafeImages = cafeDetails.images?.length >= 4 ? cafeDetails.images.slice(0, 4) : new Array(4).fill(cafeDetails.image || "/assets/card-dummy.png");

  return (
    <div>
      {/* Navbar */}
      <header className="hero-section">
        <div className="navbar">
          <img
            src="/assets/logo.png"
            alt="Cafe Compass Logo"
            className="logo"
            onClick={() => navigate("/")}
          />
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
      <div className="detail-container" style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {/* Left Side - Cafe Photo */}
        <div className="detail-left" style={{ flex: "1", marginBottom: "20px" }}>
          <img
            src={cafeDetails.image || "/assets/card-dummy.png"}
            alt="Cafe Photo"
            className="cafe-photo"
            style={{
              width: "100%", 
              height: "400px", 
              objectFit: "cover", 
              marginBottom: "20px"
            }}
          />

          {/* 4 Images Gallery */}
          <div className="image-gallery" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {cafeImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Cafe Image ${index + 1}`}
                style={{
                  width: "100%", 
                  height: "auto", 
                  objectFit: "cover", 
                  maxHeight: "150px",
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Cafe Info */}
        <div className="detail-right" style={{ flex: "1" }}>
          <h1>{cafeDetails.name}</h1>

          {/* Cafe Details */}
          <div className="categories" style={{ marginBottom: "20px" }}>
            <h3>Categories:</h3>
            <ul>
              {cafeDetails.categories && cafeDetails.categories.length > 0 ? (
                cafeDetails.categories.map((category, index) => (
                  <li key={index}>{category}</li>
                ))
              ) : (
                <li>No categories available</li>
              )}
            </ul>
          </div>
          <div className="actions">
            <button className="btn" onClick={handleBookmark}>
              {isBookmarked ? "📍 アンブックマーク" : "📌 ブックマーク"}
            </button>
            <button className="btn">⚠️ レポート</button>
            <button className="btn">🔗 シェア</button>
          </div>

          <div className="info" style={{ marginTop: "20px" }}>
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

          {/* Mapbox Map */}
          <div
            ref={mapContainerRef}
            style={{ height: "400px", width: "100%", marginTop: "20px" }}
            id="map-container"
          />
        </div>
      </div>
    </div>
  );
};

export default CafeDetail;
