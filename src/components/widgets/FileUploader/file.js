import React, { Component } from 'react';
import Uploader from 'react-firebase-file-uploader';
import { firebase } from '../../../firebase';

class FileUploader extends Component {
  state = {
    name: '',
    isUplaoding: false,
    imageURL: '',
    progress: 0,
  };

  handleUploadStart = () => {
    this.setState({ isUplaoding: true, progress: 0 });
  };

  handleUploadError = err => {
    this.setState({ isUplaoding: false });
    console.log(err);
  };

  handleUploadSuccess = filename => {
    // console.log(filename);
    this.setState({ name: filename, isUplaoding: false, progress: 100 });
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({ imageURL: url });
      });
    this.props.filename(filename);
  };

  handleProgress = progress => {
    this.setState({ progress });
  };

  render() {
    return (
      <div className="form-group">
        {this.state.isUploading ? <p>Progress: {this.state.progress}</p> : null}

        {this.state.imageURL ? (
          <img
            style={{ width: '290px', height: '167px', display: 'block', marginTop: '20px' }}
            src={this.state.imageURL}
            alt={this.state.imageURL}
          />
        ) : (
          <Uploader
            accept="image/*"
            name="image"
            randomizeFilename
            storageRef={firebase.storage().ref('images')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        )}
      </div>
    );
  }
}

export default FileUploader;
