import React, { Component } from 'react';
import {
	List,
	ListItem,
	ListItemText,
	TextField,
} from '@material-ui/core';

export default class SearchBar extends Component {
	state = {
		initialItems: [
			'Apples',
			'Broccoli',
			'Chicken',
			'Bacon',
			'Eggs',
			'Salmon',
			'Granola',
			'Bananas',
			'Beer',
			'Wine',
			'Yogurt',
		],
		items: [],
	}

	filterList = (event) => {
		const { initialItems } = this.state;
		this.setState({
			items: initialItems
				.filter(item => item.toLowerCase().search(event.target.value.toLowerCase()) !== -1),
		});
	}

	componentWillMount = () => this.setState(prevState => ({ items: prevState.initialItems }));

	render() {
		const { items } = this.state;

		return (
			<List>
				<ListItem>
					<TextField
						id="search-notes"
						variant="outlined"
						placeholder="Search Notes"
						onChange={this.filterList}
					/>
				</ListItem>
				{items.map(item => (
					<ListItem key={item}>
						<ListItemText primary={item} />
					</ListItem>
				))}
			</List>
		);
	}
}
