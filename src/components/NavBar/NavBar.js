import React, { Component } from "react";
import { NavLink, Route } from 'react-router-dom';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

class NavBar extends Component {
	render() {
		const styles = {
			root: {
				flexGrow: 1,
			},
			anchor: {
				color: 'inherit',
			},
			flex: {
				flex: 1,
			},
			menuButton: {
				marginLeft: -12,
				marginRight: 20,
			},
		};

		return (
			<div style={styles.root} >
				<AppBar position="static">
					<Toolbar>
						<Route path="/note" render={() => (
							<NavLink to="/" style={styles.anchor}>
								<IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
									<ArrowBackIcon />
								</IconButton>
							</NavLink>
						)} />
						<Typography variant="title" color="inherit" style={styles.flex}>
							Note Me
						</Typography>
						<Route path="/note" render={() => (
							<Button color="inherit" onClick={this.props.handleEditToggle}>
								{this.props.edit ? "done" : "edit"}
							</Button>
						)} />
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default NavBar;
