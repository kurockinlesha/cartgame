export let minutes = 0;
export let seconds = 0;

export function useTimer({
    secondsElement,
    minutesElement,
}: {
    secondsElement: Element;
    minutesElement: Element;
}) {
    useLogicOfTimer();
    secondsElement.innerHTML = zeroPlusSeconds;
    minutesElement.innerHTML = zeroPlusMinutes;
}
let zeroPlusSeconds: string = "00";
let zeroPlusMinutes: string = "00";

export function useLogicOfTimer() {
    seconds++;
    zeroPlusSeconds = seconds <= 9 ? "0" + seconds : seconds.toString();

    if (seconds > 59) {
        minutes++;
        zeroPlusMinutes = minutes <= 9 ? "0" + minutes : minutes.toString();
        seconds = 0;
        zeroPlusSeconds = seconds <= 9 ? "0" + seconds : seconds.toString();
    }
    return seconds;
}

export function resetTimer(interval: NodeJS.Timeout) {
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
}
