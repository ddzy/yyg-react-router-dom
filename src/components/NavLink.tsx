import * as React from 'react';
import {
  Location,
  LocationDescriptorObject,
} from 'history';

import {
  IStaticMatchParams,
  ARIA_CURRENT,
} from '../types';
import Route from './Route';
import Link from './Link';


export interface INavLinkProps extends React.HtmlHTMLAttributes<HTMLAnchorElement> {
  to: string | LocationDescriptorObject<{
    [key: string]: any,
  }>;
  activeClassName?: string;
  activeStyle?: React.HtmlHTMLAttributes<HTMLAnchorElement>;
  exact?: boolean;
  strict?: boolean;
  sensitive?: boolean;
  isActive?: (
    data: {
      location: Location,
      match: IStaticMatchParams,
    },
  ) => boolean;
  location?: Location;
  ariaCurrent?: ARIA_CURRENT;
  children?: React.ReactChild;
};


const NavLink = React.memo<INavLinkProps>((
  props: INavLinkProps,
): JSX.Element => {

  const {
    to, location, sensitive, strict,
    exact, activeStyle, activeClassName,
    children,
    ...rests
  } = props;

  // ** 格式化path **
  const path: string = to
      ? _isString(to)
        ? to
        : Reflect.get((to as LocationDescriptorObject<{
            [key: string]: any,
          }>), 'pathname')
    : '';

  function _isString(v: any): boolean {
    return typeof v === 'string';
  }

  return (
    <Route
      path={path}
      location={location}
      sensitive={sensitive}
      strict={strict}
      exact={exact}
      children={(p) => {
        const isActive = !!(p.match);
        const activeStyles = isActive ? activeStyle : {};
        const activeClassNames = isActive ? activeClassName : '';

        return (
          <Link
            {...rests}
            to={path}
            style={activeStyles}
            className={activeClassNames}
          >{children}</Link>
        );
      }}
    />
  );
});


export default NavLink;