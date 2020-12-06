import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Farms from './pages/Farms';
import Preferences from './pages/Preferences';
import About from './pages/About';

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/friends' component={Friends} />
					<Route path='/farms' component={Farms} />
					<Route path='/preferences' component={Preferences} />
					<Route path='/about' component={About} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
