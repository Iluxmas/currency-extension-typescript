import { apikey } from './apikey.js'

type Codes = {
  success: boolean
  symbols?: {
    [key: string]: string
  }
}

type Ratio =  {
    base: string
    date: string
    rates: { 
      [key: string]: number
    }
    success: boolean
    timestamp: number
  
}

class Api {
  _baseURL: string
  _apikey: string

  constructor(url:string, key:string) {
    this._baseURL = url;
    this._apikey = key;
  }

  getCodes(): Promise<Codes> {

    return fetch(`${this._baseURL}/symbols`, {
      method: 'GET',
      headers: {
        "apikey": this._apikey,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`unable to load currency codes \nStatus: ${res.status}`);
    });

  }

  getRatio(src: string): Promise<Ratio> {

    return fetch(`${this._baseURL}/latest?base=${src}`, {
      method: 'GET',
      headers: {
        "apikey": this._apikey,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`unable to load data \nStatus: ${res.status}`);
    });
  }
}

const apiURL = "https://api.apilayer.com/fixer";
const ApiService = new Api(apiURL, apikey);

export default ApiService;