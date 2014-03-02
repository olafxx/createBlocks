  var node = (function () {	
		   
            
		   return function(options){
		        
			   if (typeof options === "undefined")  options = {};
			   
	           var setting = {
			       top               : typeof options.top === "undefined" ? 0 : options.top + "px",
			       left              : typeof options.left === "undefined" ? 0 : options.left + "px",
 			       width             : typeof options.width === "undefined" ? "100px" : options.width + "px",
			       height            : typeof options.height === "undefined" ? "100px" : options.height + "px",
 				   str               : ""
			   }
			   
 	           var self = document.createElement("div");
				 

				  
		       count = helpers.getLastId() + 1;
 
		
				this.attrStep1 = {
					id : "node"+count,				
					"class" : "node"				
				};			

				this.style = {
					top        : setting.top,
					left       : setting.left,
					width      : setting.width,
					height     : setting.height
				};			

 
                this.add = function(){
				    layout.appendChild(self);
					return self;
				}
				
				
			  	for(key in this.attrStep1){
					self.setAttribute(key,this.attrStep1[key]);
				}				
				
				for(key in this.style){
					setting.str += key+":"+this.style[key]+"; ";
				}
				
		       	self.setAttribute('style',setting.str);
		 

		     };   			
		 			   
	   })();