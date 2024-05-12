const webmanifest = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;

if (import.meta.env.PROD && window.navigator.userAgent.search('Mac') !== -1 && webmanifest) {
  webmanifest.href = '/manifest-apple.webmanifest';
}
