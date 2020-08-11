import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RequestServiceService {

  constructor(private http: HttpClient) { }


  async request(correct, incorrect, method, path, body, head){
    console.log(path);
    console.log(body);

    switch(method){
      case 'GET' :{
        this.http.get(environment.URL_BACK+path,body).subscribe(async response => {
          console.log(response);
          correct(response);
        },
        async error => {
          incorrect(error);
        });
        return "";
      }
      case "POST": {
        
        return this.http.post(environment.URL_BACK+path,body).subscribe((response) => {
          console.log(response);
          correct(response);
        },
        async error => {
          console.log(error);
          incorrect(error);
        });
      }
      case 'PUT' : {
        console.log("##################");
        console.log(environment.URL_BACK+path);
        return this.http.put(environment.URL_BACK+path,body).subscribe( (response) => {
          console.log(response);
          correct(response);
        },
        async error => {
          console.log(error);
          incorrect(error);
        });
      }
      case 'DELETE' : {
        
        return this.http.delete(environment.URL_BACK+path, body).subscribe(async response => {
          correct(response);
        },
        async error => {
          incorrect(error);
        })
      }
    }
  }
}
