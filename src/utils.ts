
/**
 * Returns a randomized array
 *
 * @export
 * @param {Array<any>} array
 * @returns
 */
export function shuffle<T extends Array<any>>(array: T): T {
  return array.sort( () => .5 - Math.random() );
}
