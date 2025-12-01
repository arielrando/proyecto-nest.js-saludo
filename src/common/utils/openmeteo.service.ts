import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { fetchWeatherApi } from 'openmeteo';

interface SunHoursResult {
  sunrise: Date[];
  sunset: Date[];
  welcomeType: number;
}

@Injectable()
export class OpenmeteoService {
  private latitude: number;
  private longitude: number;

  constructor() {
    this.latitude = Number(process.env.LATITUDE);
    this.longitude = Number(process.env.LONGITUDE);
  }

  setCoordinates(latitude: number, longitude: number): void {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  private saveTime(time: number, flag: number, res: Response): boolean {
    const body = `{"nextSunTime":${time},"welcomeType":${flag}}`;
    res.cookie('nextSunTime', body, {
      maxAge: 1000 * 60 * 60 * 24, // 1 día
      httpOnly: true, // no accesible por JS del cliente
    });
    return true;
  }

  async getSunHours(res: Response): Promise<SunHoursResult> {
    const timezone: string = process.env.TIMEZONE || 'INCORRECT_TIMEZONE';
    const urlOpenMeteo: string = process.env.URLOPENMETEO || 'INCORRECT_URL';

    const today = new Date().toLocaleDateString('en-CA', { timeZone: timezone });
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      dateStyle: 'short',
      timeStyle: 'medium',
      hour12: false,
    }).format(new Date());
    const now = new Date(formatter);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toLocaleDateString('en-CA', { timeZone: timezone });

    const params = {
      latitude: this.latitude,
      longitude: this.longitude,
      daily: ['daylight_duration', 'sunrise', 'sunset'],
      hourly: 'temperature_2m',
      timezone: 'auto',
      start_date: today,
      end_date: tomorrowStr,
    };

    const responses = await fetchWeatherApi(urlOpenMeteo, params);
    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const daily = response.daily()!;
    const sunrise = daily.variables(1)!;
    const sunset = daily.variables(2)!;

    const weatherData = {
      daily: {
        sunrise: [...Array(sunrise.valuesInt64Length())].map(
          (_, i) =>
            new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000),
        ),
        sunset: [...Array(sunset.valuesInt64Length())].map(
          (_, i) =>
            new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000),
        ),
      },
    };

    const tNow = now.getTime();
    const tSunrise = weatherData.daily.sunrise[0].getTime();
    const tSunset = weatherData.daily.sunset[0].getTime();
    const tSunriseTomorrow = weatherData.daily.sunrise[1].getTime();

    const noon = new Date(now);
    noon.setHours(12, 0, 0, 0);
    const tNoon = noon.getTime();

    const welcomeType: 1 | 2 | 3 =
      tNow >= tSunrise && tNow < tNoon
        ? 1
        : tNow >= tNoon && tNow < tSunset
          ? 2
          : 3;

    switch (welcomeType) {
      case 1:
        this.saveTime(tNoon, 1, res);
        break;
      case 2:
        this.saveTime(tSunset, 2, res);
        break;
      case 3:
        this.saveTime(tSunriseTomorrow, 3, res);
        break;
    }

    const result = {
      ...weatherData.daily,
      welcomeType,
    };

    return result;
  }
}
