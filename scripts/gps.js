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

        function success(pos) {
            this.lon = pos.coords.longitude;
            this.lat = pos.coords.latitude;
        }

        function error(err) {
            console.error(`ERROR(${err.code}): ${err.message}`);
        }

        options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        this.observer = navigator.geolocation.watchPosition(success, error, options);
    }

    getlat() {
        return this.lat;
    }

    getLon() {
        return this.lon;
    }
}