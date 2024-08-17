// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePriview = document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change",(e)=>{
        const file = e.target.files[0];
        if(file){
            uploadImagePriview.src = URL.createObjectURL(file);
        }
    });
}
// End Upload Image


// Upload Audio
const uploadAudio = document.querySelector("[upload-audio]");
if(uploadAudio){

    const uploadAudioInput = document.querySelector("[upload-audio-input]");
    const uploadAudioPlay = document.querySelector("[upload-audio-play]");
    const source = uploadAudio.querySelector("source");

    uploadAudioInput.addEventListener("change",(e)=>{
        if(e.target.files,length){
            const audio = URL.createObjectURL(e.target.files[0]);
            source.src = audio;
            uploadAudioPlay.load();
        }
    });
}
// End Upload Audio