/**
 * Returns a random subset of elements from the input array.
 *
 * @param The array to pick random elements from.
 * @param The number of random elements to return.
 * @returns A new array containing the random subset of elements.
 * @throws If `arr` is not an array or `num` is not a valid number.
 */
export function getMultipleRandom<T>(arr: T[], num: number): T[] {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array.");
  }

  if (num < 0 || num > arr.length) {
    throw new Error(
      "Number of elements to pick must be a non-negative number less than or equal to the length of the array."
    );
  }

  // Shuffle the array using the Fisher-Yates algorithm for better randomness
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, num);
}
