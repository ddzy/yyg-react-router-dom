import * as React from 'react';
import {
  LocationDescriptorObject,
  createLocation,
} from 'history';

import RouterContext from './RouterContext';
import { IStaticRouteComponentParams } from '../types';


export interface ILinkProps {
  to?: string | LocationDescriptorObject<{
    [key: string]: any,
  }>;
  replace?: boolean;
  innerRef?: (node: HTMLAnchorElement) => void;
  children?: React.ReactChild;
};


const Link = React.memo<ILinkProps>((
  props: ILinkProps,
): JSX.Element => {
  function handleProcess(
    context: IStaticRouteComponentParams,
  ): JSX.Element {
    const { to, replace, innerRef, children, ...others } = props;

    // ** 创建`href` **
    const href = (
      to
        ? _isString(to)
          ? context.history.createHref(createLocation(to, null, '', context.location))
          : context.history.createHref(to as LocationDescriptorObject<{
              [key: string]: any,
            }>)
        : ''
    ) as string;

    return (
      <a
        {...others}
        ref={innerRef}
        href={href}
        onClick={(e) => handleLinkClick(e, context, href, replace)}
      >{children}</a>
    );
  }

  function handleLinkClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    context: IStaticRouteComponentParams,
    href: string,
    replace?: boolean,
  ): void {
    // ** 排除特定事件 **
    if (
      e.button === 0
      && !_isDirtyClickEvent(e)
    ) {
      e.preventDefault();

      !replace
        ? context.history.push(href)
        : context.history.replace(href);
    }
  }

  function _isString(v: any): boolean {
    return typeof v === 'string';
  }

  function _isDirtyClickEvent(
    e: React.MouseEvent<HTMLAnchorElement>,
  ): boolean {
    return Reflect.get(e, 'ctrlKey')
      || Reflect.get(e, 'altKey')
      || Reflect.get(e, 'shiftKey');
  }

  return (
    <RouterContext.Consumer>
      {
        (context) => handleProcess(context as IStaticRouteComponentParams)
      }
    </RouterContext.Consumer>
  );
});


export default Link;