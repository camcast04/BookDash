import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import SummaryStats from './components/SummaryStats';
import DataList from './components/DataList';
import BookDetail from './components/BookDetail';

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [error, setError] = useState(null);

  const [statistics, setStatistics] = useState({
    totalEditions: 0,
    earliestPublication: null,
    latestPublication: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://openlibrary.org/search.json?q=${searchTerm}&limit=100`;
        const response = await fetch(url);
        const data = await response.json();

        let totalEditions = 0;
        let earliestPub = Infinity;
        let latestPub = -Infinity;

        data.docs.forEach((book) => {
          totalEditions += book.edition_count;
          if (book.first_publish_year) {
            earliestPub = Math.min(earliestPub, book.first_publish_year);
            latestPub = Math.max(latestPub, book.first_publish_year);
          }
        });

        setStatistics({
          totalEditions,
          earliestPublication: earliestPub === Infinity ? null : earliestPub,
          latestPublication: latestPub === -Infinity ? null : latestPub,
        });

        setBooks(data.docs);
      } catch (error) {
        setError(error);
      }
    };

    if (searchTerm.trim()) {
      fetchData();
    }
  }, [searchTerm]);

  let filteredBooks = books;
  if (selectedGenre !== 'all') {
    filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(selectedGenre)
    );
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <Router>
      <div className="container">
        <div className="sidebar">
          <Header />
          <SearchBar setSearchTerm={setSearchTerm} />
          <Filters setSelectedGenre={setSelectedGenre} />
          {/* Add any other links or components you want in the sidebar here */}
        </div>
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SummaryStats books={filteredBooks} statistics={statistics} />
                  <DataList books={filteredBooks} />
                </>
              }
            />
            <Route path="/book/:key" element={<BookDetail books={books} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
