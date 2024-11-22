const texts = [
    "DESIGNER",
    "DEVELOPER",
    "CREATOR"
]

// each character will appear everyon 100ms
let speed = 100;
// allows up to update the content inside the span dynamically
const textElements = document.querySelector(".typewriter-text");
let textIndex = 0;
let characterIndex = 0;

function typeWriter(){
    if(characterIndex<texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(characterIndex);
        characterIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(eraseText, 1000);
    }
}

function eraseText(){
    // erase one character at a time
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0,-1);
        setTimeout(eraseText, 70);
    } else {
        textIndex = (textIndex+1)%texts.length;
        characterIndex = 0;
        setTimeout(typeWriter, 500);
    }
}

window.onload = typeWriter;