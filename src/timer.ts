class Timer {

    private seconds = 0;
    private minutes = 0;
    private hours = 0;
    private timerId: number = 0;
    private triggered = new Date();

    private s: HTMLElement = document.getElementById('seconds')!;
    private m: HTMLElement = document.getElementById('minutes')!;
    private h: HTMLElement = document.getElementById('hours')!;

    public start = (d: Date) => {
        this.triggered = d;
        this.startTimer();
    }

    public stop = () => {
        this.stopTimer();
    }

    private startTimer = () => {
        this.timerId = setInterval(() => {

            // Find the elaspe between now and when timer was triggered
            const elapsed = Date.now() - this.triggered.getTime();

            /* Based on W3 Schools https://www.w3schools.com/howto/howto_js_countdown.asp */
            // Time calculations for days, hours, minutes and seconds
            // this.days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
            this.hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

            // Extra step needed to prefix 0 on single digit sec, min, hours
            this.s.textContent = this.seconds < 10 ? `0${this.seconds}` : `${this.seconds}`;
            this.h.textContent = this.hours < 10 ? `0${this.hours}` : `${this.hours}`;
            this.m.textContent = this.minutes < 10 ? `0${this.minutes}` : `${this.minutes}`;

        }, 1000);
    }

    private stopTimer = () => {
        clearInterval(this.timerId);
    }
}

export { Timer };
