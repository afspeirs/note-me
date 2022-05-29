import {
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import {
  Clear as ClearIcon,
} from '@mui/icons-material';

import { useGlobalState } from '@/hooks/GlobalState';

function NotesSearch() {
  const [{ search }, dispatch] = useGlobalState();

  const updateSearchText = (text) => {
    dispatch({
      type: 'app-search',
      value: {
        text,
      },
    });
  };

  const handleTextClear = () => updateSearchText('');

  const handleTextInput = (event) => updateSearchText(event.target.value);

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="notes-search-input">Search for a Note</InputLabel>
      <OutlinedInput
        id="notes-search-input"
        label="Search for a Note"
        onChange={handleTextInput}
        placeholder="What do you want to find?"
        value={search.text}
        endAdornment={search.text.length !== 0 && (
        <IconButton
          aria-label="Clear Search"
          color="inherit"
          edge="end"
          onClick={handleTextClear}
        >
          <ClearIcon />
        </IconButton>
        )}
      />
    </FormControl>
  );
}

export default NotesSearch;
