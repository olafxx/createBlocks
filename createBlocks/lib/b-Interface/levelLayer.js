  var levelLayer = (function () {	
     

			var elemets = document.getElementsByTagName('div');
	 	    var nodes;
 
			
			var layerIn = function(event) { 	
			
				var self = this;			    
				var id = parseInt(self.id.substr(4));

				screen.replaceCanvas(id);
				
 				helpers.clickNavBtn("selected")
				
				event.stopPropagation();
				
				event.preventDefault();
				return false;
			 
			};	
			
	
			
			var touchLayerIn = function(event) { 	
		
				  if(event !== undefined) event.stopPropagation();
		
				  var self = this;
				  var date = new Date();
				  
				  var dblTimer = date.getTime();
				   
				  if(dblDelay === undefined) dblDelay = 300;
				   
				  if(self.dblTimerMarker !== undefined) 
				  {

						if(dblTimer-self.dblTimerMarker<dblDelay){ 
								var id = parseInt(self.id.substr(4));
 
								screen.replaceCanvas(id);
								
								helpers.clickNavBtn("selected")
								
								event.preventDefault();
								return false;
								
						}						 
					}	
				  
				  self.dblTimerMarker =  dblTimer;				 
			};	

			var setdblTimer = function (node) {
					 
				if(node.dblTimerMarker !== undefined) return;
				
 			    var date = new Date();					  
				var dblTimer = date.getTime();					
				node.dblTimerMarker = dblTimer;
				

			}			
						
			var touchLayerOut = function(event) { 
 			
					  event.stopPropagation();	
					  
					  var self = this;
			          var date = new Date();
					  
					  var dblTimer = date.getTime();
 				
					  if(self.dblTimerMarker !== undefined) {
					   
						  if(dblTimer-self.dblTimerMarker<dblDelay){ 

						  
								var elemets = document.getElementsByTagName('div');
								var node;
								 
								for(var i=0; i<elemets.length; i++){
								 
									  if(elemets[i].className == "nodeParent") node = elemets[i]; 
								 
								}	

								if(node===undefined)  return;
				 
								var id = node.getAttribute("data-prev");

								var screen = new visualisationNodes(); 
								
								screen.replaceCanvas(id==-1?null:id);
				 
								
								helpers.clickNavBtn("selected")
								
								
								event.preventDefault();
								return false;
									 
									
						  } 
						 
					  }
					  
				      self.dblTimerMarker = dblTimer;
				
			};		 
 
			var layerOut = function(event) { 
 			

				var self = this;			    
 				
 				var elemets = document.getElementsByTagName('div');
				var node;
				 
   			    for(var i=0; i<elemets.length; i++){
				 
				      if(elemets[i].className == "nodeParent") node = elemets[i]; 
				 
				}	

				if(node===undefined)  return;
 
				var id = node.getAttribute("data-prev");
				
				var screen = new visualisationNodes(); 
				
 				screen.replaceCanvas(id==-1?null:id);
 
 				
 				helpers.clickNavBtn("selected")
				
 				event.stopPropagation();	
				
				event.preventDefault();
				return false;
				
			};		 
 
 
			
			var enable = function(){ 

				 elemets = document.getElementsByTagName('div');
				 nodes = [];
				 
   			     for(var i=0; i<elemets.length; i++){
				 
				      if(elemets[i].className == "node") nodes.push(elemets[i]); 
				 
				 }
				 
 
			     for(var i=0; i<nodes.length; i++){
				
					 nodes[i].addEventListener("dblclick", layerIn, false);					 
			         nodes[i].addEventListener("touchstart", touchLayerIn, false);
			         setdblTimer(nodes[i]);
   
 				 } 
					 document.addEventListener("dblclick", layerOut, false);	   
			         document.addEventListener("touchstart", touchLayerOut, false);
				 
 			}	

			var disable = function(){ 

			     for(var i=0; i<nodes.length; i++){
 
					 nodes[i].removeEventListener("dblclick", layerIn, false);	   
			         //nodes[i].removeEventListener("touchstart", layerIn, false);
   
 				 } 
					 document.removeEventListener("dblclick", layerOut, false);	   
			         //document.removeEventListener("doubletouch", layerOut, false);
					 
			}	


            return function(cmd){
			
				 this.enable = enable;
				 this.disable = disable;
				 
			}			
		 			   
	   })();