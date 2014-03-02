  var visualisationNodes = (function () {	
            
			var parentId = null; 
			var bdCommon = null; 
			var bdScreen = null; 
			var nodes = [], str = "";
 			
			var getScreenNodes = function(){
			
				var elemets = document.getElementsByTagName('div');
				nodes = [];
				 
				 for(var i=0; i<elemets.length; i++){
				 
					  if(elemets[i].className == "node" || elemets[i].className == "nodeParent") nodes.push(elemets[i]); 
				 
				 }			
			
			    return nodes;
			
			}
	 			
			var getChildNodes = function(option) {
			
			     var bd = storage.visual();
				 
 				 var list = [];
 				 var id = option !== undefined ? option : null; 
				 var marker = true;
 
 
				var roundTree = function(branch){

 		 		   
					for(val in branch){ 
	
 						if(branch[val].id == id || id === null){								 
							
							var subBranch;
							
							if (id === null){
							
							    subBranch = branch;
 							
							}else{
						
							    subBranch = branch[val].child; 
							
							}  							
							 
							for(val in subBranch){ 	

							     var self = document.createElement("div");

								 str = "";
								 
								 for(key in subBranch[val].attrStep1){
									self.setAttribute(key,subBranch[val].attrStep1[key]);
								 }
								
								 for(key in subBranch[val].step1css){
									str += key+":"+subBranch[val].step1css[key]+"; ";
								 }
								 
								 self.setAttribute('style',str);
 								  
								 list.push(self); 
								 
							}
							
				            marker = false;
							
							return list; 
                        
	 
						}else if(marker){
						  
							roundTree(branch[val].child);
 						} 
						
					}
					 
				}	
 
			    roundTree(bd); 
   
				return list.length === 0  ? null : list;
						
			};
			
	 			
			var getParentNode = function(option) {
			
			     var bd = storage.visual();	
 				 var id = option !== undefined ? option : null; 
				 var self = {};
 
				 var marker = true;
			
				if (id === null) return null; 
				
 	 
				var roundTree = function(branch){

 		 		   
					for(val in branch){ 

 						if(branch[val].id == id){
 								  
							 self = document.createElement("div");
							 
							 str = "";
							 
							 for(key in branch[val].step1css){
								str += key+":"+branch[val].step1css[key]+"; ";
							 }
							 
							 self.setAttribute('style',str);
							 self.setAttribute('class',"nodeParent");
							 self.setAttribute('id',"nodeParent"+id);
							 
							 var parent_id = branch[val].parent_id;
							 						 
							 if(parent_id===null) parent_id = -1;
							 self.setAttribute('data-prev',parent_id);
 				             marker = false;
 
	 
						}else if(marker){
						  
							roundTree(branch[val].child);
 						} 
						
					}
					 
				}		

			    roundTree(bd);		
				
                return self;				
			};
			
			
			var replaceCanvas = function(id) {
			    
 				var id = id !== undefined ? id : null; 
			 
				var listChild = getChildNodes(id);
				var parentBlock = getParentNode(id);
				
				var list = []; 

				if(listChild !== null) list = listChild;
				if(parentBlock !== null) list.push(parentBlock);
 				
			    clearCanvas();
				
 	 
				for(var i=0; i<list.length; i++){				
				    layout.appendChild(list[i]);
				}
			
			};
			

			var clearCanvas = function() {
			
				 nodes = getScreenNodes();				 
				 
				 for(var i=0; i<nodes.length; i++){
					 layout.removeChild(nodes[i]);
				 };
			
			};


            return function(){
			
			    this.replaceCanvas = replaceCanvas;
				 
			}			
		 			   
	   })();