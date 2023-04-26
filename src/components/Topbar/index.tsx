export function Topbar() {
  return (
    <div className="fixed pwa-header drag hidden [@media(display-mode:window-controls-overlay)]:flex items-center px-4 bg-primary dark:bg-black">
      <span className="text-sm dark:text-white">
        NoteMe
      </span>
    </div>
  );
}
