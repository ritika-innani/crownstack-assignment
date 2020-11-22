import {ISubcategory} from './subcategory';

export interface ICategory {
  name: string;
  image: string;
  subcategories: Array<ISubcategory>;
}
