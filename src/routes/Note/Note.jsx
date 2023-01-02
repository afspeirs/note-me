import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  InfoOutlined as InfoIcon,
  Save as SaveIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';

import NotesMoreInformation from '@/components/NotesMoreInformation';
import Page from '@/components/shared/Page';
import RendererLink from '@/components/shared/RendererLink';
import { useHotkeys } from '@/hooks/Hotkeys';
import { useNotes } from '@/hooks/Notes';
import { MarkdownStyled, TextareaStyled } from './Note.styled';

function Note() {
  const { id } = useParams();
  const {
    deleteNote,
    favouriteNote,
    notes,
    updateNote,
  } = useNotes();
  const [edit, setEdit] = useState(false);
  const [openInformationDialog, setOpenInformationDialog] = useState(false);
  const [localNote, setLocalNote] = useState(null);
  const currentNote = notes?.find((note) => note.id === id);

  const handleInformationDialogOpen = () => setOpenInformationDialog(true);
  const handleInformationDialogClose = () => setOpenInformationDialog(false);

  const headerItems = [
    {
      icon: edit ? <SaveIcon /> : <EditIcon />,
      onClick: () => setEdit((prevState) => !prevState),
      text: edit ? 'Save' : 'Edit',
    },
    {
      icon: currentNote?.favourite ? <StarIcon color="inherit" /> : <StarBorderIcon />,
      onClick: () => favouriteNote(currentNote),
      text: currentNote?.favourite ? 'Unfavourite' : 'Favourite',
    },
    {
      extra: (
        <NotesMoreInformation
          open={openInformationDialog}
          onClose={handleInformationDialogClose}
          note={currentNote}
        />
      ),
      icon: <InfoIcon />,
      onClick: handleInformationDialogOpen,
      text: 'More Information',
    },
    {
      icon: <DeleteIcon />,
      onClick: () => deleteNote(currentNote),
      text: 'Delete Note',
    },
  ];

  // CTRL + E || CTRL + S = Save / Edit Note
  useHotkeys({
    keys: ['e', 's'],
    callback: (event) => {
      event.preventDefault();
      setEdit((prevState) => !prevState);
    },
    metaModifier: true,
  });

  useEffect(() => {
    if (currentNote) {
      setLocalNote(currentNote.text);
      setEdit(currentNote.text === '');
    }
  }, [currentNote]);

  useEffect(() => {
    const compare = !edit && id && localNote && localNote !== currentNote?.text;

    if (compare) {
      updateNote(id, localNote);
    }
  }, [edit]);

  if (!currentNote?.id) return null;
  return (
    <Page
      disableSwipes={edit}
      headerItems={headerItems}
      showPrompt={localNote !== currentNote?.text}
      title={currentNote?.title}
    >
      {edit ? (
        <TextareaStyled
          value={localNote || ''}
          onChange={(event) => setLocalNote(event.target.value)}
        />
      ) : (
        <MarkdownStyled
          options={{
            forceWrapper: true,
            overrides: {
              a: RendererLink,
            },
          }}
        >
          {localNote || ''}
        </MarkdownStyled>
      )}
    </Page>
  );
}

export default Note;
