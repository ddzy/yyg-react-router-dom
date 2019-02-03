import { History, Location, } from 'history';

export interface IStaticMatchParams {
  params: {
    [key: string]: string,
  };
  isExact: boolean;
  path: string;
  url: string;
}

export interface IStaticRouteComponentParams {
  history: History,
  location: Location,
  match: IStaticMatchParams,
};