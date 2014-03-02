  var createTag = (function () {	
 
			var ants;
	 
			var bildingTag = function () {
  
				var square = ants.getSquare();
				var koef = 10;
				
 				if(square.width){
				
                   if(square.width<koef || square.height<koef) return;
				   
				   new node({"top":square.top,"left":square.left,"width":square.width,"height":square.height}).add();
				   
				}   
				
			}
 
				
			var enable = function(){
 
				ants = new window.ants();
				ants.init();
				
 				document.addEventListener("mouseup", bildingTag, false);	
				document.addEventListener("touchend", bildingTag, false);	
				
 			}	

			var disable = function(){
	
				if (typeof ants === "undefined") return;
				 ants.remove();						
				 document.removeEventListener("mouseup", bildingTag, false);	
				 document.removeEventListener("touchend", bildingTag, false);
 				 
			}	


            return function(){
			     
				 this.enable = enable;
				 this.disable = disable;
			
			}			
		 			   
	   })();