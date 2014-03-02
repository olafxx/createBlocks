  var removeTag = (function () {	
 
 
 
			var getTree = function(node) { 
				
				var bd = storage.visual();

 				var delId = helpers.getId(node);	
 
	
 				var marker = true;
 				var tmp;
  				 
				var roundTree = function(branch){
 				
	 		
 							for(val in branch){ 
 				
								if(branch[val].id == delId)
								{
 				 						
									delete branch[val];			 					  
   									marker = false;
									 
								}else if(marker){
								  
   				                    if(branch[val].child  === null)  branch[val].child = {};
									roundTree(branch[val].child);
								} 
								
							}
							
 					
							 
				}		

				roundTree(bd);	

	            return bd;	
			
			};
			
			
			var fwrite = function(obj){

			   helpers.fwrite("storageVisual", obj);

			}			
						
			
			var refresh = function(node) {
			   
				var tree = getTree(node);
		
				fwrite(tree);
				
			    
				var id = helpers.getParentId();

				screen.replaceCanvas(id);				
 		 
			    helpers.clickNavBtn("remove");
				
			}; 


            return function(){
			     
				 this.node = refresh;
 			
			}			
		 			   
	   })();