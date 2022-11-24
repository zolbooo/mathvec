export function stripZeros(coefs: readonly number[]): number[] {
  let index = coefs.length - 1;
  while (index >= 0) {
    if (coefs[index] !== 0) {
      break;
    }
    index -= 1;
  }
  return index === -1 ? [] : coefs.slice(0, index + 1);
}
