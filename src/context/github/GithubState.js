import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
	SEARCH_USERS,
	GET_USER,
	CLEAR_USERS,
	GET_REPOS,
	SET_LOADING
} from '../types';

const GithubState = props => {
	// State of App
	const initialState = {
		users: [],
		repos: [],
		user: {},
		loading: false
	};
	const clientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
	const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

	// handle types and state
	const [state, dispatch] = useReducer(GithubReducer, initialState);

	const searchUsers = async text => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${clientID}&client_secret=${clientSecret}`
		);
		dispatch({ type: SEARCH_USERS, payload: res.data.items });
	};

	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	const setLoading = () => dispatch({ type: SET_LOADING });

	const getUser = async username => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${clientID}&client_secret=${clientSecret}`
		);
		dispatch({ type: GET_USER, payload: res.data });
	};

	const getUserRepos = async username => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${clientID}&client_secret=${clientSecret}`
		);
		dispatch({
			type: GET_REPOS,
			payload: res.data
		});
	};

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers,
				clearUsers,
				getUser,
				getUserRepos
			}}>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
