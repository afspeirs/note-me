import React from 'react';
import PropTypes from 'prop-types';
import {
	Link,
	Navbar,
	NavLeft,
	NavRight,
	NavTitle,
} from 'framework7-react';

const Navigation = ({
	backLink,
	settings,
	title,
}) => (
	<Navbar>
		{backLink && <NavLeft backLink="Back" />}
		<NavTitle>{title}</NavTitle>
		{settings && (
			<NavRight>
				<Link href="/settings/" iconMaterial="settings" />
			</NavRight>
		)}
	</Navbar>
);

Navigation.propTypes = {
	backLink: PropTypes.string,
	settings: PropTypes.bool,
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
	]),
};

export default Navigation;
