import {
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';

const NoPage = () => (
	<List>
		<ListItem>
			<ListItemText primary="404: Page not found" />
		</ListItem>
	</List>
);

export default NoPage;
