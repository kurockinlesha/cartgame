export let minutes = 0;
export let seconds = 0;

export function useTimer({
    secondsElement,
    minutesElement,
}: {
    secondsElement: Element;
    minutesElement: Element;
}) {
    seconds++;
    const zeroPlusSeconds = seconds <= 9 ? "0" + seconds : seconds.toString();
    secondsElement.innerHTML = zeroPlusSeconds;

    if (seconds > 59) {
        minutes++;
        const zeroPlusMinutes =
            minutes <= 9 ? "0" + minutes : minutes.toString();
        minutesElement.innerHTML = zeroPlusMinutes;
        seconds = 0;
        secondsElement.innerHTML = "0" + seconds;
    }
}

export function resetTimer(interval: NodeJS.Timeout) {
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
}
