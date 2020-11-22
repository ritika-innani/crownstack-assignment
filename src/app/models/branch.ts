import {ICategory} from './category';

export interface IBranch {
  branch_id: string;
  categories: Array<ICategory>;
  name: string;
}
