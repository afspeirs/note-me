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
		return (
			<div>
				<Route exact path="/" render={() => (
					<AppBar
						title="Note Me"
						onLeftIconButtonClick={this.handleDrawerToggle}
					/>
				)} />
				<Route exact path="/note" render={() => (
					<AppBar
						title="Note"
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
