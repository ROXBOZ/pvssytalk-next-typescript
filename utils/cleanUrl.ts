export const cleanUrl = (url: string) => {
  if (url.startsWith("http://www.")) {
    url = url.slice(11);
  } else if (url.startsWith("http://")) {
    url = url.slice(7);
  } else if (url.startsWith("https://www.")) {
    url = url.slice(12);
  } else if (url.startsWith("https://")) {
    url = url.slice(8);
  } else if (url.startsWith("www.")) {
    url = url.slice(4);
  }

  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }

  return url;
};
