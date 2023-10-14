const qouteContainer = document.getElementById("qoute-container");
const qouteText = document.getElementById("qoute");
const authorText = document.getElementById("author");
const shareBtn = document.getElementById("share");
const newQouteBtn = document.getElementById("new-qoute");
const loader = document.getElementById("loader");
const popup = document.getElementById("popup");
const copyButton = document.getElementById('copy-button');

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
    const apiUrl ="https://jacintodesign.github.io/quotes-api/data/quotes.json"
    try {
        const response = await fetch (apiUrl);
        data = await response.json();
        newQoute();
    } catch (error) {
        // catch error here
    }
}

// set attribute function
 function setAttribute (elementId, attributes){
for (const key in attributes) {
  document.getElementById(elementId).setAttribute(key, attributes[key])
}
 }
 // Function to open the share dialog
 function togglePopup() {
    popup.style.display = (popup.style.display === "block") ? "none" : "block";

    let attributes = {
      "data-hashtags": authorText.textContent.replace(/[^a-z0-9]/gi,'_'),
      "data-title": qouteText.textContent,
      "data-url": "https://alaa-hasan94.github.io/Quote-generator-/",
   }
    setAttribute("twitter", attributes)
    setAttribute("facebook", attributes)
    setAttribute("whatsapp", attributes)
    setAttribute("telegram", attributes)
    setAttribute("viber", attributes)
  }

   // Function to close the popup dialog
   function closePopup() {
    popup.style.display = "none";
  }

  async function copy (){
  try {
    // Attempt to copy the selected text to the clipboard
    let text = `${qouteText.textContent} - ${authorText.textContent}`
    await navigator.clipboard.writeText(text)
    alert('Text copied to clipboard');
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
  }

// event lisener
newQouteBtn.addEventListener('click',newQoute);
shareBtn.addEventListener('click', togglePopup);
copyButton.addEventListener('click', copy);
// onload
getQoute();
