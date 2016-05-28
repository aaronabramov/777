import matchers from './matchers';

export function expect(actual) {
  const result = {not: {}};
  Object.keys(matchers).forEach(name => {
    result[name] = makeMatcher(matchers[name], false, actual);
    result.not[name] = makeMatcher(matchers[name], true, actual);
  });

  return result;
}

function makeMatcher(matcher, isNot, actual) {
  return function(expected) {
    const result = matcher.call(null, actual, expected, {isNot});

    if (result) {
      throw new Error(result.message);
    }
  };
}
