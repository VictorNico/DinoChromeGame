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
        let that = this;
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
            that.currentWeather = response.data.data[0];
            weather = that.getDecisionWeather();
            period = that.getDecisionPeriod();
            // console.log({weather,period})
            document.getElementById('validationDefault02').value = weather;
            document.getElementById('validationDefault03').value = period;
            if(weather.localeCompare("rain", undefined, { sensitivity: 'base' }) == 0){
                // console.log({a:document.getElementById('snow').innerHTML});
                if(!document.getElementById('snow').innerHTML.includes("<")){
                    let inner = `
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                    <div class="snowflake"></div>
                     `
                     document.getElementById('snow').innerHTML = inner;
                     // console.log({inner})
                }
            }else{
                document.getElementById('snow').innerHTML = "";
            }
            // console.log(response.data);
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