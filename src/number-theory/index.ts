export function gcd(a: number, b: number) {
  if (Math.floor(a) !== a || Math.floor(b) !== b) {
    console.log({ a, b });
    throw Error('a and b must be integers');
  }
  if (a < 0) {
    a = Math.abs(a);
  }
  if (b < 0) {
    b = Math.abs(b);
  }
  while (a > 0 && b > 0) {
    if (a > b) {
      a %= b;
    } else {
      b %= a;
    }
  }
  return a + b;
}
