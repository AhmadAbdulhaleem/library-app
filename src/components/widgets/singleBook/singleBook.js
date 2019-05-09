import React, { Component } from 'react';
import { firebase, firebaseBooks } from '../../../firebase';
import { firebaseLooper } from '../../../config/helpers';
import Spinner from '../Spinner/spinner';

class SingleBook extends Component {
  state = {
    book: [],
    image: '',
    loading: true,
  };

  componentDidMount() {
    this.handleSingleBook();
  }

  handleSingleBook = () => {
    const bookId = this.props.match.params.id;
    firebaseBooks.once('value').then(item => {
      const books = firebaseLooper(item);
      const book = books.find(b => b.id === bookId);
      firebase
        .storage()
        .ref('images')
        .child(book.data.image)
        .getDownloadURL()
        .then(img => {
          this.setState({ image: img });
        });

      this.setState({ book, loading: false });
    });
  };

  render() {
    const { book, loading } = this.state;

    let data = loading ? (
      <Spinner />
    ) : (
      <div className="row featurette">
        <div className="col-md-7">
          <h2 className="featurette-heading">{book.data.title}</h2>
          <p className="lead">{book.data.description}</p>
        </div>
        <div className="col-md-5">
          <img
            className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
            width="500"
            height="500"
            src={this.state.image}
            alt={book.data.title}
          />
        </div>
        <div style={{ padding: '10px' }}>
          <p>
            Page Count:{' '}
            <strong style={{ background: '#d2d2d2', color: '#4c4c4c', padding: '10px' }}>
              {book.data.pageCount}
            </strong>
          </p>
          <br />
          <p>
            Published Date:{' '}
            <strong style={{ background: '#d2d2d2', color: '#4c4c4c', padding: '10px' }}>
              {book.data.date}
            </strong>
          </p>
        </div>
      </div>
    );

    return (
      <div className="container" style={{ marginTop: '100px', height: 'auto' }}>
        {data}
      </div>
    );
  }
}

export default SingleBook;
