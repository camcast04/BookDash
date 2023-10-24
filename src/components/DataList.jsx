import { Link } from 'react-router-dom';

function DataList({ books }) {
  return (
    <div>
      {books.map((book) => (
        <div key={book.key} className="book-item">
          {/* Display book cover if available */}
          {book.cover_i && (
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={`Cover of ${book.title}`}
              className="book-cover"
            />
          )}

          {/* Display book title as a link */}
          <h3 className="book-title">
            <Link to={`/book/${book.key.split('/').pop()}`}>{book.title}</Link>
          </h3>

          {/* Display authors */}
          <p className="book-authors">
            {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
          </p>

          {/* Display published year if available */}
          {book.first_publish_year && (
            <p className="book-year">Published in: {book.first_publish_year}</p>
          )}

          {/* Add other details as needed */}
        </div>
      ))}
    </div>
  );
}

export default DataList;
