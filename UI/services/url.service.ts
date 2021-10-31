import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
 
short:any;
  constructor(private HttpClient:HttpClient) { }

  posturl(fullurl:any){
    let url = "http://localhost:3000/shorturl";
   this.short=this.HttpClient.post(url,fullurl,{responseType: 'text' });
    return this.HttpClient.post(url,fullurl,{responseType: 'text' });
  }

  geturl(url:string){
    let urll = url;
    return this.HttpClient.get(urll);
  }


}
