export default function ([key, value]: [string, string]) {
  const keySplit = key.toLowerCase().split("-");
  const keyParsed = keySplit.reduce((accumulator, current, index) => {
    if (index === 0) return accumulator += current;

    const len = current.length;
    const firstLetter = current[0].toUpperCase();
    const key = firstLetter + current.slice(1, len);

    return accumulator += key;
  });

  return {
    key: keyParsed,
    value,
  };
}
