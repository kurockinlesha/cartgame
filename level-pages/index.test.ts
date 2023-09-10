/**
 * @jest-environment jsdom
 */
import { describe, expect, test } from "@jest/globals";
import { shuffleCardsArray } from "./shuffled-function";
import { useLogicOfTimer, minutes, seconds, resetTimer } from "./timer";
import { interval } from "./render-game-field";

describe("shuffleCardsArray", () => {
    test("the original array is not equal to the shuffled one", () => {
        const array = [
            { rank: "A", suit: "spades" },
            { rank: "K", suit: "hearts" },
            { rank: "Q", suit: "clubs" },
        ];
        const originalArray = [...array];
        const shuffledArray = shuffleCardsArray(array);
        expect(shuffledArray).not.toBe(originalArray);
    });
});

describe("useLogicOfTimer", () => {
    beforeEach(() => {
        resetTimer(interval);
    });

    test("when seconds are 60 the value of minutes changes to 1 ", () => {
        for (let i = 0; i < 60; i++) {
            useLogicOfTimer();
        }
        useLogicOfTimer();
        expect(minutes).toEqual(1);
    });

    test("when seconds are 60 the value of seconds changes to 0 ", () => {
        for (let i = 0; i < 60; i++) {
            useLogicOfTimer();
        }
        expect(seconds).toEqual(0);
    });
});
