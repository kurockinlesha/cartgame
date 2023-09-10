import { renderLevelPage } from "./level-page";
import "./style.css";

export const gamePage = document.querySelector(".difficulties.center");

export let level: string = "";

export function renderMainPage() {
    const mainPage = `
    <div class="level">
        <p class="level__text">Выбери сложность</p>
        <div class="choice">
          <button class="choice__button" id="easy-level">1</button>
          <button class="choice__button" id="medium-level">2</button>
          <button class="choice__button" id="hard-level">3</button>
        </div>
        <button class="level__button_start">Старт</button>
      </div>
    `;
    if (gamePage) {
        gamePage.innerHTML = mainPage;
    }

    const startButton = document.querySelector(".level__button_start");
    const levelButtons = document.querySelectorAll(".choice__button");

    const levelButtonsArray = Array.from(levelButtons);

    for (const levelButton of levelButtonsArray) {
        levelButton.addEventListener("click", () => {
            levelButton.classList.toggle("choice__button-active");
            const isActive = levelButton.classList.contains(
                "choice__button-active",
            );

            for (const btn of levelButtonsArray) {
                if (btn !== levelButton) {
                    (btn as HTMLButtonElement).disabled = isActive;
                }
            }

            (startButton as Element).addEventListener("click", () => {
                if (levelButton.id === "easy-level") {
                    level = "easy";
                    if (gamePage) {
                        renderLevelPage({ gamePage });
                    }
                }

                if (levelButton.id === "medium-level") {
                    level = "medium";
                    if (gamePage) {
                        renderLevelPage({ gamePage });
                    }
                }
                if (levelButton.id === "hard-level") {
                    level = "hard";
                    if (gamePage) {
                        renderLevelPage({ gamePage });
                    }
                }
            });
        });
    }
}

renderMainPage();
