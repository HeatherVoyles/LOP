



  // option for uploading photos directly from mobile camera; simply send the file via an XHR request inside of the file input's onchange handler.
  // In iPhone iOS6 and from Android ICS onwards, HTML5 has the following tag which allows you to take pictures from your device, but that still requires the user to hit a submit button within the form:

    <input type="file" accept="image/*" capture="camera">

    <input id="myFileInput" type="file" accept="image/*;capture=camera">
    var myInput = document.getElementById('myFileInput');

    function sendPic() {
       var file = myInput.files[0];

    // Send file here either by adding it to a `FormData` object 
    // and sending that via XHR, or by simply passing the file into 
    // the `send` method of an XHR instance.
}

myInput.addEventListener('change', sendPic, false);