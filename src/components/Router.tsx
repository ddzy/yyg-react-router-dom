import * as React from 'react';
import {
  History,
  Location,
} from 'history';

import RouterContext from './RouterContext';
import {
  IStaticMatchParams,
} from '../types';


export interface IRouterProps {
  children: React.ReactNode;
  history: History;
};
interface IRouterState {
  match: IStaticMatchParams,
  location: Location,
};


const Router = React.memo<IRouterProps>((
  props: IRouterProps,
): JSX.Element => {
  const [state, setState] = React.useState<IRouterState>({
    match: {
      params: {},
      path: '/',
      url: '/',
      isExact: false,
    },
    location: {
      key: '',
      pathname: '/',
      search: '',
      hash: '',
      state: {},
    },
  });

  // ** 设置初始的location **
  React.useEffect(() => {
    setState({
      match: {
        ...state.match,
        isExact: props.history.location.pathname === '/',
      },
      location: props.history.location,
    });
  }, [props.history]);

  React.useEffect(() => {
    // ** 监听url **
    const unListen = props.history.listen((location) => {
      // ** 设置新的location **
      setState({
        ...state,
        location,
      })
    });

    return () => {
      unListen();
    };
  }, []);

  return (
    <RouterContext.Provider
      children={props.children}
      value={{
        ...state,
        history: props.history,
      }}
    />
  );
});


export default Router;