import BookItem from './BookItem';

function BookList({ books, deleteBook, updateProgress }) {
  if (books.length === 0) return <p>no books yet. add one!</p>;

  return (
    <div className="book-list-grid">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          deleteBook={deleteBook}
          updateProgress={updateProgress}
        />
      ))}
    </div>
  );
}

export default BookList;
