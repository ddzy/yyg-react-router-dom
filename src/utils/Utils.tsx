import * as PathToRegExp from 'path-to-regexp';
import { Location } from 'history';

import {
  IStaticMatchParams,
} from "../types";

export interface IStaticPathProps {
  path?: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
};


/**
 * 计算match
 * @param location Location
 */
export function computeMatchProcess(
  location: Location,
  options: IStaticPathProps,
): IStaticMatchParams | null {
  const { path } = options;

  const paths: string[] = new Array().concat(path);
  const pathname: string = location.pathname;

  // ** 计算regexp **
  return paths.reduce((total, current) => {
    // ** 如果匹配到了paths数组中的第一项, 直接返回 **
    if (total) {
      return total;
    }

    // ** 计算单个path **
    const {
      keys,
      reg,
    } = computePath(current, options);

    // ** 包含了 匹配后的path, 以及对应的参数值 **
    const matchedPath = pathname.match(reg);

    if (!matchedPath) {
      return null;
    }

    // TODO 计算url
    const [url, ...rest] = matchedPath;
    // TODO 计算params
    const params = keys.reduce((t, c, i) => {
      t[c.name] = rest[i];

      return t;
    }, {});
    // TODO 计算isExact
    const isExact = pathname === url;

    return {
      url,
      path: current,
      params,
      isExact,
    };
  }, null);
}


/**
 * 计算path-to-regexp
 * @param path 路径
 * @param options 配置项
 */
function computePath(
  path: string,
  options: IStaticPathProps,
): {
  keys: PathToRegExp.Key[],
  reg: RegExp,
} {
  const {
    sensitive = false,
    strict = false,
    exact = false,
  } = options;

  const keys: PathToRegExp.Key[] = [];
  const reg: RegExp = PathToRegExp(path, keys, {
    sensitive,
    strict,
    end: exact,
  });

  return {
    keys,
    reg,
  };
}
