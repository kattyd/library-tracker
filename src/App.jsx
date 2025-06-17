import { useEffect, useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import BookSearch from "./components/BookSearch";
import Stats from "./components/Stats";

function App() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("my-books");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode ] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showManualForm, setShowManualForm] = useState(false);
  const [readingGoal, setReadingGoal] = useState(10);

  const booksRead = books.filter(book => book.status === "read").length;
  const readingProgress = Math.min((booksRead / readingGoal) * 100, 100).toFixed(0);
  const totalBooks = books.length;
  const currentlyReading = books.filter(book => book.status === "reading").length;
  const unreadBooks = books.filter(book => book.status === "unread").lenght;

  useEffect(() => {
    localStorage.setItem("my-books", JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    setBooks([book, ...books]);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

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

  const handleExport = () => {
    const dataStr = JSON.stringify(books, null, 2);
    const blob = new Blob([dataStr], { type: "application.json"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "my-library.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      <header>
        <h1>📚 my library tracker</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞 light mode" : "🌙 dark mode"}
        </button>
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
      <Stats 
        total={totalBooks}
        read={booksRead}
        reading={currentlyReading}
        unread={unreadBooks}
        goal={readingGoal}
        progress={readingProgress}
        onGoalChange={setReadingGoal}
      />
      <main>
        <BookList
          books={filteredBooks}
          deleteBook={deleteBook}
          updateProgress={updateProgress}
        />
      </main>

      <footer>
        <p>
          Made with ❤️ by <a href="instagram.com/kaaahtea">kaaahtea</a>
        </p>
      </footer>
      <button onClick={handleExport}>📁 export library</button>
    </div>
  );
}

export default App;
