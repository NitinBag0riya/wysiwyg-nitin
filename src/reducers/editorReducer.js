import {
    RESOLVED_GET_POSTS,
    RESOLVED_SAVE,
    RESOLVED_UPDATE,
    RESOLVED_IMPORT_CONTENT,
    CHANGE_POST_TITLE
} from '../actions/types'


const resetField = {
    title: '',
    activeImportKey: '',
    editableContent: ''
}

const initialState = {
    title :'',
    posts : [],
    btnType: 'Save'
}

export default function(state= initialState, action){
    switch (action.type) {

        case RESOLVED_SAVE:
            alert(action.payload)
        return {
            ...state,
        }

        case RESOLVED_GET_POSTS:
        if(action.message !== undefined){
            alert(action.message)
        }
        return {
            ...state.posts,
            posts: action.data,
            btnType: 'Save',
            ...resetField    
        }

        case RESOLVED_IMPORT_CONTENT:
            return {
                ...state,
                title : action.data.title,
                editableContent : action.data.editableContent,
                btnType: 'Update',
                activeImportKey : action.key
            }
        
        case RESOLVED_UPDATE :
            alert(action.payload)    
        return {
            ...state,
            btnType : 'Save',
            ...resetField
        }

        case CHANGE_POST_TITLE :
        return {
            ...state,
            posts : action.payload
        }
        
        default:
            return state;
    }
}