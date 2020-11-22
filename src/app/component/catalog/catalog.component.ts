import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ICategory} from '../../models/category';
import {CategoryService} from '../../services/category.service';
import {ISubcategory} from '../../models/subcategory';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  catalog: Array<ICategory> | Array<ISubcategory>;
  location: string;
  branch: string;
  category?: string;
  locationBranches: string[];
  imagesPath: string;
  colspan = 4;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private snackBar: MatSnackBar) {
    this.imagesPath = environment.baseUrl + '/assets/images/category/';
  }

  ngOnInit(): void {
    this.loadData();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (window.innerWidth <= 720) {
      this.colspan = 2;
    } else {
      this.colspan = 4;
    }
  }

  back(): void {
    if (this.location && this.branch && this.category) {
      this.router.navigate(['/catalog', {location: this.location, branch: this.branch}]);
    } else if (this.location && this.branch) {
      this.router.navigate(['/catalog', {location: this.location}]);
    } else {
      this.router.navigate(['']);
    }
  }

  loadData(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.location = params.get('location');
      this.branch = params.get('branch');
      this.category = params.get('category');
      if (this.categoryService.isDataLoaded) {
        this.fetchData();
      } else {
        this.categoryService.loadDataObservable.subscribe(() => {
          this.fetchData();
        });
      }
    });
  }

  fetchData(): void {
    this.catalog = this.categoryService.getCategories(this.location, this.branch, this.category);
    if (!this.branch) {
      this.locationBranches = this.categoryService.getBranchesByLocation(this.location);
    }
  }

  navigateToSubCategory(category: string): void {
    if (!this.branch) {
      this.showMessage('Please select a branch to get subcategories');
    } else {
      this.router.navigate(['/catalog', {location: this.location, branch: this.branch, category}]);
    }
  }

  showMessage(message): void {
    this.snackBar.open(message, null, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

}
