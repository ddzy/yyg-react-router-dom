import * as React from 'react';
import {
  History,
  createBrowserHistory,
} from 'history';

import Router from './Router';


export interface IBrowserRouter {
  children: React.ReactNode,
  basename?: string;
  forceRefresh?: boolean;
  keyLength?: number;
  getUserConfirmation?: (
    message: string,
    callback: (result: boolean) => void,
  ) => void;
};


const BrowserRouter = React.memo<IBrowserRouter>((
  props: IBrowserRouter,
): JSX.Element => {

  const browserHistory: History = createBrowserHistory(props);
  Reflect.set(window, 'browserHistory', browserHistory);

  return (
    <Router history={browserHistory} children={props.children}  />
  );
});


export default BrowserRouter;