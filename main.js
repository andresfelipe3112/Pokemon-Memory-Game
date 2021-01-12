const logo = "./logo.png";
const cards = [
  {
    name: "Pikachu",
    img:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    id: 1
  },
  {
    name: "Charizard",
    img:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    id: 2
  },
  {
    name: "Blastoise",
    img:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
    id: 3
  },
  {
    name: "Venusaur",
    img:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    id: 4
  },
  {
    name: "Mew",
    img:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
    id: 5
  },
  {
    name: "Mewtwo",
    img:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
    id: 6
  }
];

let sortedCards = [];
let score = document.getElementById("score");
let myScore = 0;

//FUNCIONES

let createGame = cards => {
  let gameCards = cards.concat(cards);
  gameCards.sort(() => Math.random() - 0.5);
  sortedCards = gameCards;
  score.innerHTML = `Puntuación: ${myScore}`;
  for (let index = 0; index < sortedCards.length; index++) {
    const newContainer = document.createElement("div");
    newContainer.setAttribute("class", "cuadro_aviso");

    const newCard = document.createElement("div");
    newCard.setAttribute("class", "carta");
    newCard.setAttribute("id", sortedCards[index].id);

    //CARA VISIBLE DE LA CARTA

    const frontCard = document.createElement("div");
    frontCard.setAttribute("class", "cara");

    const imgFrontCard = document.createElement("img");
    imgFrontCard.setAttribute("src", logo);
    imgFrontCard.setAttribute("class", "logo");

    frontCard.appendChild(imgFrontCard);

    //CARA DETRÁS DE LA CARTA

    const backCard = document.createElement("div");
    backCard.setAttribute("class", "cara detras");
    backCard.setAttribute("id", sortedCards[index].id);

    const imgBackCard = document.createElement("img");
    imgBackCard.setAttribute("src", sortedCards[index].img);
    imgBackCard.setAttribute("class", "image");

    const pokemonName = document.createElement("h4");
    const name = document.createTextNode(sortedCards[index].name);
    pokemonName.setAttribute("class", "pokemon_name");
    pokemonName.appendChild(name);

    backCard.appendChild(imgBackCard);
    backCard.appendChild(pokemonName);

    //CREAR ELEMENTO
    newContainer.appendChild(newCard);
    newCard.appendChild(frontCard);
    newCard.appendChild(backCard);

    document.getElementById("game").appendChild(newContainer);
  }
};

let rulesClick = () => {
  let cardClick = document.getElementsByClassName("carta");
  let idCards = [];
  let matchedCards = [];
  let cardLength = sortedCards.length;

  for (let i = 0; i < cardClick.length; i++) {
    cardClick[i].onclick = () => {
      matchedCards.push(cardClick[i]);
      cardClick[i].classList.add("cartaClicked");
      const id = cardClick[i].getAttribute("id");
      idCards.push(id);
      if (idCards.length == 2) {
        if (idCards[0] === idCards[1]) {
          matchedCards[0].classList.add("matched");
          matchedCards[1].classList.add("matched");
          let newCardArray = sortedCards.filter(
            card => parseInt(card.id) !== parseInt(idCards[0])
          );
          sortedCards = newCardArray;
          matchedCards = [];
          idCards = [];

          myScore++;
          score.innerHTML = `Puntuación: ${myScore}`;

          if (sortedCards.length === 0) {
            setTimeout(() => {
              let newGame = confirm("Juego terminado, ¿Empezar de nuevo?");
              newGame ? restartGame() : null;
            }, 1000);
          }
        } else {
          cardClick[i].classList.add("cartaClicked");
          setTimeout(() => {
            for (let x = 0; x < cardClick.length; x++) {
              if (!cardClick[x].classList.contains("matched")) {
                cardClick[x].classList.remove("cartaClicked");
                console.log("Clase removida");
                matchedCards = [];
                idCards = [];
              }
            }
          }, 1200);
        }
        idCards = [];
      }
    };
  }
};

let restartGame = () => {
  location.reload();
};

createGame(cards);
rulesClick();
