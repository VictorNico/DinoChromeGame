/**
 * @Class Weather
 * Build within Weather API from Weatherbit.io solutions
 */
class Weather {
    /**
     * @Constructor
     * return an instance of weather
     */
    constructor() {
        this.gps = new GPS();
        this.currentWeather = null;
        this.interval = null;
        this.rain = [200, 201, 202, 500, 501, 502, 511, 520, 521, 522];
        this.drizzle = [230, 231, 232, 300, 301, 302];
        this.snow = [600, 601, 602, 610];
        this.hail = [233];
        this.clearSky = [800];
        this.fewCloud = [801];
        this.scatteredCloud = [802];
        this.overcastCloud = [804];
        this.unknPrecipitation = [900];
    }

    /**
     * @Methods
     * @param lon, longitude
     * @param lat, lattitude
     * 
     * @return 
     *          rain if the current weather is as rainning
     *          sun else
     */
    async getCurrentWeather() {
        /**
         * raining code are:
         * 200,201,202,500,501,502,511,520,521,522,
         * drizzle code are:
         * 230,231,232,300,301,302,
         * hail code are:
         * 233,
         * snow code are :
         * 600, 601,602,610, 
         * Clear sky code:
         * 800
         * Few clouds ode:
         * 801
         * Scattered clouds:
         * 802
         * Broken clouds:
         * 803
         * Overcast clouds:
         * 804
         * Unknown Precipitation:
         * 900
         */
        const options = {
            method: 'GET',
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
            params: {
                lon: `${this.gps.getLon()}`,
                lat: `${this.gps.getLat()}`
            },
            headers: {
                'X-RapidAPI-Key': window.atob("NjM4MjNmY2ZiOG1zaGE0ZGM5OTYwZGFmZTFlNHAxYzlhMDRqc25hZDY4MzZmMjZiNjI="),
                'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
            }
        };

        await axios.request(options).then(function(response) {
            this.currentWeather = response.data;
            console.log(response.data);
        }).catch(function(error) {
            console.error(error);
        });
    }

    async Watcher() {
        this.interval = setInterval(await this.getCurrentWeather, 10000);
    }

    getDecisionWeather() {
        if (this.rain.includes(this.currentWeathe.weather.code)) { return "rain"; } else if (this.drizzle.includes(this.currentWeathe.weather.code)) { return "drizzle"; } else if (this.snow.includes(this.currentWeathe.weather.code)) { return "snow"; } else if (this.hail.includes(this.currentWeathe.weather.code)) { return "hail"; } else if (this.clearSky.includes(this.currentWeathe.weather.code)) { return "clearSky"; } else if (this.fewCloud.includes(this.currentWeathe.weather.code)) { return "fewCloud"; } else if (this.scatteredCloud.includes(this.currentWeathe.weather.code)) { return "scatteredCloud"; } else if (this.overcastCloud.includes(this.currentWeathe.weather.code)) { return "overcastCloud"; } else if (this.unknPrecipitation.includes(this.currentWeathe.weather.code)) { return "unknPrecipitation"; }
        return "clearSky";
    }
}