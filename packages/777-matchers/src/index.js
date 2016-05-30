import matchers from './matchers';
import spyMatchers from './spy_matchers';

export function expect(actual) {
  const result = {not: {}};
  const allMatchers = {...matchers, ...spyMatchers};
  Object.keys(allMatchers).forEach(name => {
    result[name] = makeMatcher(allMatchers[name], false, actual);
    result.not[name] = makeMatcher(allMatchers[name], true, actual);
  });

  return result;
}

function makeMatcher(matcher, isNot, actual) {
  return function(expected) {
    const result = matcher.call(
      null,
      actual,
      expected,
      {isNot, args: arguments}
    );

    if (result) {
      throw new Error(result.message);
    }
  };
}
