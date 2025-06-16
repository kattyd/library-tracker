import { useState } from "react";

function BookForm({ addBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState("unread");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) return;

    const newBook = {
      id: Date.now(),
      title,
      author,
      tag,
      status,
    };

    addBook(newBook);

    // Clear form
    setTitle("");
    setAuthor("");
    setTag("");
    setStatus("unread");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Tag / Genre (e.g. Fantasy, Sci-Fi)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="unread">Unread</option>
        <option value="reading">Reading</option>
        <option value="read">Read</option>
      </select>

      <button type="submit">Add Book</button>
    </form>
  );
}

export default BookForm;
