import React, { useState, useEffect } from 'react';
import './assets/bookmarkListStyles.css'; // CSS cho giao diện đẹp

function BookmarkList() {
    const [bookmarkedCafes, setBookmarkedCafes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lấy danh sách bookmark từ localStorage và loại bỏ trùng lặp
    useEffect(() => {
        const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedCafes')) || [];
        const uniqueBookmarks = savedBookmarks.filter(
            (cafe, index, self) => index === self.findIndex((c) => c.id === cafe.id)
        );
        setBookmarkedCafes(uniqueBookmarks);
        setLoading(false);
    }, []);    

    // Xóa một quán khỏi danh sách bookmark
    const handleRemoveBookmark = (cafeId) => {
        const updatedBookmarks = bookmarkedCafes.filter(cafe => cafe.id !== cafeId);
        setBookmarkedCafes(updatedBookmarks);
        localStorage.setItem('bookmarkedCafes', JSON.stringify(updatedBookmarks));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="bookmark-container">
            <header className="bookmark-header">
                <h1>ブックマークしたカフェのリスト。</h1>
            </header>
            <div className="bookmark-content">
                {bookmarkedCafes.length === 0 ? (
                    <p>あなたはまだカフェをブックマークしていません。</p>
                ) : (
                    <div className="bookmark-grid">
                        {bookmarkedCafes.map((cafe) => (
                            <div className="bookmark-card" key={cafe.id}>
                                <img
                                    src={cafe.image || '/assets/card-dummy.png'}
                                    alt={cafe.name}
                                    className="bookmark-image"
                                />
                                <div className="bookmark-info">
                                <h3>{cafe.name}</h3>
                                    <p>住所: {cafe.address || '情報がありません'}</p>
                                    <p>距離: {cafe.distance} km</p>
                         <div className="categories">
                         <p>カテゴリー:</p>
    <div className="tags">
        {cafe.categories?.map((category, index) => (
            <span className="tag" key={index}>
                {category}
            </span>
        ))}
    </div>
</div>

                                    <button
                                        className="remove-bookmark-btn"
                                        onClick={() => handleRemoveBookmark(cafe.id)}
                                    >
                                        削除
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookmarkList;
