import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../../pages/HomePage';
import NotePage from '../../pages/NotePage';
import NoPage from '../../pages/NoPage';

export default class Routes extends Component {
	static propTypes = {
		edit: PropTypes.bool.isRequired,
		history: PropTypes.instanceOf(Object).isRequired,
		loading: PropTypes.bool.isRequired,
		location: PropTypes.instanceOf(Object).isRequired,
		notes: PropTypes.instanceOf(Array).isRequired,
		setEdit: PropTypes.func.isRequired,
		handleNoteAdd: PropTypes.func.isRequired,
		handleNoteDelete: PropTypes.func.isRequired,
		handleNoteUpdate: PropTypes.func.isRequired,
	}

	previousLocation = this.props.location; // eslint-disable-line react/destructuring-assignment

	componentWillUpdate({ history, location }) {
		// set previousLocation if props.location is not modal
		if (
			history.action !== 'POP'
			&& (!location.state || !location.state.modal)
		) {
			this.previousLocation = location;
		}
	}

	render() {
		const {
			edit,
			loading,
			location,
			notes,
			setEdit,
			handleNoteAdd,
			handleNoteDelete,
			handleNoteUpdate,
		} = this.props;

		const isModal = !!(
			location
			&& location.state
			&& location.state.modal
			&& this.previousLocation !== location
		); // not initial render

		return (
			<>
				<Switch location={isModal ? this.previousLocation : location}>
					<Route
						exact
						path="/"
						render={() => (
							<HomePage
								handleNoteDelete={handleNoteDelete}
								loading={loading}
								notes={notes}
							/>
						)}
					/>
					<Route
						path="/note/:id"
						render={props => (
							<NotePage
								{...props}
								edit={edit}
								handleNoteUpdate={handleNoteUpdate}
								note={notes.find(note => note.id === props.match.params.id)}
								setEdit={setEdit}
							/>
						)}
					/>
					<Route
						path="/note/"
						render={props => (
							<NotePage
								{...props}
								edit={edit}
								handleNoteAdd={handleNoteAdd}
								setEdit={setEdit}
								newNote
							/>
						)}
					/>
					<Route component={NoPage} />
				</Switch>
				{/* {isModal ? <Route path="/settings/" component={Settings} /> : null} */}
			</>
		);
	}
}
