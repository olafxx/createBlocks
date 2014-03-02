  var ants = (function () {	
		   
		   var count = 0;
  		   
		   return function(options){
 		        
			   if (typeof options === "undefined")  options = {};
				   
			   var startX = 0;
			   var startY = 0;		   
			   
			   var square = {
				  top   : 0,
				  left  : 0,
				  width : 0,
				  height: 0
			   };
				   
	           var setting = {
			       cursor     : typeof options.cursor === "undefined" ? 'default' : options.cursor,
			       border     : typeof options.border === "undefined" ? '1px dashed #000' : options.border,
			       background : typeof options.background === "undefined" ? 'transparent' : options.background,
				   str        : "",
				   zIndex     : 99
 			   }
			   
			   var self;
	   
		       count++;
		
				var attrStep1 = {
					id : "ants"+count				
				};			

				var style = {
					position   : 'absolute',
					cursor     : setting.cursor,
					border     : setting.border,
					opacity    : setting.opacity,
					background : setting.background,
					"z-index"  : setting.zIndex
				};			
 
                this.init = function(){
				   
				   document.addEventListener("mousedown", eventStart, false);	   
				   document.addEventListener("touchstart", eventStart, false);

				}
				
                this.remove = function(){
				 
				   document.removeEventListener("mousedown", eventStart, false);	   
				   document.removeEventListener("touchstart", eventStart, false);
				   document.removeEventListener("mousemove", eventMove, false);	
				   document.removeEventListener("touchmove", eventMove, false); 		
			       document.removeEventListener("mouseup", eventEnd, false);	
			       document.removeEventListener("touchend", eventEnd, false);		

				}
				
               this.getSquare = function(){ 

					var obj = square;
					
					var obj = {
					   top   : square["top"],
					   left  : square["left"],
					   width : square["width"],
					   height: square["height"]					
					};
					
					square["top"] = square["left"] = square["width"] = square["height"] = 0;
 
					return obj;

  
				}
 			 
			 
			    var eventEnd = function(e) { 				 
 				  	
				    document.removeEventListener("mousemove", eventMove, false);	
 				    document.removeEventListener("touchmove", eventMove, false);
					
					if(self !== undefined){
						if(self.parentNode !== null){
							square["top"] = self.offsetTop;
							square["left"] = self.offsetLeft;
							square["width"] = self.offsetWidth;
							square["height"] = self.offsetHeight;

							self.parentNode.removeChild(self);
						}
					}	
						
   			    }; 
				
			    var eventStart = function(event) { 
				
				    e = mEvent(event);
				
 	                self = document.createElement("div");
				 
					for(key in attrStep1){
						self.setAttribute(key,attrStep1[key]);
					}				
					
					for(key in style){
						setting.str += key+":"+style[key]+"; ";
					}

		          	self.setAttribute('style',setting.str);			   
 
 				    layout.appendChild(self);				 
 				 
					startY = e.clientY + document.body.scrollTop; 
					startX = e.clientX - layout.offsetLeft + document.body.scrollLeft; 
					if(isNaN(startX) || isNaN(startX)) eventEnd()
				 	 
				    document.addEventListener("mousemove", eventMove, false);	
				    document.addEventListener("touchmove", eventMove, false); 				    			 
					
				    event.preventDefault(); 				 
			    };	
				
			    var eventMove = function(event) {

				    e = mEvent(event);
					

					if(startX>(e.clientX - layout.offsetLeft + document.body.scrollLeft)){
					
						 self.style["left"]  = e.clientX  + document.body.scrollLeft - layout.offsetLeft + "px";
						 
						 
						 self.style["right"] = layout.offsetWidth - startX + "px";
 						 
					}else{
					 
						 self.style["left"]  = startX + "px";
 						 self.style["right"]  = (layout.offsetLeft + document.body.scrollLeft + layout.offsetWidth) - e.clientX + "px";
  
 					}
					
					if(startY>(e.clientY + document.body.scrollTop)){
				
						 self.style["top"]  = e.clientY + document.body.scrollTop + "px";
						 self.style["bottom"] = layout.offsetHeight - startY + "px";
 						 
					}else{

						 self.style["top"]  = startY + "px";
						 self.style["bottom"]  = layout.offsetHeight - e.clientY - document.body.scrollTop + "px";
						  
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
				
				
			    document.addEventListener("mouseup", eventEnd, false);	
			    document.addEventListener("touchend", eventEnd, false);		
	 
		     };

			 
		 			   
	   })();