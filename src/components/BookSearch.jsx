import { useState } from "react";

const BookSearch = ({ onBookSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchBooks = async () => {
    if (!query) return;

    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    setResults(data.items || []);
  };

  const handleAdd = (book) => {
    const info = book.volumeInfo;
    const bookData = {
      id: book.id,
      title: info.title || "Unknown Title",
      author: (info.authors && info.authors[0]) || "Unknown Author",
      status: "unread",
      thumbnail: info.imageLinks?.thumbnail || null,
      progress: 0,
    };
    onBookSelect(bookData);
    setResults([]);
    setQuery("");
  };

  return (
    <div className="book-search">
<div
  style={{
    display: "flex",
    gap: "0.75rem",
    marginBottom: "1.5rem",
    justifyContent: "center",
    flexWrap: "wrap",
  }}
>
        <input
          type="text"
          value={query}
          placeholder="Search Google Books..."
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button
          className="search-button"
          onClick={searchBooks}
          disabled={!query.trim()}
          style={{ whiteSpace: "nowrap" }}
        >
          Search
        </button>
      </div>

      <div className="search-results">
        {results.map((book) => {
          const info = book.volumeInfo;
          return (
            <div key={book.id} className="search-results-card">
              {info.imageLinks?.thumbnail && (
                <img src={info.imageLinks.thumbnail} alt="cover" />
              )}
              <div>
                <strong>{info.title}</strong>
                <p style={{ margin: "4px 0", color: "#666" }}>
                  {info.authors?.join(", ")}
                </p>
                <button onClick={() => handleAdd(book)}>Add to Library</button>
              </div>
            </div>
          );
        })}
      </div>

      {results.length === 0 && query && (
        <p style={{ marginTop: "1rem", color: "#999" }}>
          No results found. Try another book title or author.
        </p>
      )}
    </div>
  );
};

export default BookSearch;
