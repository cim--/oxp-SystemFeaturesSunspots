this.name = "System Features: Sunspots";
this.description = "Populator script for the sunspots";

this.startUp = function() {
		this.$overrides = [[],[],[],[],[],[],[],[]];
		delete this.startUp;
}

this.systemWillPopulate = function() {
	system.setPopulator("system_features_sunspots",
						{
							callback: this._addSunspots.bind(this),
							priority: 1000,
							coordinates: system.sun.position
						});
}

this._addSunspots = function() {
		if (this.$overrides[galaxyNumber].indexOf(system.ID) > -1) {
				return;
		} 
		if (!system.sun) {
				return;
		}

		var numspots = Math.random()*6;
		if (system.info.description.indexOf("solar activity") > -1) {
				numspots *= 1.5;
				if (system.info.description.indexOf("frequent solar activity") > -1) {
						numspots += 3;
				} else if (system.info.description.indexOf("dreadful solar activity") > -1 || system.info.description.indexOf("deadly solar activity") > -1) {
						numspots *= 1.5;
				}
		}
		numspots = Math.floor(numspots-3.5); // normal system usually 0 or 1 spots

		if (numspots < 1) { return; }
		
		for (var i=0;i<numspots;i++) {
				this._addSunspot();
		}
}



this._addSunspot = function() {
		// pick a random spot on the sun's surface
		var spotpos = Vector3D.randomDirection().multiply(system.sun.radius).add(system.sun.position);
		// make sure the sunspot is facing outwards
		var facing = spotpos.subtract(system.sun.position).direction().rotationTo(new Vector3D([0,0,1]));
		
		// add the sunspot, and rotate it.
		var sunspot = system.addVisualEffect("systemfeatures_sunspot",spotpos);
		sunspot.orientation = facing;
		// these need to be fairly precisely sized to match the apparent
		// stellar curvature, or they look a bit odd. So we have a standard
		// model to match a sphere of size 1, and scale it up to the right
		// size as needed.
		sunspot.scale(system.sun.radius);

		// set up some shader parameters
		// not really vectors, just some related floats, in this case
		// so that the sunspots aren't all the same shape
		sunspot.shaderVector1 = Vector3D(4+Math.random()*26,25+Math.random()*90,2+Math.random()*3);
		sunspot.shaderVector2 = Vector3D(4+Math.random()*26,25+Math.random()*90,2+Math.random()*3);

		// outer and inner radius of shader effect
		var outerRadius = 0.25+(Math.random()/3.5);
		sunspot.shaderFloat1 = outerRadius * outerRadius;
		var innerRadius = outerRadius * (0.02+(Math.random()*0.1))
		sunspot.shaderFloat2 = innerRadius * innerRadius;

}
