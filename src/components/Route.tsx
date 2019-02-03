import * as React from 'react';
import {
  Location,
  createLocation,
} from 'history';

import RouterContext from './RouterContext';
import {
  IStaticRouteComponentParams,
  IStaticMatchParams,
} from '../types';
import { computeMatchProcess } from '../utils/Utils';


export interface IRouteProps {
  computedMatch?: IStaticMatchParams;
  location?: Location;
  component?: React.ComponentType<IStaticRouteComponentParams> | React.ComponentType<any>;
  render?: (props: IStaticRouteComponentParams) => React.ReactNode;
  children?: (props: IStaticRouteComponentParams) => React.ReactNode | React.ReactNode;
  path?: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
};


const Route = React.memo<IRouteProps>((
  props: IRouteProps,
): JSX.Element => {
  // ** 处理主进程 **
  function handleProcess(
    context: IStaticRouteComponentParams,
  ): JSX.Element {
    const location = handleLocationProcess(context);
    const match = handleMatchProcess(context, location);

    // ** 融合 **
    const composedContext = { ...context, match, location };

    return (
      <RouterContext.Provider
        value={composedContext}
      >
        {
          props.children
            ? props.children
              ? typeof props.children === 'function'
                ? props.children(composedContext as IStaticRouteComponentParams)
                : props.children
              : props.children
            : match
              ? props.component
                ? React.createElement(props.component, composedContext)
                : props.render
                  ? props.render(composedContext as IStaticRouteComponentParams)
                  : null
              : null
        }
      </RouterContext.Provider>
    );
  }

  // ** 处理location **
  function handleLocationProcess(
    context: IStaticRouteComponentParams,
  ): Location {
    return props.location
      ? props.location
      : context.location
        ? context.location
        : createLocation('/');
  }

  // ** 处理match **
  function handleMatchProcess(
    context: IStaticRouteComponentParams,
    location: Location,
  ) {
    return props.computedMatch
      ? props.computedMatch
      : props.path
        ? computeMatchProcess(location, props)
        : context.match;
  }

  return (
    <RouterContext.Consumer>
      {(context: IStaticRouteComponentParams) => {
        return handleProcess(context);
      }}
    </RouterContext.Consumer>
  );
});


export default Route;