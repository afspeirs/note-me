export default {
  beforeInstallPrompt: null,
  drawerOpen: true,
  search: {
    text: '',
  },
  settings: {
    appTheme: JSON.parse(localStorage.getItem('settings-appTheme')) || 'default',
    sortNotesFavourite: JSON.parse(localStorage.getItem('settings-sortNotesFavourite')) || false,
    sortNotesOrder: JSON.parse(localStorage.getItem('settings-sortNotesOrder')) || 'date-modified-asc',
  },
  updateAvailable: false,
};
