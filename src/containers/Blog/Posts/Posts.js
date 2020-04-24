import React, { Component } from "react";
//import { Link } from "react-router-dom";
import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";
import "./Posts.css";
// Use a particular axios instance instead of the global object
import axios from "../../../axios";

import { Route } from "react-router-dom";

/* TODO: fix "React state update on an unmounted component" issue
   - My guess is that this might happen if you changed the route 
     while the async “get” method is still executing, by the time
     it’s done and executing the “then” method the component has 
     been unmounted already due to the route change and you will 
     be setting a state on a unmounted component. 
   - check this link for potential fix 
     https://www.debuggr.io/react-update-unmounted-component/ 

*/

class Posts extends Component {
  state = {
    posts: [],
  };
  componentDidMount() {
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return { ...post, author: "Steven" };
        });

        this.setState({ posts: updatedPosts });
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
        //this.setState({ error: true });
      });
  }

  postSelectedHandler = (id) => {
    this.props.history.push({ pathname: `/posts/${id}` });
  };

  // postSelectedHandler = (id) => {
  //   this.setState({ selectedPostId: id });
  // };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => (
        // <Link to={`/posts/${post.id}`} key={post.id}>
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
        // </Link>
      ));
    }
    console.log(`${this.props.match.url}/:id`);
    return (
      <div>
        <section className="Posts">{posts}</section>
        {/* nested route */}
        <Route
          path={`${this.props.match.url}/:id`}
          exact
          component={FullPost}
        ></Route>
      </div>
    );
  }
}

export default Posts;
