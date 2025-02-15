import { createPathMatcher, type PathMatcherParam } from '../deps.ts';
import { FreshContext } from 'fresh';

export type RouteMatcherParam = PathMatcherParam;

/**
 * Returns a function that accepts a `Request` object and returns whether the request matches the list of
 * predefined routes that can be passed in as the first argument.
 *
 * You can use glob patterns to match multiple routes or a function to match against the request object.
 * Path patterns and regular expressions are supported, for example: `['/foo', '/bar(.*)'] or `[/^\/foo\/.*$/]`
 * For more information, see: https://clerk.com/docs
 */
export const createRouteMatcher = (routes: RouteMatcherParam) => {
  const matcher = createPathMatcher(routes);
  return (context: FreshContext) => {
    return matcher(context.url.pathname);
  };
};
