import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bookmark from './Bookmark';
import Home from './Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bookmark" element={<Bookmark />} />
            </Routes>
        </Router>
    );
}

export default App;
