import React from 'react';
import { Link } from 'react-router-dom';

import './listBooks.css';

const ListBooks = ({ books }) => {
  const renderBooks = () => {
    return books.map((book, i) => (
      <div className="col-lg-4 book_card" key={i}>
        <img src={book.data.image} alt={book.data.title} />
        <h4>{book.data.title}</h4>
        <p>{book.data.description.substring(1, 120) + '...'} </p>
        <p>
          <Link className="btn btn-secondary" to={`/books/${book.id}`}>
            View Details
          </Link>
        </p>
      </div>
    ));
  };

  return (
    <div className="marketing">
      <div className="row">{renderBooks()}</div>
    </div>
  );
};

export default ListBooks;
