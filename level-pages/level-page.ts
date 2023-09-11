// import * as _ from "lodash";
import { renderMainPage, level } from "./index";
import { renderGameField, interval } from "./render-game-field";
import { useMainGameLogic } from "./main-game-logic";
import { resetTimer } from "./timer";
import { shuffleCardsArray } from "./shuffled-function";

export const renderLevelPage = ({ gamePage }: { gamePage: Element }) => {
    const levelHtml = `
  <div class="field">
    <div class="header">
      <div class="timer">
      <div class="timer__text">
      <p class="timer__text_min">min</p>
      <p class="timer__text_sek">sek</p>
      </div>
        <p class="timer__numbers">00.00</p>
      </div>
        <button class="level__button_again" id="start-over-button">Начать игру</button>
    </div>
    <div class="render-cards"></div>
  </div>
  `;

    gamePage.innerHTML = levelHtml;

    const renderCardsElement = document.querySelector(".render-cards");
    const startOverButton = document.getElementById("start-over-button");
    let cardsCounter: number = 0;

    let cardsForLevel = "";
    if (level === "easy") {
        cardsCounter = 6;
        cardsForLevel = '<div class="cards cards__easy">';
    } else if (level === "medium") {
        cardsCounter = 12;
        cardsForLevel = '<div class="cards cards__medium">';
    } else if (level === "hard") {
        cardsCounter = 18;
        cardsForLevel = '<div class="cards">';
    }

    for (let i = 0; i < cardsCounter; i++) {
        cardsForLevel +=
            '<img class="cards__shirt" src="static/рубашка.png" alt="рубашка"/>';
    }
    cardsForLevel += "</div>";

    if (renderCardsElement) {
        renderCardsElement.innerHTML = cardsForLevel;
    }
    const cardRanksArray = ["A", "K", "Q", "J", "10", "9", "8", "7", "6"];
    // const randomRank =
    //     cardRanksArrray[Math.floor(Math.random() * cardRanksArrray.length)];
    const cardSuitsSvg = {
        spades: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="26" viewBox="0 0 30 26" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4946 22.7216C16.3283 24.7749 18.7912 26 20.9419 26C24.6159 26 28.841 23.9312 29.0247 17.7248C28.8538 11.601 22.1644 6.45377 15.7603 1.52608C15.2805 1.15693 14.8024 0.789017 14.3287 0.422017C14.3287 0.422038 14.3287 0.422057 14.3286 0.422078C14.3286 0.422059 14.3286 0.42204 14.3286 0.422021C14.0942 0.603615 13.8591 0.785433 13.6238 0.967515C7.03343 6.06558 0.177371 11.3692 6.49169e-06 17.7248C0.183705 23.9312 4.77619 26 8.45018 26C10.6009 26 12.8557 24.7749 14.4946 22.7216Z" fill="black"/>
      </svg>`,
        hearts: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="26" viewBox="0 0 30 26" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.53 3.27849C12.6964 1.22519 10.2335 0.000124665 8.08277 0.000124664C4.40879 0.000124663 0.183699 2.06893 -8.96305e-08 8.27535C0.170897 14.3992 6.86026 19.5464 13.2644 24.474C13.7441 24.8432 14.2223 25.2111 14.696 25.5781C14.696 25.5781 14.696 25.5781 14.696 25.578C14.6961 25.5781 14.6961 25.5781 14.6961 25.5781C14.9305 25.3965 15.1655 25.2147 15.4009 25.0326C21.9912 19.9345 28.8473 14.6309 29.0247 8.27535C28.841 2.06893 24.2485 0.00012207 20.5745 0.00012207C18.4238 0.00012207 16.169 1.22519 14.53 3.27849Z" fill="#FF4545"/>
      </svg>`,
        diamonds: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="26" viewBox="0 0 22 26" fill="none">
      <path d="M11 0.000244141L21.2705 12.7817L11 25.4994L0.729503 12.7817L11 0.000244141Z" fill="#FF4545"/>
      </svg>`,
        clubs: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3189 11.7767C14.4121 10.2172 16.118 6.88009 16.118 4.5052C16.118 1.85652 14.6708 0 12.5657 0C10.1976 0 8.88194 1.88928 8.88194 4.5052C8.88194 6.4076 10.5171 9.84721 11.6115 11.5821C10.0078 10.4322 6.59985 8.62089 4.77574 8.62089C2.336 8.62089 0.573975 10.0315 0.573975 12.5707C0.573975 14.8278 2.30545 16.3795 4.77574 16.3795C7.10192 16.3795 10.4924 14.3165 11.8711 13.1414L8.61407 24.9999C11.7182 23.8205 13.6891 23.7977 16.6541 24.9999L13.1494 13.1312C14.4342 14.2714 17.8464 16.3795 20.2243 16.3795C22.6946 16.3795 24.4261 14.8278 24.4261 12.5707C24.4261 10.0315 22.6641 8.62089 20.2243 8.62089C18.3302 8.62089 14.8022 10.619 13.3189 11.7767Z" fill="black"/>
      </svg>`,
    };
    const cardSuitsArray = [
        cardSuitsSvg.spades,
        cardSuitsSvg.hearts,
        cardSuitsSvg.diamonds,
        cardSuitsSvg.clubs,
    ];
    // const randomSuit =
    //     cardSuitsArray[Math.floor(Math.random() * cardSuitsArray.length)];
    let cardsArray = [];

    for (const suit of cardSuitsArray) {
        for (const rank of cardRanksArray) {
            cardsArray.push({ rank, suit });
        }
    }
    // const originalArray = [...cardsArray];
    // console.log(originalArray);

    cardsArray = shuffleCardsArray(cardsArray);

    const sliceCardArray = cardsArray.slice(0, cardsCounter / 2);
    const doubleCardArray = sliceCardArray.concat(sliceCardArray);
    doubleCardArray.sort(() => Math.random() - 0.5);
    const cardsInGame: string[] = [];

    (startOverButton as HTMLElement).addEventListener("click", () => {
        // console.log(level);
        resetTimer(interval);

        renderGameField({
            gamePage,
            level,
            cardsCounter,
            cardsForLevel,
            doubleCardArray,
            cardsInGame,
        });

        const flippedCardsElements =
            document.querySelectorAll(".generated-card");
        const flippedCards = Array.from(flippedCardsElements);
        useMainGameLogic({
            flippedCards,
            cardsInGame,
            doubleCardArray,
            gamePage,
        });

        const reverseButton = document.getElementById("start-reverse-button");
        (reverseButton as HTMLElement).addEventListener("click", () => {
            renderMainPage();
        });
    });
};
