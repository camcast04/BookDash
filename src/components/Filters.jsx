function Filters({ setSelectedGenre }) {
  return (
    <div>
      <select onChange={(e) => setSelectedGenre(e.target.value)}>
        <option value="all">All Genres</option>
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-Fiction</option>
        {/* ... add other genres as needed */}
      </select>
    </div>
  );
}

export default Filters;
