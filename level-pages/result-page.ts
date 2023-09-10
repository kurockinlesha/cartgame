import { renderMainPage } from "./index";
import { seconds, minutes } from "./timer";

export function renderResultPage({
    gamePage,
    gameWon,
}: {
    gamePage: Element;
    gameWon: boolean;
}) {
    const resultHtml = `
    <div class="level">
       <img src=${gameWon ? "static/celebration.png" : "static/dead.png"}></img>
        <p class="level__text level__text_result">${
            gameWon ? "Вы выиграли!" : "Вы проиграли!"
        }</p>
        <div class="level__time">
        <p class="level__time_text">Затраченное время:</p>
        <p class="timer__time_numbers">${
            minutes <= 9 ? "0" + minutes : minutes
        }.${seconds <= 9 ? "0" + seconds : seconds}</p>
        </div>
        <button class="level__button_start">Играть снова</button>
        </div>
`;

    gamePage.innerHTML = resultHtml;

    const restartButton = document.querySelector(".level__button_start");
    (restartButton as Element).addEventListener("click", () => {
        renderMainPage();
    });
}
