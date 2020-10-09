let randomNumber1 = Math.floor(Math.random() * 6) + 1;

let randomDiceImage = "dice" + randomNumber1 + ".png";

let randomImageSource = "images/" + randomDiceImage;

let image1 = document.querySelectorAll("img")[0];

image1.setAttribute("src", randomImageSource);

let randomNumber2 = Math.ceil(Math.random() * 6);

let randomDiceImage1 = "dice" + randomNumber2 + ".png";

let randomImageSource1 = "images/" + randomDiceImage1;

let image2 = document.querySelectorAll("img")[1];

image2.setAttribute("src", randomImageSource1);

//If Player1 Wins
if (randomNumber1 > randomNumber2) {
  document.querySelector("h1").innerHTML = "🏆 Player A Wins ";
}

//If Player2 Wins
else if (randomNumber1 < randomNumber2) {
  document.querySelector("h1").innerHTML = "Player B Wins 🏆";
}

// If Both Are Same
else {
  document.querySelector("h1").innerHTML = "🏆 Draw 🏆";
}
