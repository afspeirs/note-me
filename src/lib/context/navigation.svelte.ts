export const mobileWidth = 1024;

export const sidebarOpen = $state({
  value: false,
  set(value: boolean) {
    this.value = value;
  },
  toggle() {
    this.value = !this.value;
  },
});

export const sidebarUseMobile = $state({
  value: false,
  set(value: boolean) {
    this.value = value;
  },
  toggle() {
    this.value = !this.value;
  },
});
