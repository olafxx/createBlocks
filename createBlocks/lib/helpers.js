  var helpers = (function () {	
			  		
			var fread = function(link) {
			
			    var obj;
			    
				$.ajax({
					async: false,
					url: link,
					cache: false,
					success: function(data){
					   try{
						
					   	   if(objLength(data)===0) {
						       obj = JSON.parse("null");
						   }else{
							   obj = JSON.parse(data);
						   } 
						   
						  
						}catch(err){
 						   obj = JSON.parse("null"); 
						}   
					}
				});	
				
				return obj;	 
			 			
			};
			
			
			var clickNavBtn = function(id) {
			  
			    if(id=="selected"){
				 
				    var elemets = document.getElementsByTagName('span');
					var node;
					 
					for(var i=0; i<elemets.length; i++){
					 
						  if(elemets[i].className == "btn "+id) node = elemets[i]; 
					 
					}
 					   
		        }else{
				
					var node = document.getElementById(id);
				   
		        }
				
				if(node === null) return;
				
				var evt = document.createEvent("HTMLEvents");
				evt.initEvent("mousedown", true, true); 					
				node.dispatchEvent(evt);
				  
			};
			
			var numericObj = function(obj) {
			   
                
				var bd = obj;

				var roundTree = function(branch){
 		 		    
					var count = 0;
					var numericBd = {};
					
					for(val in branch){ 
					
						branch[count] = branch[val];
						if(count != val) { 
							delete branch[val] 
						}
 					
						if(branch[count].hasOwnProperty("child")) 
						{
						  if(objLength(branch[count].child) !==0){ 
							 roundTree(branch[count].child);
						  }
						}
							count++;

  
 					}
					 
				}	
 
			    roundTree(bd); 
			 	
				
 
			 	 
return 	obj;			
			};
			
			var fwrite = function(file, obj) {
			    
			 var obj = numericObj(obj);
			 
			  $.ajax({
					async: false,
					data: {
					    data:JSON.stringify(obj),
						file:file,
						projectName:projectName
					},
					cache: false,
					type : "POST",
					url: "lib/storage/save.php",
					success:function(data){  /*console.log("success: "+data)*/ },	
					error:function(err){ /*console.log("err: "+err)*/ } 					 
				});		 
			 		 	
			};
			
			var objLength = function(obj) {
			    
				var count = 0;
			
				for(key in obj){ 
				
					if (obj[key]=="{" || obj[key]=="}") continue;
 					count++;
  						
				}		 
			
				return count;
			
			};
			
			
			var sleep = function(ms) {
				ms += new Date().getTime();
				while (new Date() < ms){}
			} 				
			
			
			var getVisualNodes = function() {
			    
				var id = null;
			
 				var elemets = document.getElementsByTagName('div');
	 			var list = [];	 
				 
   			    for(var i=0; i<elemets.length; i++){	
				 
				      if(elemets[i].className == "node") {					
						list.push(elemets[i]);
					  }	
				 
				}
				

	
				return list;
			
			};
			
			var getParentId = function() {
			    
				var id = null;
			
 				var elemets = document.getElementsByTagName('div');
				var node;
				 
   			    for(var i=0; i<elemets.length; i++){
				 
				      if(elemets[i].className == "nodeParent") {						
						node = elemets[i];
                        continue;
					  }	
				 
				}
				
				if(node !== undefined){
				   id = parseInt(node.id.substr(10));
                }
				
				return id;
			
			};
			
			var getId = function(node) {
			    
			    var node = node;
				var id = null;
				
				if(node !== undefined){
				   id = parseInt(node.id.substr(4));
                }
				
				return id;
			
			};
			
			
			var getLastId = function() {
			    
			    var id = 0;	
				
			    var bd = storage.visual();	
				 
				var roundTree = function(branch){

 		 		   
					for(val in branch){ 
 
                        if(id<branch[val].id) id = branch[val].id;
						
						roundTree(branch[val].child);
 						
					}
					 
				}		

			    roundTree(bd);

 				
				return id;				 
			
			};
			
			
			
			var margeTree = function(bd,id,branch) {
 		
 			    var id = id;   
 				var newBranch = branch;

				var roundTree = function(branch){
					 	   
					for(val in branch){
 
						if(branch[val].id == id) { 
							branch[val] = newBranch;  
							return;							
						} 
					
						roundTree(branch[val].child);
						
 					}	
						
				}		
				roundTree(bd);
				 
	            return bd;					 
 			  
			};
			
			
			var refreshId = function(branch) {

  			    var lastId = getLastId();
				var count = 0; 
				
				var roundTree = function(branch){
				 
					
					branch.id = ++lastId; 					 	  
					branch["attrStep1"].id = branch["attrStep1"].class + branch.id; 					 	  
					
					if(count != 0) branch.parent_id = lastId - 1; 
					count++;
					
					if(branch.child  === null)  branch.child = {};
					
					for(val in branch.child){
					
						roundTree(branch.child[val]);
						
 					}	
						
 					return branch		 
				}		
 
	            return roundTree(branch);					 
 			  
			};
			
			
			
			
			var refresh = function() {
			
			
			
			};
			

            return function(){
			
			    this.sleep = sleep;
			    this.fread = fread;
			    this.fwrite = fwrite;
			    this.getId = getId;
			    this.margeTree = margeTree;
			    this.refreshId = refreshId;
			    this.clickNavBtn = clickNavBtn;
			    this.objLength = objLength;
			    this.getLastId = getLastId;
			    this.getParentId = getParentId;
			    this.getVisualNodes = getVisualNodes;
				 
			}			
		 			   
	   })();