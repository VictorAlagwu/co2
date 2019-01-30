import React, { Component } from 'react';



class Map extends Component {

	componentDidMount() {
		// Add <script> tag dynamically
		const script = document.createElement("script");
        script.src = "worldmap.js";
        script.async = true;
        document.body.appendChild(script);

		this.timer = setInterval(() => {
			this.tick()
		}, 1000)
	}


	tick() {

		let classes = document.getElementsByClassName("sm_state_US");
		let us = classes[0]
		if (us === undefined) { 
			return
		}

		let origColor = us.getAttribute("fill");

		// Change USA to yellow
		us.setAttribute("fill", 'yellow');

		setTimeout( () => {
			us.setAttribute("fill", origColor);
		}, 200)

	}

	render() {

	  	const rotate = {
	  		width: '100%',
	  		height: '100%',
	 		paddingBottom: '100%',
			transform: 'rotate(180deg)',
			transformOrigin: '52% 15%'
		};




	    return (
	      <div>
	      	<div id="map" style={rotate}></div>
	      HELLO WORLD
	      </div>
	    );
	}
}

export default Map;