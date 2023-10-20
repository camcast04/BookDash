function SearchBar({ setSearchTerm }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for a book or author..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
