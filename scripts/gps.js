class GPS {
    constructor() {
        this.lon = 0.0;
        this.lat = 0.0;
        this.observer = null;
        this.Watcher();
    }

    Watcher() {
        let id;
        let options;
        let that = this;

        function success(pos) {
            that.lon = pos.coords.longitude;
            that.lat = pos.coords.latitude;
        }

        function error(err) {
            console.error(`ERROR(${err.code}): ${err.message}`);
        }

        options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        this.observer = navigator.geolocation.getCurrentPosition(success, error, options);
    }

    getLat() {
        return this.lat;
    }

    getLon() {
        return this.lon;
    }
}