export const mobileWidth = 1024;

export const drawerOpen = $state({
  value: false,
  set(value: boolean) {
    this.value = value;
  },
  toggle() {
    this.value = !this.value;
  },
});

export const drawerUseMobile = $state({
  value: false,
  set(value: boolean) {
    this.value = value;
  },
  toggle() {
    this.value = !this.value;
  },
});
