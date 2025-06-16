import { useEffect, useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import BookSearch from "./components/BookSearch";

function App() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("my-books");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showManualForm, setShowManualForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("my-books", JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    setBooks([book, ...books]);
  };

  const updateProgress = (id, newProgress, newStatus) => {
    const updated = books.map(book =>
      book.id === id ? { ...book, progress: newProgress, status: newStatus } : book
    );
    setBooks(updated);
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filter === "All" || book.status === filter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="app-container">
      <header>
        <h1>📚 my library tracker</h1>
      </header>

      <section>
        <BookSearch onBookSelect={addBook} />

        <div className="manual-entry-toggle">
          <button onClick={() => setShowManualForm(!showManualForm)}>
            {showManualForm ? "Hide Manual Entry" : "can't find your book? add manually"}
          </button>
          {showManualForm && <BookForm addBook={addBook} />}
        </div>

        <form>
          <label htmlFor="filter">Filter by Status:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="unread">Unread</option>
            <option value="reading">Reading</option>
            <option value="read">Read</option>
          </select>

          <input
            type="text"
            className="search-input"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </section>

      <main>
        <BookList
          books={filteredBooks}
          deleteBook={deleteBook}
          updateProgress={updateProgress}
        />
      </main>

      <footer>
        <p>
          Made with ❤️ by <a href="#">You</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
