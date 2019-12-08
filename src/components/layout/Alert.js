import React, { useContext } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
	const { alert } = useContext(AlertContext);
	return (
		alert !== null && (
			<div className={`alert alert-${alert.type}`}>
				<FaInfoCircle className='info' />
				{alert.msg}
			</div>
		)
	);
};

export default Alert;
