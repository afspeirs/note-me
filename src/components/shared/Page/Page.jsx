import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Prompt, useHistory } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
	AppBar,
	Box,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material';
import {
	ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

import HeaderContent from '@/components/shared/HeaderContent';
import styles from './Page.styled';

const defaultProps = {
	headerItems: [],
	disableHeaderItemsOverflowMenu: false,
	showBackButton: true,
	showPrompt: false,
	title: '',
	titleDocument: null,
};

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	disableHeaderItemsOverflowMenu: PropTypes.bool,
	headerItems: PropTypes.arrayOf(
		PropTypes.shape({
			disabled: PropTypes.bool,
			icon: PropTypes.node,
			onClick: PropTypes.func,
			text: PropTypes.string,
		}),
	),
	showBackButton: PropTypes.bool,
	showPrompt: PropTypes.bool,
	title: PropTypes.string,
	titleDocument: PropTypes.string,
};

const Page = ({
	children,
	disableHeaderItemsOverflowMenu,
	headerItems,
	showBackButton,
	showPrompt,
	title,
	titleDocument,
}) => {
	const history = useHistory();
	const theme = useTheme();
	const { mode } = theme.palette;

	const handleBackClick = (event) => {
		event.stopPropagation();

		// Check if there is a previous page in the history
		if (history.action === 'PUSH') {
			history.goBack();
		} else {
			history.push('/');
		}
	};

	return (
		<Box sx={styles.root}>
			<Helmet>
				<title>{titleDocument || `${title} | ${import.meta.env.VITE_APP_TITLE}`}</title>
				<meta name="theme-color" content={mode === 'dark' ? '#121212' : '#ee6e00'} />
			</Helmet>

			<AppBar position="relative">
				<Toolbar>
					{showBackButton && (
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={styles.menuIcon}
							onClick={handleBackClick}
						>
							<ArrowBackIcon />
						</IconButton>
					)}
					<Typography variant="h6" component="h1" noWrap sx={styles.title}>
						{title}
					</Typography>
					<HeaderContent
						headerItems={headerItems}
						disableOverflowMenu={disableHeaderItemsOverflowMenu}
					/>
				</Toolbar>
			</AppBar>

			<Box sx={styles.content}>
				<Box component="main" sx={styles.main}>
					{children}
				</Box>
			</Box>

			<Prompt when={showPrompt} message="Are you sure you want to leave without saving?" />
		</Box>
	);
};

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
