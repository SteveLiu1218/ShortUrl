import { bitlyPara } from '../Model/bitlyPara';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitlyService {

  constructor(private http: HttpClient) { }

  shortUrl(longUrl: string): Observable<{ link: string }> {
    return this.http.post<{ link: string }>( //"link": "string" API 參數
      `${bitlyPara.api}/v4/shorten`, //Call 的方法參考 https://dev.bitly.com/
      { long_url: longUrl }, //long_url 為 bitly官方定義
      {
        headers: {
          Authorization: `Bearer ${bitlyPara.token}`, //token為bitly申請的時候給的
          "Content-type": "application/json"
        }
      }
    )
  }
}
