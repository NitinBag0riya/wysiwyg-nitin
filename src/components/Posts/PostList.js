import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { importContent } from '../../actions/editorActions'
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFileImport } from '@fortawesome/free-solid-svg-icons';
library.add( faFileImport);


class PostList extends Component {

  
  render() {
     // console.log(this.props)
    return (
      <React.Fragment>
        
        {
            this.props.posts.map( (post, key) => {
               return (
                   <div className="list-group util-margin" key={key}>
                    <p href="#" className="list-group-item clearfix postsView">                   
                     { post.title }
                      <span className="pull-right">
                        <button className="btn btn-sm btn-success" onClick={ () => this.props.importContent(post.key)}>
                          <FontAwesomeIcon icon={faFileImport} /> Import
                        </button>
                      </span>
                    </p>
                  </div>
               )
            })
        }

      </React.Fragment>
    )
  }
}

PostList.PropTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      editableContent: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  )
}


function mapStateToProps(state) {
  return {
    title : state.editor.title,
    editableContent: state.editor.editableContent,
    activeImportKey: state.editor.activeImportKey
    }
}

function mapDispatchToProps(dispatch) {
  return {
    importContent :  (id) => { importContent(dispatch,id) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);