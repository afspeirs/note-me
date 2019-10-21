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
		drawerOpen: PropTypes.bool.isRequired,
		edit: PropTypes.bool.isRequired,
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

	componentDidMount() {
		const { location } = this.props;
		window.previousLocation = location;
	}

	componentDidUpdate({ history, location }) {
		// Set previousLocation if props.location is not a modal
		if (history.action !== 'POP' && (!location.state || !location.state.modal)) {
			window.previousLocation = location;
		}
	}

	render() {
		const {
			drawerOpen,
			edit,
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
			&& window.previousLocation !== location
		);

		return (
			<>
				<Switch location={isModal ? window.previousLocation : location}>
					<Route
						exact
						path="/"
						render={() => (
							<HomePage
								drawerOpen={drawerOpen}
								handleNoteDelete={handleNoteDelete}
								isSignedIn={Boolean(user)}
								loading={loading}
								notes={notes}
								signIn={signIn}
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

					<Redirect from="/settings/" to="/" />
					<Route component={NoPage} />
				</Switch>

				{!user && <Redirect from="/note/" to="/" />}

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
