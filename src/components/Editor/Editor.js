import React, { Component } from 'react';
import "./Editor.scss";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {
  justifyRight,
  justifyLeft,
  justifyCenter, 
  copyContent,
  cutContent,
  boldContent,
  italicContent,
  hyperlinkContent,
  imageContent
} from './EditorMethods';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignLeft,
  faAlignRight,
  faAlignCenter,
  faStroopwafel,
  faCheckSquare,
  faCoffee,
  faCopy,
  faBold,
  faItalic,
  faPaste,
  faLink,
  faImage,
  faCut,
  faSave,
  faShare,
  faEye,
  faFile,
  faFileImport
} from '@fortawesome/free-solid-svg-icons';
import { fetchPosts, updatePost, savePost, importContent } from '../../actions/editorActions';
import PostContainer from '../Posts/PostContainer'
library.add( faAlignLeft, faAlignRight, faAlignCenter, faStroopwafel, faCheckSquare, faCoffee, faCopy, faBold, faItalic, faPaste, faLink, faImage, faCut, faSave, faShare, faEye, faFile, faFileImport);

let editableContent;
class Editor extends Component {

  constructor(props){
    super(props);
    this.postTitle = React.createRef();
    this.state ={
      editable: true,
      title :'',
      btnType : 'Save',
      activeImportKey : null
    };

  }

  
  componentDidUpdate(prevProps, prevState) {
    console.log('currnet props')
    console.log(this.props);
    console.log('previous props')
    console.log(prevProps)    

  }

  
  componentDidMount = () => {
    this.props.fetchPosts();
  }
  
  //set editor mode preview || edit
  editableMode = () => {
    this.setState({
      editable : !this.state.editable
    })
  };

//export editor content into .html file
  exportContent = () => {
    editableContent = document.getElementById('contentEdit').innerHTML;

    if(this.state.title !== '' && editableContent !== '' ){

      var downloadElement = document.createElement('a');
      downloadElement.style.display = 'none';
      downloadElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(editableContent));
      downloadElement.setAttribute('download', this.state.title +'.html');
      document.body.appendChild(downloadElement);
      downloadElement.click();
      document.body.removeChild(downloadElement);

      this.setState({
        title : ''
      });
       document.getElementById('contentEdit').innerHTML = ''

    }else{
      alert('Title and Body Content can\'t Be Empty ')
    }
  };


  savePost = () => {
    this.props.savePost(this.postTitle.current.value, document.getElementById('contentEdit').innerHTML);
    this.setState({
      title : ''
    });
    document.getElementById('contentEdit').innerHTML = '';
  }
  
  
  render(){

    //  small fix require : import button / save post  unable to replace existing title 

    return (
      <React.Fragment>
      <header>
        <h2 className="header-title"> WYSIWYG-Editor </h2>
      </header>
      <div className="container main-wrapper">
        <div className="row">
          <div className = "col-sm-12 col-md-6 editor-view" >

            <div className="form-row">
            {/* Editor title */}
              <div className='form-wrapper'>
                <input type="text" className=" form-title" ref={this.postTitle}  defaultValue={ this.props.title } placeholder="Post Title..." />
              </div>

              {/* Editor Action Buttons  */}
              
              <EditorActionsView />

              {/* Editor Content  */}

              <div id="contentEdit" className="editor-contentEditable" contentEditable={this.state.editable} ref = {(textarea) => this.textArea = textarea}>
                { this.props.editableContent }
              </div>

            </div>
                
              {/* Footer action buttons */}
             <div className='footer-btns'>
                {
                  ( this.props.btnType === 'Save') ? 
                    <button className="btn pull-left btn-primary" onClick={ () => { this.savePost()  } }><FontAwesomeIcon icon={faSave} /> Save </button>
                    : 
                    <button className="btn pull-left btn-primary" onClick={ e => { this.props.updatePost(this.props.activeImportKey, this.postTitle.current.value, document.getElementById('contentEdit').innerHTML) } }><FontAwesomeIcon icon={faSave} /> Update </button>
                }
                <button className="btn pull-left btn-white" style={{ marginLeft:5}} onClick={  this.editableMode }><FontAwesomeIcon icon={faEye} /> {
                  (this.state.editable) ? 'Preview' : 'Edit'
                 }</button>
                <button className="btn pull-right btn-danger" onClick={ this.exportContent }><FontAwesomeIcon icon={faShare} />  Export File</button>
            </div>

          </div>
          
          <div className="col-sm-12 col-md-6 preview-view">

           {/* Posts Goes Here */}
          
          {  
            (this.props.posts !== undefined) ?  <PostContainer posts={this.props.posts}/> : '---'
          }
          {/* <PostContainer posts={this.props.posts}/> */}

          </div>
        </div> 
      </div>
      </React.Fragment>
    );
  }
}


