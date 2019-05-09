import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebase, firebaseBooks } from '../../firebase';
import { firebaseLooper } from '../../config/helpers';
import Spinner from '../widgets/Spinner/spinner';

class AllBooks extends Component {
  state = {
    books: [],
    loading: true,
  };

  componentDidMount() {
    firebaseBooks.once('value').then(data => {
      const books = firebaseLooper(data);

      books.forEach((book, i) => {
        firebase
          .storage()
          .ref('images')
          .child(book.data.image)
          .getDownloadURL()
          .then(url => {
            books[i].data.image = url;
            this.setState({ books, loading: false });
          });
      });
    });
  }

  handleAllBooks = () => {
    const books = this.state.books;
    return books.map((item, i) => (
      <div className="col-md-4" key={i}>
        <Link to={`/books/${item.id}`} style={{ textDecoration: 'none' }}>
          <div className="card mb-4 text-white bg-dark">
            <img
              className="card-img-top"
              style={{ height: '200px' }}
              src={item.data.image}
              alt={item.data.title}
            />
            <div className="card-body">
              <h5 className="card-title">{item.data.title}</h5>
              <p className="card-text">{item.data.description.substring(1, 180)}</p>
            </div>
          </div>
        </Link>
      </div>
    ));
  };

  render() {
    let allBooks = this.state.loading ? <Spinner /> : this.handleAllBooks();
    return (
      <div className="container" style={{ marginTop: '100px' }}>
        <h1>All Books</h1>
        <div className="row">{allBooks}</div>
      </div>
    );
  }
}
export default AllBooks;
