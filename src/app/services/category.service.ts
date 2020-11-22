import {Injectable} from '@angular/core';
import {ILocation} from '../models/location';
import {Subject} from 'rxjs';
import {HttpService} from './http.service';
import {IBranch} from '../models/branch';
import {ICategory} from '../models/category';
import {ISubcategory} from '../models/subcategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private locationMap = {};
  private loadDataSub = new Subject<any>();
  loadDataObservable = this.loadDataSub.asObservable();
  isDataLoaded = false;

  constructor(private httpService: HttpService) {
    this.loadData();
  }

  private emitLoadDataSuccess(): void {
    this.loadDataSub.next();
  }

  private loadData(): void {
    this.httpService.get().subscribe((data: ILocation[]) => {
      data.forEach((location: ILocation) => {
        location.branchMap = {};
        location.branches.forEach((branch: IBranch) => {
          location.branchMap[branch.name] = branch;
        });
        this.locationMap[location.name] = location;
      });
      this.isDataLoaded = true;
      this.emitLoadDataSuccess();
    }, (e) => {
      console.log('error occured while loading data ', e);
    });
  }

  getCategories(location: string, branch?: string, category?: string): Array<ICategory | ISubcategory> {
    if (location && branch && category) {
      return this.getSubCategories(location, branch, category);
    }
    if (location && branch) {
      return this.getCategoriesByBranch(location, branch);
    }
    if (location) {
      return this.getCategoriesByLocation(location);
    }
    return [];
  }

  getCategoriesByBranch(location: string, branch: string): Array<ICategory> {
    return this.locationMap[location].branchMap[branch].categories;
  }

  getCategoriesByLocation(location: string): Array<ICategory> {
    const branches = this.locationMap[location].branches;
    const categories: Array<ICategory> = [];
    branches.forEach((branch) => {
      categories.push(...branch.categories);
    });
    return this.removeRepeatedItem(categories, (a, b) => a.name === b.name);
  }

  getSubCategories(location: string, branch: string, category: string): Array<ISubcategory> {
    const categories = this.locationMap[location].branchMap[branch].categories;
    const filtered = categories.filter((item: ICategory) => {
      return item.name === category;
    });
    return filtered[0].subcategories;
  }

  getBranchesByLocation(location: string): Array<string> {
    return this.locationMap[location].branches.map(item => item.name);
  }

  private removeRepeatedItem(arr, fn): ICategory[] {
    return arr.reduce((acc, v) => {
      if (!acc.some(x => fn(v, x))) {
        acc.push(v);
      }
      return acc;
    }, []);
  }
}
