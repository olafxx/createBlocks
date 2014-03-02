  var saveToStorage = (function () {	
            
			
			var getParentId = function() { 
				
				return helpers.getParentId();
			
			};
			
			
			var getLastId = function() { 
			
				return helpers.getLastId();
			
			};
			
			
			
			var getTree = function() { 
				
				var bd = storage.visual();

 				var parentId = getParentId();	
 
	 
				var elements = helpers.getVisualNodes();
				var marker = true;
 				
 			 
				var roundTree = function(branch){
 				
					if(branch===null){
 			
					   var node = helpers.getVisualNodes();
				      
						if(node.length==0) return;	
 				
						node = node[0];			    
				   
					    template = {
									id:   helpers.getId(node),
									parent_id:parentId,
									level:0,

									step1css:{
									  left:node.style["left"],
									  top:node.style["top"],
									  width:node.style["width"],
									  height:node.style["height"] 			  
									},			
									
									attrStep1: {
										class: "node",
										id:node.id
									},
									
									child: null
								};
 
								  bd = {};
								  bd["0"] = template; 								   
					
					}else {
						 		
 							for(val in branch){ 
 				
								if(branch[val].id == parentId || parentId === null)
								{
										 
									var subBranch;
						
									 for(key in elements){
									 
 				
										if(parentId === null) {
										
 				
											subBranch = branch;
											
										}else{
										    
 				
											if(branch[val].child === null)  branch[val].child = {};
											subBranch = branch[val].child;
											
										}
										
 										var compareId = false;
 		
			
 			  
												for(keySB in subBranch){
												   
 				
													 elementId = helpers.getId(elements[key]);
												 
														if(elementId == subBranch[keySB].id){
													  
 				
															  for(item in branch[val].step1css){
														
 				
																	subBranch[keySB].step1css[item] = elements[key].style[item];
															  }
												  
															  compareId = true;	
															  
														 }
												 
												}
												
 										
  
										   
										if(!compareId){
 				
										   var node = elements[key];
										   var num = helpers.objLength(subBranch);
					
 
											template =   {
														id:   helpers.getId(node) ,
														parent_id:parentId,
														level:0,

														step1css:{
														  left:node.style["left"],
														  top:node.style["top"],
														  width:node.style["width"],
														  height:node.style["height"] 			  
														},			
														
														attrStep1: {
															class: "node",
															id:node.id
														},
														
														child: null
													};

			
											 subBranch[num] = template;
 				
 		 
										}
										
									 }
									   
								}else if(marker){
								  
   				                    if(branch[val].child  === null)  branch[val].child = {};
									roundTree(branch[val].child);
								} 
								
							}
							
					}
					
							 
				}		

				roundTree(bd);	

	            return bd;	
			
			};
			
			
			var fwrite = function(obj){
 
			   helpers.fwrite("storageVisual", obj);

			}			
						
			
			var refresh = function() {
		 
			    setTimeout(function(){ 
				
					var tree = getTree();	
					
					fwrite(tree);
					
				},0)	
			
			
			};
			
			
			
			var getBranch = function(id) {
			     
				var bd = storage.visual();
				var tmp = "";
 				var parentId = id;	  
 				var marker = true; 				
 			 
			 
				var roundTree = function(branch){
				  
					for(val in branch){ 
					 
						if(branch[val].id == parentId)
						{ 
							tmp =   branch[val];	
							return; 				
							 
						}else{

							if(branch[val].child  === null)  branch[val].child = {};
							roundTree(branch[val].child);
							
						} 
						
					}
					
							 
				}	

				roundTree(bd)				
	            return tmp;					 
 			} 
			
			
			var douplicateBranch = function() {
   				 
  						var tree = getTree();
						var branch = getBranch(globalParentId);
						
 						branch = helpers.refreshId(branch);
						
						tree = helpers.margeTree(tree,globalChildId,branch);
  	 
						fwrite(tree);	
			
			};
			

            return function(){
			
			    this.douplicateBranch = douplicateBranch;
			    this.refresh = refresh;
 				 
			}			
		 			   
	   })();