import { useParams } from 'react-router-dom';

function BookDetail({ books }) {
  const { key } = useParams();

  console.log('URL Key:', key);
  console.log(
    'All Book Keys:',
    books.map((book) => book.key)
  );

  const book = books.find((b) => b.key === key);

  if (!book) {
    return <div>Book not found!</div>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <p>
        Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}
      </p>
      <img
        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
        alt={`Cover of ${book.title}`}
      />
      <p>First Published: {book.first_publish_year || 'N/A'}</p>
      {/* You can add more details as needed */}
    </div>
  );
}

export default BookDetail;
