import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../services/location.service';
import {ILocation} from '../../models/location';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  locations: Array<ILocation>;

  constructor(private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.locationService.getLocationsWithBranches().subscribe((data: ILocation[]) => {
      this.locations = data;
    }, (e) => {
      console.log('Error ', e);
    });
  }

}
