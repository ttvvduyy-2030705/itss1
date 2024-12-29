import React, { useState, useEffect } from "react";

const BookmarkButton = ({ cafeDetails, updateCafesList }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const cafes = JSON.parse(localStorage.getItem("bookmarkedCafes")) || [];
    const isBookmarkedCafe = cafes.some(cafe => cafe.id === cafeDetails.id);
    setIsBookmarked(isBookmarkedCafe);
  }, [cafeDetails.id]); // Theo dõi sự thay đổi của cafeDetails.id

  const toggleBookmark = () => {
    const cafes = JSON.parse(localStorage.getItem("bookmarkedCafes")) || [];
    let updatedCafes;

    if (isBookmarked) {
      // Nếu đã bookmark, thực hiện unbookmark
      updatedCafes = cafes.filter(cafe => cafe.id !== cafeDetails.id);
      setIsBookmarked(false);
      // Cập nhật lại danh sách các quán cà phê trong localStorage
      localStorage.setItem("bookmarkedCafes", JSON.stringify(updatedCafes));
      // Gọi hàm để cập nhật lại danh sách quán cà phê trên UI
      updateCafesList(updatedCafes);
    } else {
      // Nếu chưa bookmark, thực hiện bookmark
      updatedCafes = [...cafes, cafeDetails];
      setIsBookmarked(true);
      // Cập nhật lại danh sách các quán cà phê trong localStorage, đảm bảo lưu đầy đủ thông tin, bao gồm categories
      localStorage.setItem("bookmarkedCafes", JSON.stringify(updatedCafes));
      // Gọi hàm để cập nhật lại danh sách quán cà phê trên UI
      updateCafesList(updatedCafes);
    }
  };

  return (
    <button onClick={toggleBookmark} className={`bookmark-btn ${isBookmarked ? "bookmarked" : ""}`}>
      {isBookmarked ? "📍 アンブックマーク" : "📌 ブックマーク"}
    </button>
  );
};

export default BookmarkButton;
