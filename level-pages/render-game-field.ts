import { useTimer } from "./timer";
export let interval: NodeJS.Timeout;

export function renderGameField({
    gamePage,
    level,
    cardsCounter,
    cardsForLevel,
    doubleCardArray,
    cardsInGame,
}: {
    gamePage: Element;
    level: string;
    cardsCounter: number;
    cardsForLevel: string;
    doubleCardArray: {
        rank: string;
        suit: string;
    }[];
    cardsInGame: string[];
}) {
    const levelCardsHtml = `
    <div class="playing-field">
    <div class="header">
      <div class="timer">
        <div class="timer__text">
          <p class="timer__text_min">min</p>
          <p class="timer__text_sek">sek</p>
        </div>
        <div class="timer__box">
        <span class="timer__numbers timer__numbers_minutes">00</span>
        <span class="timer__numbers timer__numbers_colon">.</span>
        <span class="timer__numbers timer__seconds">00</span>
        </div>
      </div>
        <button class="level__button_again" id="start-reverse-button">Играть еще раз</button>
    </div>
    <div class="render-cards"></div>
  </div>
    `;
    gamePage.innerHTML = levelCardsHtml;

    const renderCardsElement = document.querySelector(".render-cards");
    const minutesElement = document.querySelector(".timer__numbers_minutes");
    const secondsElement = document.querySelector(".timer__seconds");

    clearInterval(interval);

    if (secondsElement && minutesElement) {
        interval = setInterval(
            () => useTimer({ secondsElement, minutesElement }),
            1000,
        );
    }

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
        const newCard = `
              <div class="generated-card" data-index="${i}">
                <div class="generated-card__corner">
                  <p class="generated-card__text">${doubleCardArray[i].rank}</p>
                  <div class="generated-card__corner_svg">
                  ${doubleCardArray[i].suit}
                  </div>
                </div>
                <div class="generated-card__svg">
                  ${doubleCardArray[i].suit}
                </div>
                <div class="generated-card__corner generated-card__corner_reverse">
                  <p class="generated-card__text">${doubleCardArray[i].rank}</p>
                  <div class="generated-card__corner_svg">
                  ${doubleCardArray[i].suit}
                  </div>
                </div>
              </div>`;
        cardsForLevel += newCard;
        cardsInGame.push(newCard);
    }
    cardsForLevel += "</div>";
    (renderCardsElement as Element).innerHTML = cardsForLevel;
}
