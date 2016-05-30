export function assertNoExpectedValue(expected) {
  if (expected) {
    throw new Error('this matcher does not accept arguments');
  }
}
