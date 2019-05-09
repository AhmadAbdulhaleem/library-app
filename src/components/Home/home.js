import React, { Component } from 'react';
import HomeSlider from '../widgets/Slider/slider';
import { firebase, firebaseBooks, firebaseCovers } from '../../firebase';
import { firebaseLooper } from '../../config/helpers';
import ListBooks from '../widgets/ListBooks/listBooks';
import Spinner from '../widgets/Spinner/spinner';

class Home extends Component {
  state = {
    books: [],
    loading: true,
    covers: [],
    imageUrl: [],
  };

  componentWillMount() {
    firebaseBooks
      .limitToFirst(3)
      .once('value')
      .then(snapshot => {
        const books = firebaseLooper(snapshot);

        books.forEach((item, i) => {
          firebase
            .storage()
            .ref('images')
            .child(item.data.image)
            .getDownloadURL()
            .then(url => {
              books[i].data.image = url;
              this.setState({ books, loading: false });
            });
        });
      });

    firebaseCovers
      .limitToFirst(3)
      .once('value')
      .then(snapshot => {
        const covers = firebaseLooper(snapshot);
        this.setState({ covers, loading: false });
      });
  }

  render() {
    let data = this.state.loading ? (
      <Spinner />
    ) : (
      <div style={{ overflow: 'hidden' }}>
        <HomeSlider covers={this.state.covers} start={0} end={3} settings={{ dots: false }} />
        <ListBooks books={this.state.books} />
      </div>
    );
    return data;
  }
}

export default Home;
