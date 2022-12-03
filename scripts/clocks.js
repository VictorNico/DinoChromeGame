class clocks {
    constructor() {}
    getTime() {
        var date = new Date();
        var options = {
            weekday: "short",
            year: "numeric",
            month: "2-digit",
            day: "numeric",
        };

        /*console.log(
            date.toLocaleDateString("en", options));*/
        let lonn = date.toLocaleDateString("en", options)
        return  lonn+ " "+ date.getHours()+":"+date.getMinutes();
    }
}