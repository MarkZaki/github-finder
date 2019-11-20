import React from 'react';
import PropTypes from 'prop-types';
import { DiGithubBadge } from 'react-icons/di';
import { Link } from 'react-router-dom';

const Navbar = ({ title }) => {
	return (
		<div className='navbar bg-primary'>
			<h1>
				<span className='icon'>
					<DiGithubBadge />
				</span>
				{title}
			</h1>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li>
			</ul>
		</div>
	);
};

Navbar.defaultProps = {
	title: 'Navbar'
};
Navbar.propTypes = {
	title: PropTypes.string.isRequired
};

export default Navbar;
