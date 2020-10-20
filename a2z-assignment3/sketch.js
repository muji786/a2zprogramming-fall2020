let word = "itp";
let wordnikapi = "799fp2jet4lz2ovv697vn1d1f2eyh5egkbhwc0iik7hg40z8u";
let wordnikurl = "https://api.wordnik.com/v4/words.json/randomWord?&minLength=5&maxLength=-1&api_key=" + wordnikapi;

let wordlink, giphylink, giphydata;

function setup() {
  noCanvas();
  wordlink = select('#word');
  wordlink.mousePressed(runAPIs);
  giphylink = select('#giphy');
  giphylink.mousePressed(changeGiphy);
}

function changeGiphy(){
      let index = Math.floor(Math.random() * giphydata.data.length);
      document.getElementById("giphy").src = giphydata.data[index].images.original.url;
}

async function runAPIs() {
  try {
    let response = await fetch(wordnikurl);
    let data = await response.json();
    console.log(data);
    word = data.word;
    wordlink.html(word);
    console.log(word);
    try {
      let giphyapi = "f83e46e2508b41bd954c4b821e8261ea";
      let giphySearch = "https://api.giphy.com/v1/gifs/search?api_key=" + giphyapi + "&limit=10&offset=0&rating=G&lang=en&q=";

      let response2 = await fetch(giphySearch+word);
      giphydata = await response2.json();
      console.log(giphydata.data[0].images.original.url);
      console.log(giphydata);
      document.getElementById("giphy").src = giphydata.data[0].images.original.url;
    }
    catch (error){
      console.log("No related images!");
      document.getElementById("giphy").src = "itp.png";
    }  
  } catch (error) {
    console.log("No related words!");
    word = 'itp';
    wordlink.html(word);
  }
}