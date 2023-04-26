export function Topbar() {
  return (
    <div className="fixed pwa-header drag hidden [@media(display-mode:window-controls-overlay)]:flex items-center px-4">
      <span className="text-sm text-white">
        NoteMe
      </span>
    </div>
  );
}
