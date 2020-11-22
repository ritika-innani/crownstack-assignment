import {Injectable} from '@angular/core';
import {ILocation} from '../models/location';
import {Observable, of} from 'rxjs';
import {HttpService} from './http.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpService: HttpService) {
  }

  getLocations(): Observable<string[]> {
    return this.httpService.get()
        .pipe(map(res => {
              return res.map(item => item.name);
            }),
            catchError((error) => {
              console.log('ERROR: ', error);
              return of(error);
            })
        );
  }

  getLocationsWithBranches(): Observable<ILocation[]> {
    return this.httpService.get()
        .pipe(map(res => {
              return res.map((item) => {
                return {
                  name: item.name,
                  branches: item.branches.map(branch => branch.name)
                };
              });
            }),
            catchError((error) => {
              console.log('ERROR: ', error);
              return of(error);
            })
        );
  }
}
