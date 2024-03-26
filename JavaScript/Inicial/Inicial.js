var count = 1;
var descer = false;
document.getElementById("radio1").checked = true;

setInterval( function(){
nextImage();
},2000);

function nextImage(){
    count++;
    if(count>=4 && descer == false){
        descer = true;
    } else if (descer == true) {
        count = count - 2;
        if (count <= 1) {
            count = 1;
            descer = false
        }
    }
    console.log(count)
    document.getElementById("radio"+count).checked = true;
}