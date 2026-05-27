import { useState } from "react";

export default function SearchBar({ initialValue = "", navigate, compact = false }) {
  const [query, setQuery] = useState(initialValue);

  function submitSearch(event) {
    event.preventDefault();
    const searchValue = query.trim();
    navigate(`/search${searchValue ? `?q=${encodeURIComponent(searchValue)}` : ""}`);
  }

  return (
    <form
      className={`search-box ${compact ? "search-box-compact" : ""}`}
      role="search"
      onSubmit={submitSearch}
    >
      <span className="text-lg" aria-hidden="true">
        🔎
      </span>
      <label htmlFor={compact ? "header-search" : "hero-search"} className="sr-only">
        ค้นหาไกด์
      </label>
      <input
        id={compact ? "header-search" : "hero-search"}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="ค้นหาไกด์, NPC, เดือน หรือ DLC..."
      />
      <button className="button-primary shrink-0" type="submit">
        ค้นหา
      </button>
    </form>
  );
}
