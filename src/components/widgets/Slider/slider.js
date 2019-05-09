import React, { Component } from 'react';
import Slider from 'react-slick';

import './slider.css';

class HomeSlider extends Component {
  handleImages = imageName => {
    return <div className="book_image" style={{ background: `url('images/${imageName}')` }} />;
  };

  handleBooksData = () => {
    const covers = this.props.covers;
    return covers.map((cover, i) => {
      return (
        <div className="books_wrapper" key={cover.id}>
          {this.handleImages(cover.data.image)}
        </div>
      );
    });
  };

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      ...this.props.settings,
    };

    return <Slider {...settings}>{this.handleBooksData()}</Slider>;
  }
}

export default HomeSlider;
