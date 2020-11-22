import {IBranch} from './branch';

export interface ILocation {
  name: string;
  dealers_id: string;
  opco: string;
  branches: Array<IBranch>;
  branchMap?: object;
}
