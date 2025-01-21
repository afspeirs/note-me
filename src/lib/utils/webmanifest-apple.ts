const webmanifest = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;

if (import.meta.env.PROD && navigator.userAgent.search('Mac') !== -1 && webmanifest) {
  webmanifest.href = '/site-apple.webmanifest';
}
