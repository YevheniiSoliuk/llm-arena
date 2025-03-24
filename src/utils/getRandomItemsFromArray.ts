export function getRandomItemsFromArray<T>(arr: T[], numOfItems: number) {
  const randomItemsIndexes: number[] = [];

  const firstIndex = Math.floor(Math.random() * arr.length);
  randomItemsIndexes.push(firstIndex);

  for (let numOfItem = 0; numOfItem < numOfItems - 1; numOfItem++) {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * arr.length);
    } while (randomItemsIndexes.includes(nextIndex));
    randomItemsIndexes.push(nextIndex);
  }

  return randomItemsIndexes.map((index) => arr[index]);
}
