import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ResponseInterface} from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = environment.url
  apiKey = environment.apiKey

  constructor(private http: HttpClient) {
  }

  getBreed() {
    return this.http.get<ResponseInterface>(`${this.url}/breeds?${this.apiKey}`)
  }

}
