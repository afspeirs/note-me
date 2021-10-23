import Markdown from 'markdown-to-jsx';
import { styled } from '@mui/material/styles';

export const TextareaStyled = styled('textarea')(({ theme }) => ({
	width: 'inherit',
	flexGrow: 1,
	padding: theme.spacing(2),
	overflowY: 'auto',
	resize: 'none',
	border: 'none',
	fontSize: '1.2em',
	backgroundColor: theme.palette.background.paper,
	color: theme.palette.text.primary,
	'&:focus': {
		outline: 'none',
	},
}));

export const MarkdownStyled = styled(Markdown)(({ theme }) => ({
	height: '100%',
	display: 'flex',
	overflowY: 'auto',
	flexDirection: 'column',
	width: 'inherit',
	flexGrow: 1,
	padding: theme.spacing(2),
	'& h1': {
		fontSize: '1.75em',
	},
	'& p + p': {
		marginTop: theme.spacing(2),
	},
	'& ol, ul': {
		paddingLeft: theme.spacing(4),
	},
	'& li': {
		position: 'relative',
	},
	'& li > input[type="checkbox"]': {
		position: 'absolute',
		left: `-${theme.spacing(3)}`,
	},
	'& blockquote': {
		margin: 0,
		padding: '0 1rem',
		borderLeft: `0.25em solid ${theme.palette.text.secondary}`,
		color: theme.palette.text.secondary,
	},
	'& pre': {
		backgroundColor: theme.palette.action.disabledBackground,
		overflowX: 'scroll',
		padding: theme.spacing(2),
		borderRadius: '0.25rem',
	},
	'& h1, h2, h3, h4, h5, h6, p': {
		margin: 0,
		marginBottom: theme.spacing(2),
	},
}));
