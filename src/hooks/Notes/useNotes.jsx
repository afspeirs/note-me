import { useContext } from 'react';

import NotesContext from './NotesContext';

const useNotes = () => useContext(NotesContext);

export default useNotes;
