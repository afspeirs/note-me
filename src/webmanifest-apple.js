const webmanifest = document.getElementById('webmanifest');

if (navigator.userAgent.search('Mac') !== -1 && webmanifest) {
  webmanifest.href = '/manifest-apple.webmanifest';
}