const EditorActionsView = () => {
  return(
            <div className="col-sm-12 btns-container">
                <button type="button" className="btn btn-outline-primary btn-sm btn-style" onClick={ cutContent }><FontAwesomeIcon icon={faCut} /> Cut</button>
                <button type="button" className="btn btn-outline-primary btn-sm btn-style" onClick={ copyContent }><FontAwesomeIcon icon={faCopy} /> Copy</button>
                <button type="button" className="btn btn-outline-primary btn-sm btn-style" onClick={ boldContent }><FontAwesomeIcon icon={faBold} />  Bold</button>
                <button type="button" className="btn btn-outline-primary btn-sm btn-style" onClick={ italicContent }><FontAwesomeIcon icon={faItalic} /> Italic</button>
                <label for="image-upload" className="btn btn-outline-primary btn-sm btn-style" style={{
                      'marginBottom': '0',
                      marginTop:-5
                }}>
                    <FontAwesomeIcon icon={faImage} /> Image
                </label>
                <input id="image-upload" type="file"  draggable={true} onChange={ imageContent }/>
                
                <button type="button" className="btn btn-outline-primary btn-sm btn-style" onClick={ hyperlinkContent }><FontAwesomeIcon icon={faLink} /> Hyperlink</button>
                <button type="button" className="btn btn-outline-primary btn-sm btn-style" onClick={ justifyLeft }><FontAwesomeIcon icon={faAlignLeft} /> Align Left</button>
                <button type="button" className="btn btn-outline-primary btn-sm btn-style" onClick={ justifyCenter }><FontAwesomeIcon icon={faAlignCenter} /> Align Center</button>
                <button type="button" className="btn btn-outline-primary btn-sm btn-style" onClick={ justifyRight }><FontAwesomeIcon icon={faAlignRight} /> Align Right</button>
                             
              </div>
  )
}

Editor.PropTypes = {
   posts: PropTypes.arrayOf(
     PropTypes.shape({
       editableContent: PropTypes.string.isRequired,
       key: PropTypes.string.isRequired,
       title: PropTypes.string.isRequired
     })
   ),
   title : PropTypes.string,
   editableContent : PropTypes.string,
   btnType : PropTypes.string.isRequired,
   activeImportKey : PropTypes.string,
   fetchPosts : PropTypes.func.isRequired,
   savePost : PropTypes.func.isRequired,
   updatePost : PropTypes.func.isRequired,
   importContent : PropTypes.func

}

function mapStateToProps(state) {
  return {
    posts: state.editor.posts,
    title : state.editor.title,
    editableContent: state.editor.editableContent,
    btnType: state.editor.btnType,
    activeImportKey : state.editor.activeImportKey
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts : () => { fetchPosts(dispatch) },
    savePost : (title, content) => { savePost(title, content, dispatch)},
    updatePost : (id, title, content) => { updatePost(id, title, content, dispatch)},
    importContent :  (id) => { importContent(dispatch,id) }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);


