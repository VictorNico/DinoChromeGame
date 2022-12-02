class clocks {
    constructor() {}
    getTime() {
        var date = new Date();
        var options = {
            weekday: "short",
            year: "numeric",
            month: "2-digit",
            day: "numeric",
            minutes: "2-digit",
            hour: "2-digit",
            second: "2-digit",
            hour12: true,
        };

        console.log(
            date.toLocaleDateString("en", options));
        return date.toLocaleDateString("en", options);
    }
    setEnvClock(cxtx, textsize, x, y) {
        ctx.font = textsize + "px Arial";
        ctx.fillText(this.getTime(), x, y);
    }
}