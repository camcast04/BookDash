import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://openlibrary.org/search.json?q=${searchTerm}`;
        console.log('Fetching URL:', url);
        const response = await fetch(url);
        const data = await response.json();
        setBooks(data.docs);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };

    if (searchTerm.trim()) {
      fetchData();
    }
  }, [searchTerm]);

  const filteredBooks = books.filter((book) => {
    let matchesSearchTerm = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    let matchesGenre = true;
    if (selectedGenre === 'fiction') {
      matchesGenre =
        book.title.toLowerCase().includes('fiction') &&
        !book.title.toLowerCase().includes('non-fiction');
    } else if (selectedGenre === 'non-fiction') {
      matchesGenre = book.title.toLowerCase().includes('non-fiction');
    }

    return matchesSearchTerm && matchesGenre;
  });

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <Router>
      <div className="container">
        <div className="sidebar">
          <h1>📚 Book Dash</h1>
          <Link to="/">Dashboard</Link>
          <SearchBar setSearchTerm={setSearchTerm} />
          <Filters setSelectedGenre={setSelectedGenre} />
        </div>
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <SummaryStats books={filteredBooks} />
                  <div>
                    Total Fiction Books:{' '}
                    {
                      filteredBooks.filter((book) =>
                        book.title.toLowerCase().includes('fiction')
                      ).length
                    }
                  </div>
                  <div>
                    Total Non-Fiction Books:{' '}
                    {
                      filteredBooks.filter(
                        (book) => !book.title.toLowerCase().includes('fiction')
                      ).length
                    }
                  </div>
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
