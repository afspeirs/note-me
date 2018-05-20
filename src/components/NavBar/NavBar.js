import React, { Component } from "react";
import { Link, Route } from 'react-router-dom';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

class NavBar extends Component {
	render() {
		const styles = {
			root: {
				flexGrow: 1,
			},
			flex: {
				flex: 1,
			},
			leftIcon: {
				marginLeft: -12,
				marginRight: 16,
				color: 'inherit',
			},
		};

		return (
			<div style={styles.root} >
				<AppBar position="static">
					<Toolbar>
						<Route path="/note" render={() => (
							<IconButton component={Link} to="/" style={styles.leftIcon} aria-label="Menu">
								<ArrowBackIcon />
							</IconButton>
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
