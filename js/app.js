document.addEventListener('DOMContentLoaded', function() {
    console.log('<Ready:DOMContentLoaded>');

    // zoom
    var zoom=0.8;
    
    // update image size
    var video=document.getElementById("camstream");
    video.width="1024", video.height="576";
    var camsnaparea=document.getElementById("camsnap-area");
    camsnaparea.style.setProperty("height", "576");

    var wcs=document.getElementById("wcs");
    wcs.setZoom(zoom);
    
    // addEventListener to select tag
    document.getElementById("camselector").addEventListener("change", function(event){
        // update Camera from previous
        var idx=event.target.selectedIndex;
        this.startStream.bind(this)(event.target.options[idx].value);
        document.getElementById("capture-image").removeAttribute("disabled");
    }.bind(wcs), false);

    // addEventListener to Capture button
    document.getElementById("capture-image").addEventListener("mousedown", function(event){
        this.stream2Canvas.bind(this)(event);
        document.getElementById("camsnap-area").className=
            document.getElementById("camsnap-area").className.replace("hide", "");
        document.getElementById("camstream-area").className+=" hide";
        //
        var camsnap=document.querySelector("#camsnap");
        camsnap.style.setProperty("-webkit-transform-origin", "top left");
        camsnap.style.setProperty("-webkit-transform", "scale("+1024/1280+")");
        //
        var cropline=document.querySelector("#canvas-crop-line");
        cropline.style.setProperty("-webkit-transform-origin", "top left");
        cropline.style.setProperty("-webkit-transform", "scale("+1024/1280+")");
        //
        wcs.stopStream();
        document.getElementById("capture-image").setAttribute("disabled", "disabled");
        document.getElementById("crop-translate").removeAttribute("disabled");
        
    }.bind(wcs), false);

    // addEventListener to Download button
    document.getElementById("download-image").addEventListener("mousedown", function(event){
        this.downloadImage.bind(this)();
    }.bind(wcs), false);

    // crop & translate button
    document.getElementById("crop-translate").addEventListener("mousedown", function(event){
        this.cropTranslate.bind(this)(event);
        
        document.getElementById("camsnap-area").className+=" hide";
        document.getElementById("result").className=
            document.getElementById("result").className.replace("hide", "");

        var resultarea=document.getElementById("result");
        resultarea.style.setProperty("width", "1024");
        resultarea.style.setProperty("height", "576");
        //
        document.getElementById("crop-translate").setAttribute("disabled", "disabled");
        document.getElementById("download-image").removeAttribute("disabled");

    }.bind(wcs), false);


    // crop & translate button
    document.getElementById("refresh").addEventListener("mousedown", function(event){
        document.getElementById("capture-image").removeAttribute("disabled");
        document.getElementById("crop-translate").setAttribute("disabled", "disabled");
        document.getElementById("download-image").setAttribute("disabled", "disabled");

        var camselector=document.getElementById("camselector");
        var idx=camselector.selectedIndex;
        this.startStream.bind(this)(camselector.options[idx].value);

        document.getElementById("camstream-area").className=
            document.getElementById("camsnap-area").className.replace("hide", "");
        document.getElementById("camsnap-area").className=
            document.getElementById("camsnap-area").className.replace("hide", "");
        document.getElementById("result").className=
            document.getElementById("result").className.replace("hide", "");

        document.getElementById("camsnap-area").className+=" hide";
        document.getElementById("result").className+=" hide";



    }.bind(wcs), false);
    
    
    var camsnap=(document.getElementById("camsnap")).getContext("2d");
    camsnap.width="1024", camsnap.width="576";




});

