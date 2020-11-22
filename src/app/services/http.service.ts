import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILocation} from '../models/location';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = '/assets/data/data.json';
  private projectName = '/crownstack-assignment/';
  constructor(private httpClient: HttpClient) { }

  get(): Observable<ILocation[]> {
    return this.httpClient.get<ILocation[]>(window.location.origin + this.projectName + this.url);
  }

}
