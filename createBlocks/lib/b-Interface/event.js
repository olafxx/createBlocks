  var event = (function () {	
 
                var self, type="";
				
				var setting = {
				    clickX : 0,
				    clickY : 0,
					zIndex : 1,
					width  : 0,
					height : 0
					}
	
	
			
			    var remove = function(event) {
				
					var self = this;
  					
					removeTag.node(self);
					
					event.preventDefault();

			    };	
 			
			    var blank = function(event) {
				 
			    };	

			    var duplicate = function(event) { 
  
				    self = this;
		 		 
				    globalParentId = helpers.getId(self);
 				
				    var newNode = new node({"top":self.offsetTop,"left":self.offsetLeft,"width":self.offsetWidth,"height":self.offsetHeight}).add();
				    
					self = newNode;
 					
				    globalChildId = helpers.getId(self);
					
					setting["zIndex"] = self.style["z-index"];
					eventStart(event);
 
 					self.addEventListener("mouseup",  saveToStorage.douplicateBranch, false);	 
					document.addEventListener("touchend", saveToStorage.douplicateBranch, false);
  					
					self.addEventListener("mouseup",  eventEnd, false);	
					document.addEventListener("touchend", eventEnd, false);	
 					 
			    };	

				
			    var move = function(event) { 	
				
				    self = this;
					setting["zIndex"] = self.style["z-index"];
					eventStart(event);
					
					self.addEventListener("mouseup",  eventEnd, false);	
					self.addEventListener("touchend", eventEnd, false);	
				 
			    };	

				
			    var resize = function(event) { 	
				    
					type = "resize";
				    self = this;
					setting["width"] = self.offsetWidth;
					setting["height"] = self.offsetHeight;
				    move.call(self, event);	
				 
			    };	

				
			    var eventStart = function(event) { 	
				
				    e = mEvent(event);
			 
 					self.style["z-index"] = 99;					
					setting.clickX = e.clientX - self.offsetLeft;
					setting.clickY = e.clientY - self.offsetTop;

				    document.addEventListener("mousemove", eventMove, false);	
					document.addEventListener("touchmove", eventMove, false);	
					
					event.preventDefault();
					 
			    };		
		
			    var eventEnd = function() {	
				
   					self.style["z-index"] = setting.zIndex;
  
 					document.removeEventListener("mousemove", eventMove, false);	
 					document.removeEventListener("touchmove", eventMove, false);
					
					self.removeEventListener("mouseup", saveToStorage.douplicateBranch, false);	
 					document.removeEventListener("touchend", saveToStorage.douplicateBranch, false);
 					document.removeEventListener("touchend", eventEnd, false);
				    helpers.clickNavBtn("selected");
					
                    type = "";					
					
			    }; 

			    var eventMove = function(event) {
   
				    e = mEvent(event);
					
					var sst = self.style;
					 
					switch(type){
					
						case "resize":
							sst["width"] = e.clientX - (setting.clickX + self.offsetLeft) + setting["width"] + "px";
							sst["height"] = e.clientY - (setting.clickY + self.offsetTop) + setting["height"] + "px";
 
 							break;
							
						default:
							sst["left"] = e.clientX - setting.clickX +"px";		   
							sst["top"]  = e.clientY - setting.clickY +"px";						
							break;
					}								 	
					
					event.preventDefault();
					
			    };
				
				
				
                var mEvent = function (event) {
				
					if(typeof event.touches === "undefined") {
						e = event;
				    }else{
						e = event.touches.item(0);
				    }
                    return e;
				
				}		

              var disableSelected = function (node) {
				
					$(node).on("mousedown", function(){ return false; });	
				
				}
						

            return function(){
			     
 				 this.blank = blank,
 				 this.duplicate = duplicate,
 				 this.move = move,
 				 this.resize = resize,
 				 this.remove = remove,
 				 this.disableSelected = disableSelected
			
			}			
		 			   
	   })();
	 