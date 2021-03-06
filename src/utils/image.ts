export function convertJPG(data: string = "") {
  return `data:image/jpeg;base64,${data}`;
}

const BASE64_MARKER = ";base64,";

export function convertDataURIToBlob(dataURI) {
  // Validate input data
  if (!dataURI) return;

  // Convert image (in base64) to binary data
  const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  const base64 = dataURI.substring(base64Index);
  const raw = window.atob(base64);
  const rawLength = raw.length;
  const array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }

  // Create and return a new blob object using binary data
  return new Blob([array], { type: "image/jpg" });
}

export function convertFrameToImageSource(frame: string) {
  const imageSource = convertJPG(frame);
  const imageBlob = convertDataURIToBlob(imageSource);
  const url = URL.createObjectURL(imageBlob);
  return url;
}
