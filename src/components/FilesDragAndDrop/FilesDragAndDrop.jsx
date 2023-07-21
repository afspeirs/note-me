import frontMatter from 'front-matter';
import { useEffect, useRef, useState } from 'react';
import { useConfirm } from 'material-ui-confirm';

import { useNotes } from '@/hooks/Notes';
import { useSnackbar } from '@/hooks/Snackbar';
import { getTitle } from '@/utils';
import { DropZoneStyled } from './FilesDragAndDrop.styled';

function FilesDragAndDrop() {
  const confirm = useConfirm();
  const { importNotes } = useNotes();
  const drop = useRef(null);
  const snackbar = useSnackbar();
  const [dragging, setDragging] = useState(false);
  const [filesToImport, setFilesToImport] = useState({});

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { files } = event.dataTransfer;

    [...files].forEach((file) => {
      if (
        file.name.toLowerCase().endsWith('md')
        || file.type.toLowerCase().startsWith('text/')
      ) {
        const reader = new FileReader();
        reader.onload = () => {
          const fileInfo = frontMatter(reader.result);
          // console.log(fileInfo);

          setFilesToImport((prevState) => ({
            ...prevState,
            [file.name]: {
              ...fileInfo.attributes,
              text: fileInfo.body,
            },
          }));
        };
        reader.readAsText(file);
      } else {
        snackbar.showMessage({
          message: `"${file.name}" cannot be imported. Only markdown/text files are supported`,
        });
      }
    });

    setDragging(false);
  };

  const handleDragEnterWindow = () => setDragging(true);

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging(false);
    setFilesToImport({});
  };

  useEffect(() => {
    const notesToImport = Object.values(filesToImport);

    if (notesToImport?.length > 0) {
      confirm({
        title: 'Do you want to import the following files?',
        description: `${notesToImport.map((note) => `"${getTitle(note.text)}"`).join(', ')}`,
        cancellationText: 'No',
        confirmationText: 'Yes',
      })
        .then(() => {
          importNotes(notesToImport);
          setFilesToImport({});
        })
        .catch((error) => {
          if (error) console.error(error); // eslint-disable-line no-console
          setFilesToImport({});
        });
    }
  }, [filesToImport]);

  useEffect(() => {
    const { current } = drop;
    current.addEventListener('dragover', handleDragOver);
    current.addEventListener('drop', handleDrop);
    window.addEventListener('dragenter', handleDragEnterWindow);
    current.addEventListener('dragenter', handleDragEnter);
    current.addEventListener('dragleave', handleDragLeave);

    return () => {
      current.removeEventListener('dragover', handleDragOver);
      current.removeEventListener('drop', handleDrop);
      window.removeEventListener('dragenter', handleDragEnterWindow);
      current.removeEventListener('dragenter', handleDragEnter);
      current.removeEventListener('dragleave', handleDragLeave);
    };
  }, []);

  return (
    <DropZoneStyled
      aria-hidden="true"
      ref={drop}
      dragging={dragging}
    />
  );
}

export default FilesDragAndDrop;
