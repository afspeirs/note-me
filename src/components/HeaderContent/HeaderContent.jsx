import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Tooltip,
	useMediaQuery,
} from '@material-ui/core';
import {
	MoreVert as MoreIcon,
} from '@material-ui/icons';
import { useLocation } from 'react-router-dom';

import { isPathVisible } from '../../utils';

const defaultProps = {
	forceLastIconEdge: false,
	headerItems: [],
};

const propTypes = {
	forceLastIconEdge: PropTypes.bool,
	headerItems: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.node,
			onClick: PropTypes.func,
			text: PropTypes.string,
		}),
	),
};

const HeaderContent = ({ forceLastIconEdge, headerItems }) => {
	const location = useLocation();
	const [anchorEl, setAnchorEl] = useState(null);
	const isHomeVisible = isPathVisible(location, '/');
	const mobile = useMediaQuery('(max-width:600px)');
	const handleClick = (event) => setAnchorEl(event.currentTarget);

	const handleClose = () => setAnchorEl(null);

	return (
		<>
			{(mobile && isHomeVisible) ? (
				<>
					<IconButton
						color="inherit"
						aria-label="Show more"
						aria-controls="more-menu"
						aria-haspopup="true"
						onClick={handleClick}
						edge="end"
					>
						<MoreIcon />
					</IconButton>

					<Menu
						id="more-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						{headerItems.map((item) => {
							const handleItemClick = () => {
								item.onClick();
								handleClose();
							};

							return (
								<MenuItem
									component={item.component}
									key={item.text}
									onClick={handleItemClick}
									to={item.to}
								>
									<ListItemIcon>
										{item.icon}
									</ListItemIcon>
									<ListItemText
										primary={item.text}
									/>
								</MenuItem>
							);
						})}

					</Menu>
				</>
			) : (
				<>
					{headerItems.map((item, index) => (
						<Tooltip key={item.text} title={item.text}>
							<IconButton
								aria-label={item.text}
								color="inherit"
								component={item.component}
								edge={((forceLastIconEdge || mobile) && index === headerItems.length - 1) && 'end'}
								onClick={item.onClick}
								to={item.to}
							>
								{item.icon}
							</IconButton>
						</Tooltip>
					))}
				</>
			)}
		</>
	);
};

HeaderContent.defaultProps = defaultProps;
HeaderContent.propTypes = propTypes;

export default HeaderContent;
