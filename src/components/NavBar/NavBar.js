import { AppBar, Drawer, FlatButton, IconButton, MenuItem } from 'material-ui';
import IconArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import React from "react";
import { Route } from "react-router-dom";

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: false };
	}

	handleDrawerToggle = () => this.setState({ open: !this.state.open });
	handleDrawerClose = () => this.setState({ open: false });

	render() {
		const styles = {
			appbar: {
				position: 'fixed',
				top: 0,
				left: 0
			}
		}

		return (
			<div>
				<Route exact path="/" render={() => (
					<AppBar
						title="Note Me"
						style={styles.appbar}
						onLeftIconButtonClick={this.handleDrawerToggle}
					/>
				)} />
				<Route exact path="/note" render={() => (
					<AppBar
						title="Note"
						style={styles.appbar}
						iconElementLeft={
							<IconButton>
								<IconArrowBack />
							</IconButton>
						}
						onLeftIconButtonClick={() => window.history.back()}
						iconElementRight={
							<FlatButton label={this.props.edit ? "done" : "edit"} />
						}
						onRightIconButtonClick={this.props.handleEditToggle}
					/>
				)} />
				<Drawer
					docked={false}
					width={250}
					open={this.state.open}
					onRequestChange={open => this.setState({ open })}
				>
					<MenuItem onClick={this.handleDrawerClose}>Menu Item</MenuItem>
					<MenuItem onClick={this.handleDrawerClose}>Menu Item 2</MenuItem>
				</Drawer>
			</div>
		);
	}
}

export default NavBar;
