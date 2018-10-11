import React, { Component } from 'react'
import PostList from './PostList'
import PropTypes from 'prop-types';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFile } from '@fortawesome/free-solid-svg-icons';
library.add(faFile);

class PostContainer extends Component {

  render() {
    return (
      <React.Fragment>
        
        <div className="container">

          <h5> <FontAwesomeIcon icon={faFile}/> Recent Posts</h5>
          
            {
                (this.props.posts.length) ? <PostList posts={this.props.posts} /> : 'No Posts'
            }

          </div>

      </React.Fragment>
    )
  }
}

PostContainer.PropTypes = {
  posts : PropTypes.arrayOf(
    PropTypes.shape({
      editableContent : PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  )
}

export default PostContainer;