/**
 * @Class Weather
 * Uses Open-Meteo API — free, no API key required
 * https://open-meteo.com/
 */
class Weather {
    constructor() {
        this.gps = new GPS();
        this.currentWeather = null;
        this.interval = null;

        // WMO weather code groups
        this.rainCodes    = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86];
        this.rainsunCodes = [95, 96, 99];
        // everything else (0,1,2,3,45,48…) → "sun"

        this.getCurrentWeather();
    }

    async getCurrentWeather() {
        const url = new URL('https://api.open-meteo.com/v1/forecast');
        url.searchParams.set('latitude',     this.gps.getLat());
        url.searchParams.set('longitude',    this.gps.getLon());
        url.searchParams.set('current',      'weather_code,temperature_2m,is_day');
        url.searchParams.set('forecast_days', '1');

        await fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                const c = data.current;
                // Keep the same interface expected by game.env.js
                this.currentWeather = {
                    temp:    Math.round(c.temperature_2m),
                    weather: { code: c.weather_code },
                    is_day:  c.is_day
                };
                weather = this.getDecisionWeather();
                period  = this.getDecisionPeriod();
                document.getElementById('validationDefault02').value = weather;
                document.getElementById('validationDefault03').value = period;
                setSnowflakes(weather.includes("rain"));
            })
            .catch(error => {
                console.error('Weather fetch error:', error);
            });
    }

    getDecisionWeather() {
        const code = this.currentWeather.weather.code;
        if (this.rainsunCodes.includes(code)) return "rain,sun";
        if (this.rainCodes.includes(code))    return "rain";
        return "sun";
    }

    getDecisionPeriod() {
        return this.currentWeather.is_day === 1 ? 'd' : 'n';
    }
}