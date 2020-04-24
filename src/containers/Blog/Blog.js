import React, { Component, Suspense } from "react";
// import axios from "axios";
import "./Blog.css";
import Posts from "./Posts/Posts";
import { Route, NavLink, Switch } from "react-router-dom";
// import { Redirect } from "react-router-dom";

// import NewPost from "./NewPost/NewPost";

// - lazy loading - approach 1
// - it won’t be included in the main bundle by default
import asyncComponent from "../../hoc/asyncComponent";
const AsyncNewPost = asyncComponent(() => {
  return import("./NewPost/NewPost");
});

// - lazy loading - approach 2
// - need to be used with Suspense
const NewPost2 = React.lazy(() => import("./NewPost/NewPost"));

class Blog extends Component {
  state = {
    auth: true,
  };
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                {/* 
                  - use NavLink to make styling easier 
                  - this is what is generated in the DOM :
                    <a aria-current="page" class="active" href="/">Home</a>
                  - you can use activeClassName property to change the class of 
                    the anchor tag rendered. Default class is “active”.
                  - use activeStyle property for inline styling    
                */}
                <NavLink
                  to="/posts"
                  activeClassName="active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline",
                  }}
                  exact
                >
                  Posts
                </NavLink>
                {/*
                   <Link to="/">Home</Link>
                */}
                {/* A regular anchor tag will trigger a page reload while switching route. 
                    Application state will be lost in this case. */}
                {/*<a href="/">Home</a> */}
              </li>
              <li>
                {/* - pathname by default is an absolute path 
                    - you can use props.match.url + “/new-post” 
                      to build a relative path                
                */}
                <NavLink to={{ pathname: "/new-post" }}>New Post</NavLink>
              </li>
              <li>
                <NavLink to={{ pathname: "/new-post2" }}>New Post 2</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/*
        <Route path="/" exact render={() => <h1>Home</h1>} />       
        */}
        {/* 
            why use Switch
            - only the first matched route of a given path will be rendered 
            - if you don’t use Switch every time NewPost is rendered
              FullPost will be rendered as well
            - the order of the routes is important
            - If you want a route to always be analyzed 
              move it out of Switch       
         */}

        <Switch>
          {/* this is how you implement guards – whether to render 
              the Route component or not based on some criteria   */}
          {this.state.auth ? (
            <Route path="/new-post" component={AsyncNewPost}></Route>
          ) : null}

          {this.state.auth ? (
            <Route
              path="/new-post2"
              render={() => (
                <Suspense fallback={<div>Loading...</div>}>
                  <NewPost2 />
                </Suspense>
              )}
            ></Route>
          ) : null}

          <Route path="/posts" component={Posts}></Route>
          {/* catch call */}
          <Route render={() => <h1>Not found</h1>} />
          {/* <Redirect from="/" to="/posts"></Redirect> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
