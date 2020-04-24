import React, { Component } from "react";
import axios from "axios";
import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  // - this will only be called once when the very first time
  //   FullPost was loaded by the Router
  // - this is due to Router will reuse the component that has been mounted
  componentDidMount() {
    // console.log("FullPost.js componentDidMount");
    // console.log(this.props);
    this.loadData();
  }

  // This will be called anytime the path changed ( /posts/1 --> /posts/2)
  componentDidUpdate() {
    //console.log("FullPost.js componentDidUpdate");
    this.loadData();
  }

  loadData = () => {
    if (this.props.match.params.id) {
      // - This is required to prevent infinite loop.
      //   Every time the state got updated this lifecycle method
      //   will be triggered and the get method will be called.
      //   Once the get method is completed it will update the state again
      //   and hence starts the cycle all over again
      if (
        !this.state.loadedPost || // edge case
        (this.state.loadedPost &&
          // converting props.match.params.id to number before the comparison
          this.state.loadedPost.id !== +this.props.match.params.id)
      ) {
        axios.get(`/posts/${this.props.match.params.id}`).then((response) => {
          // console.log(response);
          this.setState({ loadedPost: response.data });
        });
      }
    }
  };

  deletePostHandler = () => {
    axios.delete(`/posts/${this.props.match.params.id}`).then((response) => {
      console.log(response);
    });
  };

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;

    // - loaded post might not be ready yet
    // - show loading message if this is the case
    if (this.props.match.params.id) {
      post = <p style={{ textAlign: "center" }}>Loading...</p>;
    }

    // - the loading message will be overwritten right away if there
    //   is already a previous post loaded. This can be annoying and
    //   misleading before the new post is loaded
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
