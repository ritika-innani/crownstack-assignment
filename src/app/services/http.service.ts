import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILocation} from '../models/location';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = '/assets/data/data.json';
  constructor(private httpClient: HttpClient) { }

  get(): Observable<ILocation[]> {
    return this.httpClient.get<ILocation[]>(environment.baseUrl + this.url);
  }

}
