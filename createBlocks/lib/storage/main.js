var storage = (function () {
  
     var visual = function(){

		return helpers.fread("/projects/"+projectName+"/storage/storageVisual");	 
	 
	 }
 	
	return function () {
	
 	    this.visual = visual;
	
	}
	
})()

