import { useEffect, useState } from 'react';

const useContextMenu = (parentEl, closestMenuOption = '.context-menu-select') => {
  const [contextAnchor, setContextAnchor] = useState();

  const handleContextMenuClose = () => setContextAnchor();

  const handleContextMenuOpen = (event) => {
    const closestContextMenuOption = event.target.closest(closestMenuOption);

    // Only render if the right click occurs within the locationSelector
    if (closestContextMenuOption) {
      event.preventDefault();
      setContextAnchor({
        left: event.pageX,
        top: event.pageY,
        id: closestContextMenuOption.dataset.id,
      });
    }
  };

  useEffect(() => {
    const { current } = parentEl;
    current.addEventListener('contextmenu', handleContextMenuOpen);

    return () => current.removeEventListener('contextmenu', handleContextMenuOpen);
  }, [parentEl]);

  return {
    contextMenu: {
      id: contextAnchor?.id,
      position: {
        top: contextAnchor?.top || 0,
        left: contextAnchor?.left || 0,
      },
    },
    contextMenuClose: handleContextMenuClose,
  };
};

export default useContextMenu;
