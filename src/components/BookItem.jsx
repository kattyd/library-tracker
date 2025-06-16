import { useEffect, useState } from "react";

function BookItem({ book, deleteBook, updateProgress }) {
  const [progress, setProgress] = useState(book.progress || 0);
  const [status, setStatus] = useState(book.status || "unread");

  useEffect(() => {
    let newStatus = "unread";
    if (progress === 100) {
      newStatus = "read";
    } else if (progress > 0) {
      newStatus = "reading";
    }
    setStatus(newStatus);
    updateProgress(book.id, progress, newStatus);
  }, [progress]);

  const handleProgressChange = (e) => {
    setProgress(parseInt(e.target.value));
  };

  return (
    <div className="book-item">
      {book.thumbnail && (
        <img src={book.thumbnail} alt="cover" className="book-thumbnail" />
      )}

      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-meta">{book.author}</p>
        <span className="book-status">{status}</span>

        <div style={{ marginTop: "1rem" }}>
          <label htmlFor={`progress-${book.id}`}>Progress: {progress}%</label>
          <input
            id={`progress-${book.id}`}
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
          />
        </div>

        <button onClick={() => deleteBook(book.id)} style={{ marginTop: "1rem" }}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default BookItem;
