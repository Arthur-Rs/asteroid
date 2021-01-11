export default function (bytes: number) {
  const idBytes = new Uint8Array(bytes);

  for (let index = 0; index < bytes; index++) {
    const bytes = Math.floor(Math.random() * 98);
    idBytes[index] = 34 + bytes;
  }

  return String.fromCharCode(...idBytes);
}
