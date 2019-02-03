import * as React from 'react';
import {
  Location,
} from 'history';

import RouterContext from './RouterContext';
import {
  IStaticRouteComponentParams,
  IStaticMatchParams,
} from '../types';
import { computeMatchProcess } from '../utils/Utils';


export interface ISwitchProps {
  location?: Location;
  children: React.ReactNode;
};


const Switch = React.memo<ISwitchProps>((
  props: ISwitchProps,
): JSX.Element => {
  function handleProcess(
    context: IStaticRouteComponentParams,
  ): JSX.Element {

    // ** 计算location **
    const location = handleComputeLocation(context);
    // ** 计算Route, 即为渲染出来的组件 **
    const node = handleComputeRoute(location);

    return (
      <React.Fragment>
        {node}
      </React.Fragment>
    );
  }

  function handleComputeLocation(
    context: IStaticRouteComponentParams,
  ): Location {
    return props.location
      ? props.location
      : context.location;
  }

  function handleComputeRoute(
    location: Location,
  ): React.ReactNode {
    let [node, match]: [React.ReactElement<any>, IStaticMatchParams | null] = [
      React.createElement(''),
      null
    ];

    props.children && React.Children.forEach(
      props.children,
      (child) => {
        if (!match && React.isValidElement(child)) {
          node = child;

          const childProps = child.props;
          const path = Reflect.get(childProps, 'path');

          match = path ? computeMatchProcess(location, childProps) : null;
        }
      }
    );

    return match
      ? React.cloneElement<{
        location: Location,
        computedMatch: IStaticMatchParams
      }>(node, {
        location,
        computedMatch: match,
      })
      : null;
  }

  return (
    <RouterContext.Consumer>
      {(context) => (
        handleProcess(context as IStaticRouteComponentParams)
      )}
    </RouterContext.Consumer>
  );
});


export default Switch;