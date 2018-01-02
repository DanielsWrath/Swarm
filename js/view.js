function View(width, height) {
	this.width = width;
	this.height = height;
	this.x = 0;
	this.y = 0;
	this.scale = 1;
}

View.prototype = {
	FIT_MARGIN: 80,
	
	apply(context) {
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, this.width, this.height);
		
		context.translate(this.width * 0.5, this.height * 0.5);
		context.scale(this.scale, this.scale);
		context.translate(-this.x, -this.y);
	},
	
	fit(agents) {
		return;
		var xMin = undefined;
		var yMin = undefined;
		var xMax = undefined;
		var yMax = undefined;
		
		for(var i = 0; i < agents.length; ++i) {
			var agent = agents[i];
			
			if(xMin == undefined || agent.position.x < xMin)
				xMin = agent.position.x;
			if(yMin == undefined || agent.position.y < yMin)
				yMin = agent.position.y;
			if(xMax == undefined || agent.position.x > xMax)
				xMax = agent.position.x;
			if(yMax == undefined || agent.position.y > yMax)
				yMax = agent.position.y;
		}
		
		var regionWidth = xMax - xMin;
		var regionHeight = yMax - yMin;
		
		this.x = xMin + regionWidth * 0.5;
		this.y = yMin + regionHeight * 0.5;
		this.scale = Math.min(
			this.width / (regionWidth + this.FIT_MARGIN * 2),
			this.height / (regionHeight + this.FIT_MARGIN * 2));
	}
}