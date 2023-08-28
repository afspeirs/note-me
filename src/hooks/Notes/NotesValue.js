import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { useConfirm } from 'material-ui-confirm';

import { useAuth } from '@/hooks/Auth';
import { useSnackbar } from '@/hooks/Snackbar';
import { db } from '@/firebase';
import { getTitle } from '@/utils';

const NotesValue = () => {
  const { user } = useAuth();
  const confirm = useConfirm();
  const history = useHistory();
  const location = useLocation();
  const snackbar = useSnackbar();
  const [notes, setNotes] = useState();
  const [labels, setLabels] = useState();
  const [loading, setLoading] = useState(true);

  const returnNoteObject = ({
    dateCreated,
    dateModified,
    favourite,
    text,
    title,
  }) => ({
    dateCreated: +new Date(dateCreated) || +new Date(),
    dateModified: +new Date(dateModified) || +new Date(),
    favourite: favourite || false,
    text: text || '',
    title: title || getTitle(text || ''),
  });

  /**
   * Create a note based on the text provided, and navigate to the new note.
   * If an Untitled note already exists, navigate to that note
   * @param {string} [text] - Initial text to use for the note
   */
  const createNote = async (text = '', replace = false) => {
    const untitledNote = notes.find((note) => note.text === '');

    if (untitledNote) {
      const path = `/note/${untitledNote.id}`;

      if (replace) {
        history.replace(path);
      } else {
        history.push(path);
      }
    } else {
      const noteRef = await doc(collection(db, user.uid));
      const value = returnNoteObject({
        text,
      });

      await setDoc(noteRef, value)
        .then(() => {
          const path = `/note/${noteRef.id}`;

          if (replace) {
            history.replace(path);
          } else {
            history.push(path);
          }
        });
    }
  };

  /**
   * Delete a note and navigate back to Home
   * @param {object} [note]
   */
  const deleteNote = (note) => {
    confirm({
      title: `Are you sure you want to delete "${note.title}"?`,
      confirmationText: 'Delete',
    })
      .then(async () => {
        const noteRef = doc(db, user.uid, note.id);

        await deleteDoc(noteRef)
          .then(() => snackbar.showMessage({
            actionFunction: () => setDoc(noteRef, note),
            actionText: 'Undo',
            message: `"${note.title}" has been deleted`,
          }));

        // Change the location only if you are the current note that is being deleted
        if (location.pathname.includes(note.id)) {
          history.replace('/');
        }
      })
      .catch((error) => {
        if (error) console.error(error); // eslint-disable-line no-console
      });
  };

  /**
   * Toggle favourite on a note
   * @param {object} [note]
   */
  const favouriteNote = async (note) => {
    const noteRef = doc(db, user.uid, note.id);

    await updateDoc(noteRef, {
      favourite: !note.favourite,
    })
      .then(() => snackbar.showMessage({
        actionFunction: () => setDoc(noteRef, note),
        actionText: 'Undo',
        message: `"${note.title}" has been ${note.favourite ? 'removed' : 'added'} as a favourite`,
      }));
  };

  /**
   * Creates notes from an array
   * @param {array} [listOfNotes]
   */
  const importNotes = async (listOfNotes) => {
    const batch = writeBatch(db);

    listOfNotes.forEach((note) => {
      const noteRef = note.id ? doc(db, user.uid, note.id) : doc(collection(db, user.uid));
      const value = returnNoteObject(note);

      batch.set(noteRef, value);
    });

    await batch.commit().then(() => snackbar.showMessage({
      message: `${listOfNotes.length} note${listOfNotes.length === 1 ? ' has' : 's have'} been imported`,
    }));
  };

  /**
   * Update the labels on a note
   * @param {array} newLabels
   * @param {object} [note]
   */
  const updateLabels = async (newLabels, note) => {
    const noteRef = doc(db, user.uid, note.id);

    await updateDoc(noteRef, {
      labels: newLabels,
    })
      .then(() => snackbar.showMessage({
        actionFunction: () => setDoc(noteRef, note),
        actionText: 'Undo',
        message: `Labels for "${note.title}" have been updated`,
      }));
  };

  /**
   * Update the text on a note
   * @param {string} id
   * @param {string} text
   */
  const updateNote = async (id, text) => {
    const noteRef = doc(db, user.uid, id);

    await updateDoc(noteRef, {
      dateModified: +new Date(),
      text,
      title: getTitle(text),
    });
  };

  /**
   * Adds a function to the window object to show the notes
   * @param {bool} prettyPrint - Log out a prettified version of notes to the console
   * @returns {array} notes
   */
  window.returnNotes = (prettyPrint = false) => {
    if (prettyPrint) console.log(JSON.stringify(notes, null, 2)); // eslint-disable-line
    return notes;
  };

  useEffect(() => {
    let unSubscribe;
    if (user) {
      unSubscribe = onSnapshot(collection(db, user.uid), (snapshot) => {
        const authNotes = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));

        setNotes(authNotes);
        setLoading(false);
      });
    } else {
      setNotes([]);
      setLoading(false);
    }
    return unSubscribe;
  }, [user]);

  useEffect(() => {
    if (notes) {
      const newLabels = notes
        .map((note) => note.labels)
        .filter(Boolean)
        .flat()
        .sort((a, b) => a.localeCompare(b));

      if (labels !== newLabels) {
        setLabels([...new Set(newLabels)].sort());
      }
    }
  }, [notes]);

  return {
    createNote,
    deleteNote,
    favouriteNote,
    importNotes,
    labels,
    loading,
    notes,
    updateLabels,
    updateNote,
  };
};

export default NotesValue;
