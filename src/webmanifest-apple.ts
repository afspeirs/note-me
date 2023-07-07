const webmanifest = document.getElementById('webmanifest') as HTMLLinkElement;

if (navigator.userAgent.search('Mac') !== -1 && webmanifest) {
  webmanifest.href = '/manifest-apple.webmanifest';
}
