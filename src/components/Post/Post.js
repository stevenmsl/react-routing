import React from "react";
// HOC approach to get the route info
//import { withRouter } from "react-router-dom";
import "./Post.css";

const post = (props) => {
  console.log(props);
  return (
    <article className="Post" onClick={props.clicked}>
      <h1>{props.title}</h1>
      <div className="Info">
        <div className="Author">{props.author}</div>
      </div>
    </article>
  );
};

export default post;
// HOC approach
// - route info by default doesn’t get passed down
//   the component tree to the child components
// - use with Router HOC to make this component route-aware;
//   it will have access to the route info.
// export default withRouter(post);
