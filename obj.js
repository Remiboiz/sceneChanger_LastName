const image = document.getElementById("image");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const buttonsDiv = document.getElementById("buttons");
let audio = new Audio(); // Vanilla JS constructor which a new HTMLAudioElement
// add in Audio functionality

class Scene {
    constructor(imagePath, text1, text2){
        this.imagePath = imagePath;
        this.text1 = text1;
        this.text2 = text2;
        this.children = []; 
    }

    // adds child nodes to the scene
    setChildren(children){
        this.children = children;
    } 

    // clear all buttons on the scene, adds on ebutton for each child node
    loadChildrenButtons() {
        buttonsDiv.innerHTML = "";
        for (let i =0; i < this.children.length; i++){
            let newButton = document.createElement("button");
            newButton.innerText = "Option" + (i + 1);

            // call exit scene FIRST
            newButton.addEventListener('click', () => this.exitScene())

            //because of annoying JS weirdness, you cant simply pass this.children[i].renderScene
            // need to use an arrow function here so the reference to "this" is not lost

            newButton.addEventListener('click', () => this.children[i].renderScene());

            buttonsDiv.appendChild(newButton);
        }
    }

    // render this scene on the screen 
    renderScene() {
        image.src = this.imagePath;
        text1.innerText = this.text1;
        text2.innerText = this.text2;

        this.loadChildrenButtons();
    }

    //called once when a new button is clicked
    exitScene() {

    }
}

class MusicScene extends Scene {
    constructor(imagePath, text1, text2, audioPath) {
        super(imagePath, text1, text2);
        this.audioPath=audioPath;
    }

    renderScene() {
        super.renderScene();
        audio.src = this.audioPath;
        audio.play();
    }

    exitScene() {
        audio.pause();
    }
}

let rootScene = new Scene("./image1.webp", "test test test", "hello world");
let choiceA = new MusicScene("./image2.jpg", "testA", "testA again", "./Dreamy_20Flashback.mp3");
let choiceB= new MusicScene("./image3.jpg", "testB", "testB again", "./Investigations.mp3");

//add child nodes 
rootScene.setChildren([choiceA, choiceB]);
choiceA.setChildren([rootScene, choiceB]);
choiceB.setChildren([choiceA, choiceB]);


rootScene.renderScene();