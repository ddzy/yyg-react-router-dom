import * as React from 'react';
import HoistStatics from 'hoist-non-react-statics';

import Route from './Route';


export interface IWithRouterProps {
  wrappedComponentRef?: React.RefObject<any>;
};

const withRouter = (
  wrappedComponent: any,
) => {
  const enhancedComponent = (props: IWithRouterProps) => {
    return (
      <Route
        children={(routeProps) => (
          React.cloneElement(wrappedComponent, {
            ...props,
            ...routeProps,
          })
        )}
      />
    );
  }

  return HoistStatics(enhancedComponent, wrappedComponent);
}


export default withRouter;