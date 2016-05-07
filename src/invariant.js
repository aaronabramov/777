// @flow

export default function invariant(
  assertion: any,
  message: string = 'Invariant violation'
): void {
  if (!assertion) {
    throw new Error(message);
  }
}
