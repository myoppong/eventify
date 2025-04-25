import { useState } from 'react';

const SearchBar = ({ events, onFilter }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(value) ||
      event.location.toLowerCase().includes(value) ||
      event.category.toLowerCase().includes(value)
    );
    onFilter(filtered);
  };

  return (
    <input
      type="text"
      placeholder="Search events..."
      value={query}
      onChange={handleSearch}
      className="p-2 border rounded-md w-full"
    />
  );
};

export default SearchBar;
