import { createContext, useContext } from 'react';

const NotesContext = createContext();
export const useNotes = () => useContext(NotesContext);

export default NotesContext;
