import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Prompt } from 'react-router-dom';
import {
	AppBar,
	Box,
	IconButton,
	Toolbar,
	Typography,
	useMediaQuery,
} from '@mui/material';
import {
	Menu as MenuIcon,
} from '@mui/icons-material';

import HeaderContent from '@/components/shared/HeaderContent';
import { useGlobalState } from '@/hooks/GlobalState';
import styles, { Content, Main } from './Page.styled';

const defaultProps = {
	headerItems: [],
	showPrompt: false,
	title: '',
	titleDocument: null,
};

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	headerItems: PropTypes.arrayOf(
		PropTypes.shape({
			disabled: PropTypes.bool,
			icon: PropTypes.node,
			onClick: PropTypes.func,
			text: PropTypes.string,
		}),
	),
	showPrompt: PropTypes.bool,
	title: PropTypes.string,
	titleDocument: PropTypes.string,
};

const Page = ({
	children,
	headerItems,
	showPrompt,
	title,
	titleDocument,
}) => {
	const [{ drawerOpen }, dispatch] = useGlobalState();
	const mobile = useMediaQuery('(max-width:600px)');

	const handleDrawerToggle = () => dispatch({ type: 'app-drawerOpen' });

	return (
		<Box sx={styles.root}>
			<Helmet>
				<title>{titleDocument || `${title} | ${import.meta.env.VITE_APP_TITLE}`}</title>
			</Helmet>

			<AppBar position="fixed" sx={styles.appBar}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={styles.menuIcon}
						onClick={handleDrawerToggle}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="h1" noWrap sx={styles.title}>
						{title}
					</Typography>
					<HeaderContent
						headerItems={headerItems}
						disableHeaderItems={mobile && drawerOpen}
					/>
				</Toolbar>
			</AppBar>

			<Content open={drawerOpen}>
				<Toolbar />
				<Main>
					{children}
				</Main>
			</Content>

			<Prompt when={showPrompt} message="Are you sure you want to leave without saving?" />
		</Box>
	);
};

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
