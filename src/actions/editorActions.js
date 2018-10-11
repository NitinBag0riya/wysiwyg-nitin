import {
    SAVE_POST,
    UPDATE_POST,
    FETCH_POSTS,
    RESOLVED_GET_POSTS,
    RESOLVED_SAVE,
    RESOLVED_UPDATE,
    RESOLVED_IMPORT_CONTENT,
    CHANGE_POST_TITLE
} from './types'
import base from "../config/firebase";


export const importContent = (dispatch,id) =>{
    //alert(id);
    base.fetch('wysiwyg/'+id, {
        context: this,
        asArray: false
    }).then(data => {
        return dispatch(resolvedImportPost(data, id));
    })

}

export const resolvedImportPost = (data, key) => {
    return {
        type: 'RESOLVED_IMPORT_CONTENT',
        data: data,
        key : key
    }
};


export const fetchPosts = (dispatch,message) => {
    base.fetch('wysiwyg', {
            context: this,
            asArray: true
        }).then(data => {
          return dispatch(resolvedGetPosts(data,message));
        })
}


export const resolvedGetPosts = (data,message) => {
    return {
        type: 'RESOLVED_GET_POSTS',
        data: data,
        message
    }
};


export const savePost = (title, content, dispatch) => {

    base.push('wysiwyg/', {
        data: {
            title: title,
            editableContent: content
        }
    }).then(data => {
        return fetchPosts(dispatch,'Save')
    
    }).catch(err => {
        return dispatch(resolvedSave('Error in Saving...'))
    })

}


export const resolvedSave = (data) => {
    return {
        type: 'RESOLVED_SAVE',
        payload : data
    }
};


export const updatePost = (id, title, content, dispatch) => {

     base.update('wysiwyg/' + id, {
         data: {
             title: title,
             editableContent: content
         }
     }).then(data => {
        return fetchPosts(dispatch,'Updated')
     }).catch( err => {
         return dispatch(resolvedUpdate('Error in Updation...'))
     })

}


export const resolvedUpdate = (data) => {
    return {
        type: 'RESOLVED_UPDATE',
        payload: data
    }
};


export const changePostTitle = (e) => {
    console.log(e)
    return{
        type: 'CHANGE_POST_TITLE',
        payload : e
    }
};

