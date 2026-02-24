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
        this.rain = [500, 501, 502, 511, 520, 521, 522, 300, 301, 302];
        this.rainsun = [200, 201, 202]
        this.drizzle = [230, 231, 232,233,611,612,700,711,721,731,741,751,];
        this.snow = [600, 601, 602, 610];
        this.clearSky = [800];
        this.fewCloud = [801];
        this.scatteredCloud = [802];
        this.overcastCloud = [804];
        this.unknPrecipitation = [900];
        this.getCurrentWeather()
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
        let that = this;
        const url = new URL('https://weatherbit-v1-mashape.p.rapidapi.com/current');
        url.searchParams.set('lon', this.gps.getLon());
        url.searchParams.set('lat', this.gps.getLat());

        await fetch(url, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': window.atob("NjM4MjNmY2ZiOG1zaGE0ZGM5OTYwZGFmZTFlNHAxYzlhMDRqc25hZDY4MzZmMjZiNjI="),
                'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            that.currentWeather = data.data[0];
            weather = that.getDecisionWeather();
            period = that.getDecisionPeriod();
            // console.log({weather,period})
            document.getElementById('validationDefault02').value = weather;
            document.getElementById('validationDefault03').value = period;
            setSnowflakes(weather.includes("rain"));
        }).catch(function(error) {
            console.error(error);
        });
    }

    async Watcher() {
        this.interval = setInterval(await this.getCurrentWeather, 10000);
    }

    getDecisionWeather() {
        if (this.rain.includes(this.currentWeather.weather.code)) { return "rain"; } 
        else if (this.drizzle.includes(this.currentWeather.weather.code)) { return "sun"; } 
        else if (this.snow.includes(this.currentWeather.weather.code)) { return "rain"; } 
        else if (this.rainsun.includes(this.currentWeather.weather.code)) { return "rain,sun"; } 
        else if (this.clearSky.includes(this.currentWeather.weather.code)) { return "sun"; } 
        else if (this.fewCloud.includes(this.currentWeather.weather.code)) { return "sun"; } 
        else if (this.scatteredCloud.includes(this.currentWeather.weather.code)) { return "sun"; } 
        else if (this.overcastCloud.includes(this.currentWeather.weather.code)) { return "sun"; } 
        else if (this.unknPrecipitation.includes(this.currentWeather.weather.code)) { return "rain"; }
        return "rain";
    }

    getDecisionPeriod(){
        return this.currentWeather.pod;
    }
}