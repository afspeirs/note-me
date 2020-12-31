import {
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
} from '@material-ui/core';

const AppVersion = () => (
	<ListItem>
		<ListItemText primary="App version:" />
		<ListItemSecondaryAction>
			{process.env.REACT_APP_VERSION}
		</ListItemSecondaryAction>
	</ListItem>
);

export default AppVersion;
