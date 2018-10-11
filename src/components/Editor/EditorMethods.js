export const copyContent = () => {
     document.execCommand('copy');
     // ( a ) ?  alert('copied !') : alert('Error');
 }

export const imageContent = () => {
     var input = document.getElementById("image-upload");

     if (input.files.item(0).type === 'image/jpeg' || input.files.item(0).type === 'image/png') {
         var fReader = new FileReader();
         fReader.readAsDataURL(input.files[0]);
         fReader.onloadend = function (event) {
             document.execCommand('insertHTML', false, `<img src=${event.target.result} style="width:350px;height:350px"></img>'`);
         };
     } else {
         alert('Select Image type of JPEG/PNG')
     }
 };

 
export const cutContent = () => {
     document.execCommand('cut');
 };

export const italicContent = () => {
     document.execCommand('italic');
 };

export const hyperlinkContent = () => {
     let linkURL = prompt('Enter Url', 'www.example.com');
     //let sText = document.getSelection();
     document.execCommand('createLink', false, linkURL);
 };

export const boldContent = () => {
     document.execCommand('bold');
 };

 export const justifyRight = () => {
     document.execCommand('justifyRight');
 }

export const justifyLeft = () => {
    document.execCommand('justifyLeft');
}

export const justifyCenter = () => {
    document.execCommand('justifyCenter');
}

