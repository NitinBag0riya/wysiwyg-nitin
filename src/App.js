import React, { Component } from 'react';
import "./App.scss";
import base from './config/firebase';
import { copyContent, cutContent, boldContent, italicContent, hyperlinkContent, imageContent  } from './components/Methods'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel,faCheckSquare,faCoffee,faCopy,faBold,faItalic,faPaste,faLink,faImage,faCut,faSave,faShare,faEye,faFile,faFileImport } from '@fortawesome/free-solid-svg-icons';
library.add( faStroopwafel, faCheckSquare, faCoffee, faCopy, faBold, faItalic, faPaste, faLink, faImage, faCut, faSave, faShare, faEye, faFile, faFileImport );

let editableContent;
class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      paste : '',
      editable: true,
      title : '',
      posts : []
    };

  }

  componentDidMount = () => {
     base.bindToState('wysiwyg', {
       context: this,
       state: 'posts',
       asArray: true
     });
  }
  
  editableMode = () => {
    this.setState({
      editable : !this.state.editable
    })
  };


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

    }else{
      alert('Title and Body Content can\'t Be Empty ')
    }
  };

  savePost = () => {
    base.push('wysiwyg', {
      data: {
        title: this.state.title,
        editableContent : document.getElementById('contentEdit').innerHTML
      }
    }).then(data => {
      alert('Saved !')
    }).catch(err => {
      alert('Error !')
    })
  };

  importContent = (title, content) => {
    this.setState({
      title : title
    });
    document.getElementById('contentEdit').innerHTML = content;
  };
  

  render(){
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
                <input type="text" className=" form-title" onChange={ (e) => { this.setState({
                  title:e.target.value
                }) }} placeholder='Post Title Here' />
              </div>

              {/* Editor Action Buttons  */}
              
              <MethodButton />


              {/* Editor Content  */}

              <div id="contentEdit" className="editor-contentEditable" contentEditable={this.state.editable} ref = {(textarea) => this.textArea = textarea}>
                Write down your text and play with it.
              </div>

            </div>

             <div className='footer-btns'>
                <button className="btn pull-left btn-primary" onClick={ this.savePost }><FontAwesomeIcon icon={faSave} />  Save</button>
                <button className="btn pull-left btn-white" style={{ marginLeft:5}} onClick={  this.editableMode }><FontAwesomeIcon icon={faEye} /> {
                  (this.state.editable) ? 'Preview' : 'Edit'
                 }</button>
                <button className="btn pull-right btn-danger" onClick={ this.exportContent }><FontAwesomeIcon icon={faShare} />  Export File</button>
            </div>

          </div>
          
          <div className="col-sm-12 col-md-6 preview-view">
           {/* Posts Goes Here */}
          
          <div className="container">

          <h5> <FontAwesomeIcon icon={faFile}/> Recent Posts</h5>

          { 
              ( (this.state.posts).length > 0 ) ? this.state.posts.map( (ele, key) => {
                return(
                   <div className="list-group util-margin" key={key}>
                    <p href="#" className="list-group-item clearfix postsView">
                      
                     { ele.title }
                      <span className="pull-right">
                        <button className="btn btn-sm btn-success" onClick={ () => this.importContent(ele.title, ele.editableContent)}>
                          <FontAwesomeIcon icon={faFileImport} /> Import
                        </button>
                      </span>
                    </p>
                  </div>
                )
              }) : 'No Posts Found'
          }           

          </div>

          </div>
        </div> 
      </div>
      </React.Fragment>
    );
  }
}


const MethodButton = () => {
  return(
            <div className="col-sm-12 btns-container">
                <button type="button" className="btn btn-outline-primary btn-sm btn-style" onClick={ cutContent }><FontAwesomeIcon icon={faCut} /> Cut</button>
               <button type="button" className="btn btn-outline-primary btn-sm btn-style" onClick={ copyContent }><FontAwesomeIcon icon={faCopy} /> Copy</button>
                {/* <button type="button" className="btn btn-outline-primary btn-sm btn-style" onClick={ pasteContent }><FontAwesomeIcon icon={faPaste} /> Paste</button> */}
                <button type="button" className="btn btn-outline-primary btn-sm btn-style" onClick={ boldContent }><FontAwesomeIcon icon={faBold} />  Bold</button>
                <button type="button" className="btn btn-outline-primary btn-sm btn-style" onClick={ italicContent }><FontAwesomeIcon icon={faItalic} /> Italic</button>
                <button type="button" className="btn btn-outline-primary btn-sm btn-style" onClick={ hyperlinkContent }><FontAwesomeIcon icon={faLink} /> Hyperlink</button>
              
                <label for="image-upload" className="btn btn-outline-primary btn-sm btn-style" style={{
                      'marginBottom': '0'
                }}>
                    <FontAwesomeIcon icon={faImage} /> Image
                </label>
                <input id="image-upload" type="file"  draggable={true} onChange={ imageContent }/>
                
              </div>
  )
}

export default App;