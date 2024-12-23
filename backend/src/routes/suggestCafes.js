require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://deyagjaikvtbtdlkrnib.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRleWFnamFpa3Z0YnRkbGtybmliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzOTIzMzYsImV4cCI6MjA0Nzk2ODMzNn0.L-Hvovg9G7dbOJHSDNqUW7-g3cjedLFqR6xylhMZVgo');

async function fetchCafes() {
  const { data: cafes, error } = await supabase
    .from('cafes')
    .select('*');
  if (error) throw new Error(error.message);
  return cafes;
}

function calculateSimilarity(tags1, tags2) {
  const commonTags = tags1.filter(tag => tags2.includes(tag));
  return commonTags.length;
}

function suggestCafes(userSaved, searchHistory, cafes) {
  if (userSaved && userSaved.length > 0) {
    const savedTags = userSaved.flatMap(cafe => cafe.tags);
    return cafes
      .filter(cafe => !userSaved.some(saved => saved.id === cafe.id)) // Loại bỏ quán đã lưu
      .map(cafe => ({
        ...cafe,
        similarity: calculateSimilarity(savedTags, cafe.tags),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5);
  } else if (searchHistory && searchHistory.length > 0) {
    const searchTags = searchHistory.flatMap(search => search.tags);
    return cafes
      .map(cafe => ({
        ...cafe,
        similarity: calculateSimilarity(searchTags, cafe.tags),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5);
  } else {
    return cafes.sort(() => Math.random() - 0.5).slice(0, 5);
  }
}

// Hàm chính
async function main() {
  try {
    const cafes = await fetchCafes();
    const userSaved = [
      { id: 1, name: "Cafe A", tags: ["romantic", "quiet"], location: "Downtown" },
    ];
    const searchHistory = [
      { query: "quiet cafe", tags: ["quiet", "cozy"] },
      { query: "study spots", tags: ["study", "modern"] },
    ];
    const suggestions = suggestCafes(userSaved, searchHistory, cafes);
    console.log("Gợi ý quán cà phê:", suggestions);
  } catch (err) {
    console.error("Lỗi:", err.message);
  }
}

main();
