export const search = $state({
  sidebarOpen: false,
  value: '',
  set(value: string) {
    this.value = value;
  },
  setSidebarOpen(open: boolean) {
    this.sidebarOpen = open;
  },
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  },
});
