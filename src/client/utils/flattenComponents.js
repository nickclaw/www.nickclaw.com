import values from 'lodash/values';

export default function flattenComponents(routes) {
  return routes.reduce((memo, route) => {
    const components = route.component || values(route.components);
    return memo.concat(components);
  }, []);
}
