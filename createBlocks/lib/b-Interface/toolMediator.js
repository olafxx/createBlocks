  var toolMediator = (function () {	
            
			var event = new window.event(); 
			var elemets = document.getElementsByTagName('div');
	 	    var nodes, cmd;

     
			
			var enable = function(){ 
 				 		 
				 elemets = document.getElementsByTagName('div');
				 nodes = [];
				 
   			     for(var i=0; i<elemets.length; i++){
				 
				      if(elemets[i].className == "node") nodes.push(elemets[i]); 
				 
				 }
 
			     for(var i=0; i<nodes.length; i++){
				
					 nodes[i].addEventListener("mousedown",  event[this.cmd], false);	   
			         nodes[i].addEventListener("touchstart", event[this.cmd], false);
   
 				 } 
				 
 			}	

			var disable = function(){
	
				if (typeof nodes === "undefined") return;
 				
 			     for(var i=0; i<nodes.length; i++){
				 
					 nodes[i].removeEventListener("mousedown",  event[this.cmd], false);	   
			         nodes[i].removeEventListener("touchstart", event[this.cmd], false);
  
 				 } 
 				 
			}	


            return function(cmd){
			
			     this.cmd = cmd; 
				 this.enable = enable;
				 this.disable = disable;
				 
			}			
		 			   
	   })();