const qouteContainer = document.getElementById("qoute-container")
const qouteText = document.getElementById("qoute")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQouteBtn = document.getElementById("new-qoute")
const loader = document.getElementById("loader")
let data =[];

// show loader
function loading () {
    loader.hidden = false;
    qouteContainer.hidden = true;
}
// hide loading
function complete () {
    loader.hidden = true;
    qouteContainer.hidden = false;
}
// show new qoute
function newQoute() {
    loading()
const qoute = data[Math.floor(Math.random() * data.length)];
// check if author field is blank and replace it with "unknown"
if (!qoute.author){
authorText.textContent = "unkown";
} else {
authorText.textContent = qoute.author;
}
if (qoute.text.length > 50) {
    qouteText.classList.add('long-qoute')
} else {
    qouteText.classList.remove('long-qoute')
}

//  set qoute, hide loader
qouteText.textContent = qoute.text;
complete()

}
// get qoute from api
async function getQoute() {
    loading
    const apiurl ="https://jacintodesign.github.io/quotes-api/data/quotes.json"
    try {
        const response = await fetch (apiurl);
        data = await response.json();
        newQoute();
    } catch (error) {
        // catch error here
    }
}

// x qoute
function xQoute (){
    const xUrl = `https://twitter.com/intent/tweet?text=${qouteText.textContent} - ${authorText.textContent}`;
    window.open(xUrl , '_blank');
}
// event lisener
newQouteBtn.addEventListener('click',newQoute);
twitterBtn.addEventListener('click',xQoute);
// onload
getQoute();
