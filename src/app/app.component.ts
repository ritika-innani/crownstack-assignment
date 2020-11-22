import { Component } from '@angular/core';
import {NavigationEnd, Router, Event} from '@angular/router';
import {LocationService} from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  route: string;
  locations: string[];
  constructor(private router: Router,
              private locationService: LocationService) {
    this.route = router.url;
    this.locationService.getLocations().subscribe((data) => {
      this.locations = data;
    });
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.route = router.url;
      }
    });
  }
}
