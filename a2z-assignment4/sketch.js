let counts = {};
var num = 0;
let keys = [];


function setup() {
  noCanvas();

  button = createButton("Click to display Surah");
  button.position(350, 50);
  button.mouseClicked(runAPIs);
}

async function runAPIs() {
  try {
    num = num + 1;
    wordlink = select('#word');
    wordlink.html("Surah: " + num);
    let url = "https://api.alquran.cloud/v1/surah/" + num;
    //    console.log(url);

    let response = await fetch(url);
    let data = await response.json();
    //    console.log(data.data.ayahs);
    let tokens = [];

    for (i = 0; i < data.data.ayahs.length; i++) {
      tokens[i] = data.data.ayahs[i].text.split(/\s+/g);
      for (let j = 0; j < tokens[i].length; j++) {
        if (!/\d+/.test(tokens[i][j])) {
          if (counts[tokens[i][j]] === undefined) {
            counts[tokens[i][j]] = 1;
            keys.push(tokens[i][j]);
          } else {
            counts[tokens[i][j]] = counts[tokens[i][j]] + 1;
          }
        }
      }
      console.log(tokens);
    }

    keys.sort(compare);

    function compare(a, b) {
      var countA = counts[a];
      var countB = counts[b];
      return countB - countA;
    }

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      createDiv(key + " " + counts[key]);
    }
    noCanvas();

  } catch (error) {
    console.log("error");
  }
}