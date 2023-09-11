import { renderResultPage } from "./result-page";
import { interval } from "./render-game-field";

export function useMainGameLogic({
    flippedCards,
    cardsInGame,
    doubleCardArray,
    gamePage,
}: {
    flippedCards: Element[];
    cardsInGame: string[];
    doubleCardArray: {
        rank: string;
        suit: string;
    }[];
    gamePage: Element;
}) {
    let gameWon: boolean = false;
    flippedCards.forEach((card: Element) => {
        card.classList.add("flipped");
    });

    setTimeout(() => {
        flippedCards.forEach((card: Element) => {
            card.innerHTML =
                '<img class="cards__shirt" src="static/рубашка.png" alt="рубашка"/>';
            card.classList.remove("flipped");
        });
    }, 5000);

    let firstCard: Element | null = null;
    let secondCard: Element | null = null;
    let firstCardRank: string | null = null;
    let firstCardSuit: string | null = null;
    let secondCardRank: string | null = null;
    let secondCardSuit: string | null = null;
    flippedCards.forEach((card) => {
        card.addEventListener("click", () => {
            const index = (card as HTMLElement).dataset.index;
            if (index) {
                card.innerHTML = cardsInGame[parseInt(index)];
            }
            card.classList.add("flipped");

            if (firstCard === null) {
                firstCard = card;
                if (index) {
                    firstCardRank = doubleCardArray[parseInt(index)].rank;
                    firstCardSuit = doubleCardArray[parseInt(index)].suit;
                }
            } else if (secondCard === null) {
                secondCard = card;
                if (index) {
                    secondCardRank = doubleCardArray[parseInt(index)].rank;
                    secondCardSuit = doubleCardArray[parseInt(index)].suit;
                }
            }

            if (firstCard !== null && secondCard !== null) {
                if (
                    firstCardRank === secondCardRank &&
                    firstCardSuit === secondCardSuit
                ) {
                    firstCard.classList.add("generated-card__matched");
                    secondCard.classList.add("generated-card__matched");
                    firstCard = null;
                    secondCard = null;
                }
            }

            if (firstCard !== null && secondCard !== null) {
                if (
                    firstCardRank !== secondCardRank ||
                    firstCardSuit !== secondCardSuit
                ) {
                    clearInterval(interval);
                    gameWon = false;
                    setTimeout(() => {
                        renderResultPage({ gamePage, gameWon });
                    }, 500);
                }
            }
            if (
                document.querySelectorAll(".generated-card.flipped").length ===
                cardsInGame.length
            ) {
                clearInterval(interval);
                gameWon = true;
                setTimeout(() => {
                    renderResultPage({ gamePage, gameWon });
                }, 500);
            }
        });
    });
}
