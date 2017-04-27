import React from 'react';
import './App.css';

class StoreBoard extends React.Component {
	render() {
		console.log(this.props);
		const { name, start, end } = this.props;
		return (
			<div className="Store" style={{ width: "200px", margin: "20px"}}>
				<h2>{ name }</h2>
				<p>{ start } - { end }</p>
				<p></p>
			</div>
		);
	}
}

StoreBoard.propTypes = {
	name: React.PropTypes.string
};

export default StoreBoard;
