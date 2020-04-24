import React, { Component } from "react";
import axios from "axios";
import "./NewPost.css";
import { Redirect } from "react-router-dom";

class NewPost extends Component {
  state = {
    title: "",
    content: "",
    author: "Steven",
    submitted: false,
  };

  componentDidMount = () => {
    console.log(this.props);
  };

  postDataHandler = () => {
    const post = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author,
    };

    axios.post("/posts", post).then((response) => {
      console.log(response);
      // - by using the push method you can go back to the previous page (NewPost)
      // - alternatively, you can use the replace method but
      //   then the go back button won’t work in this case
      this.props.history.push("/posts");
      // the redirect component will not be rendered if you commented this out
      //this.setState({ submitted: true });
    });
  };

  render() {
    // console.log("New Post");

    let redirect = null;
    // conditional redirects
    if (this.state.submitted) {
      redirect = <Redirect to="/posts" />;
    }
    return (
      <div className="NewPost">
        {redirect}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.content}
          onChange={(event) => this.setState({ content: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={(event) => this.setState({ author: event.target.value })}
        >
          <option value="Steven">Steven</option>
          <option value="Arlo">Arlo</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
