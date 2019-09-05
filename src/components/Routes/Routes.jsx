import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect, Route } from 'react-router-dom';

import HomePage from '../../pages/HomePage';
import NoPage from '../../pages/NoPage';
import NotePage from '../../pages/NotePage';
import Settings from '../../pages/SettingsPage';

export default class Routes extends Component {
	static defaultProps = {
		user: null,
	};

	static propTypes = {
		edit: PropTypes.bool.isRequired,
		handleNoteAdd: PropTypes.func.isRequired,
		handleNoteDelete: PropTypes.func.isRequired,
		handleNoteUpdate: PropTypes.func.isRequired,
		history: PropTypes.instanceOf(Object).isRequired,
		loading: PropTypes.bool.isRequired,
		location: PropTypes.instanceOf(Object).isRequired,
		notes: PropTypes.instanceOf(Array).isRequired,
		setEdit: PropTypes.func.isRequired,
		signIn: PropTypes.func.isRequired,
		signOut: PropTypes.func.isRequired,
		user: PropTypes.instanceOf(Object),
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
			handleNoteAdd,
			handleNoteDelete,
			handleNoteUpdate,
			loading,
			location,
			notes,
			setEdit,
			signIn,
			signOut,
			user,
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
					<Redirect from="/settings/" to="/" />
					<Route component={NoPage} />
				</Switch>

				{isModal && (
					<Route
						path="/settings/"
						render={props => (
							<Settings
								{...props}
								signIn={signIn}
								signOut={signOut}
								user={user}
							/>
						)}
					/>
				)}
			</>
		);
	}
}
