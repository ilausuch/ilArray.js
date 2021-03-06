/*
    MIT LICENSE @2016 Ivan Lausuch <ilausuch@gmail.com>
*/

ilArray={
	accentFold:function(inStr) {
		if (inStr==undefined) return "";
		inStr=""+inStr;
		return inStr.toLowerCase().replace(/([àáâãäå])|([ç])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g, function(str,a,c,e,i,n,o,s,u,y,ae) { if(a) return 'a'; else if(c) return 'c'; else if(e) return 'e'; else if(i) return 'i'; else if(n) return 'n'; else if(o) return 'o'; else if(s) return 's'; else if(u) return 'u'; else if(y) return 'y'; else if(ae) return 'ae'; });
	}
}

Array.prototype.exists=function (obj) {
    return this.index(obj)!=undefined;
}

Array.prototype.add=function(obj,allowDuplicates){
    if (obj!=undefined && obj!=null && (allowDuplicates || !this.exists(obj)))
        this.push(obj);
    
    return this;
}

Array.prototype.addArray=function(array,allowDuplicates){
   	var current=this;
   	array.forEach(function(item){
	    current.add(item,allowDuplicates);
    },this)
    
    return this;
}

Array.prototype.del=function(obj){
    var index=this.index(obj);
    if (index==undefined)
    	return false;
    else
    	this.delByIndex(index);			
}

Array.prototype.delByField=function(field,value){
    var index=this.indexByField(field,value);
    if (index==undefined)
    	return false;
    else
    	this.delByIndex(index);
}

Array.prototype.delByIndex=function(index){
    this.splice(index,1);
}

Array.prototype.index=function(obj){
    for (var i=0; i<this.length; i++)
		if (this[i]==obj)
			return i;
			
	return undefined;
}

Array.prototype.indexByField=function(field,value){
    for (var i=0; i<this.length; i++)
		if (this[i][field]==value)
			return i;
			
	return undefined;
}

Array.prototype.clone=function(){
	var clon=[];
	this.forEach(function(item){clon.push(item);})
	
	return clon;
}

Array.prototype.intersectionWith=function(array){
	var intersection=[];
	
	this.forEach(function(item1){
		array.forEach(function(item2){
			if (item1==item2)
				intersection.push(item1);
		},intersection,item1)
	},intersection)
	
	return intersection;
}

Array.prototype.unionWith=function(array){
	var union=this.clone();
	
	array.forEach(function(item){
		if (union.index(item)==undefined)
			union.push(item)
	});

	return union;
}

Array.prototype.getByField=function(value,field){
	return this.searchOne(value,field,"=");	
}
	
Array.prototype.search=function (value, field, method,accentFold) {
	if (!Array.isArray(field))
		var fields=[field];
	else
		var fields=field;
		
	if (fields==undefined)	
		if (console) console.debug("Invalid fields");
		
	method=method || 'normal';

	var config=[];
	fields.forEach(function(field){
		config.push({field:field,method:method});	
	})
	
	return this.searchAdvanced(value,config,accentFold);
}

Array.prototype.searchOne=function (value, field, method,accentFold) {
	var res=this.search(value,field,method,accentFold);
	if (res==undefined)
		return undefined;
	else
		return res[0];
}

Array.prototype.searchAdvanced=function(value,config,accentFold){
	if (config==undefined)
		if (console) console.debug("Invalid config")
		
	if (accentFold==undefined)
		accentFold=true;
		
	if (accentFold)
		value=ilArray.accentFold(value);

	var list=[];
    
    this.forEach(function(item){
		config.forEach(function(filter){
			
			if (accentFold)
				ivalue=ilArray.accentFold(item[filter["field"]]);
			else
				ivalue=item[filter["field"]];
			
		    method=filter.method || 'normal';

		    switch (method){
				case "startWith":
				case "sw":
					if (ivalue.substr(0, value.length)==value)
						list.add(item);
				break;
				
				case "anyPosition":
				case "normal":
					if (ivalue.search(value)>=0)
						list.add(item);
				break;
				
				case "anyWord":
				case "aw":
					var search2=value.split(" ");
					if (search2!=undefined)
						search2.some(function(word){
							if (ivalue.search(word)>=0){
								list.add(item);
								return true;
							}
						});
							
				break;
				
				case "allWords":
					var search2=value.split(" ");
					if (search2!=undefined){
						var found=true;
						
						search2.forEach(function(word){
							if (ivalue.search(word)<0)
								found=false;
						});
						
						if (found)
							list.add(item);
					}
				break;
				
				case "fnc":
					if (filter["filter"](ivalue,value))
						list.add(item);
				break;
				
				case "completeWord":
				case "=":
				default:
					if (ivalue==value)
		    			list.add(item);
			} 
		});   
    })
    
    return list;
}

Array.prototype.sortAlphabeticallyByField=function(field,caseSensitive){
	function tr(value,caseSensitive){
		if (caseSensitive==undefined || caseSensitive)
			return value.toUpperCase();
	}
	
	this.sort(function(a, b){
	    if(tr(a[field],caseSensitive) < tr(b[field],caseSensitive)) return -1;
	    if(tr(a[field],caseSensitive) > tr(b[field],caseSensitive)) return 1;
	    return 0;
	});
}
