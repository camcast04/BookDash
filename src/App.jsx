import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import SummaryStats from './components/SummaryStats';
import DataList from './components/DataList';

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${searchTerm}`
        );
        const data = await response.json();
        setBooks(data.docs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]);

  const filteredBooks = books.filter((book) => {
    const matchesSearchTerm = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    let matchesGenre = true; // default to true for 'all' genre
    if (selectedGenre === 'fiction') {
      matchesGenre =
        book.title.toLowerCase().includes('fiction') ||
        (book.author_name &&
          book.author_name.some((name) =>
            name.toLowerCase().includes('fiction')
          ));
    } else if (selectedGenre === 'non-fiction') {
      matchesGenre =
        !book.title.toLowerCase().includes('fiction') &&
        (!book.author_name ||
          !book.author_name.some((name) =>
            name.toLowerCase().includes('fiction')
          ));
    }

    return matchesSearchTerm && matchesGenre;
  });

  return (
    <div className="container">
      <div className="sidebar">
        <h1>📚 Book Dash</h1>
        <a href="#">Dashboard</a>
        <SearchBar setSearchTerm={setSearchTerm} />
        <Filters setSelectedGenre={setSelectedGenre} />
      </div>
      <div className="main-content">
        <Header />
        <SummaryStats books={filteredBooks} />
        <DataList books={filteredBooks} />
      </div>
    </div>
  );
}

export default App;
