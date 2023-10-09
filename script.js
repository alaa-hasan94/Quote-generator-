const qouteContainer = document.getElementById("qoute-container")
const qouteText = document.getElementById("qoute")
const authorText = document.getElementById("author")
const shareBtn = document.getElementById("share")
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
    loading()
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
// function xQoute (){
//     const xUrl = `https://twitter.com/intent/tweet?text=${qouteText.textContent} - ${authorText.textContent}`;
//     window.open(xUrl , '_blank');
// }
 // Function to open the share dialog
 function togglePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = (popup.style.display === "block") ? "none" : "block";
  }

  // Function to share on Facebook
  function shareFacebook() {
    var shareUrl = `https://www.facebook.com/sharer/sharer.php?t=${encodeURIComponent(authorText.textContent)}`;
    window.open(shareUrl, '_blank');
    closePopup();
  }

  // Function to share on Twitter
  function shareTwitter() {
    var shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(qouteText.textContent)} - ${encodeURIComponent(authorText.textContent)}`;
    window.open(shareUrl, '_blank');
    closePopup();
  }

  // Function to share on LinkedIn
  function shareLinkedIn() {
    var shareUrl = "https://www.linkedin.com/shareArticle?url=" + encodeURIComponent(window.location.href);
    window.open(shareUrl, '_blank');
    closePopup();
  }

  // Function to close the popup dialog
  function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
  }
// event lisener
newQouteBtn.addEventListener('click',newQoute);
// twitterBtn.addEventListener('click',xQoute);
shareBtn.addEventListener('click', togglePopup);
// onload
getQoute();
