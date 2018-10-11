import base from "../config/firebase";

export const save = (title, content) => {
      if ( title !== '' && content !== '') {
         return base.push('wysiwyg', {
              data: {
                  title: title,
                  editableContent: content
              }
            })
      } else {
          return new Promise( (resolve, reject ) => reject('Title and Body Content can\'t Be Empty ')) 
      }
}
export const update = (id, title, content) => {
    if ( title !== '' && content !== '') {
         return base.update('wysiwyg/'+id, {
              data: {
                  title: title,
                  editableContent: content
              }
            })
      } else {
          return new Promise( (resolve, reject ) => reject('Error in updation ! ')) 
      }
}