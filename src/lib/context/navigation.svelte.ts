export const mobileWidth = 1024;

export const sidebarOpen = $state({
  value: JSON.parse(window.localStorage.getItem('note-me-sidebar-open') || 'false') as boolean,
  set(value: boolean) {
    this.value = value;
    window.localStorage.setItem('note-me-sidebar-open', JSON.stringify(this.value));
  },
  toggle() {
    this.value = !this.value;
    window.localStorage.setItem('note-me-sidebar-open', JSON.stringify(this.value));
  },
});

export const sidebarUseMobile = $state({
  value: JSON.parse(window.localStorage.getItem('note-me-sidebar-use-mobile') || 'false') as boolean,
  set(value: boolean) {
    this.value = value;
    window.localStorage.setItem('note-me-sidebar-use-mobile', JSON.stringify(this.value));
  },
  toggle() {
    this.value = !this.value;
    window.localStorage.setItem('note-me-sidebar-use-mobile', JSON.stringify(this.value));
  },
});
