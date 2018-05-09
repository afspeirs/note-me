import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import FlatButton from "material-ui/FlatButton";
import MenuItem from "material-ui/MenuItem";
import React from "react";

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: false };
	}

	handleToggle = () => this.setState({ open: !this.state.open });
	handleClose = () => this.setState({ open: false });

	render() {
		return (
			<div>
				<AppBar
					title="List Me"
					onLeftIconButtonClick={this.handleToggle}
					iconElementRight={
						<FlatButton label={this.props.edit ? "done" : "edit"} />
					}
					onRightIconButtonClick={this.props.editToggle}
				/>
				<Drawer
					docked={false}
					width={250}
					open={this.state.open}
					onRequestChange={open => this.setState({ open })}
				>
					<MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
					<MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
				</Drawer>
			</div>
		);
	}
}

export default NavBar;
