import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchResult from './SearchResult';
import Home from './Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchResult />} />
            </Routes>
        </Router>
    );
}

export default App;
