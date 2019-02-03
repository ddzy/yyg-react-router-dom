import * as React from 'react';

// ** 使用react-16提供的createContext API **
function createRouterContext(name: string) {
  const context = React.createContext({});

  context.displayName = name;

  return context;
}

export default createRouterContext('Router');