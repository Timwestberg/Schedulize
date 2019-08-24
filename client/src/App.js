import React, { Fragment } from 'react';
// import './App.css';
import { Switch } from 'react-router-dom';

import RoutesWithNavigation from './components/RoutesWithNavigation';
// import './components/ApptMapCard/ScrollBarThin/style.css';
// require('dotenv').config();
const App = () => {
	return (
		<Fragment>
			<RoutesWithNavigation />
		</Fragment>
	);
};

export default App;
