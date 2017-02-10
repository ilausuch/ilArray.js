# ilArray.js
This is an extension of Array class

> **Important!**
> Don't use for, use instead forEach <pre>for (var i in list) {...} //Wrong
> list.forEach(function(item){...}) //Correct</pre> This is dangerous because returns prototype functions as array items


## check object

* **exists(obj)**: Return true if object exists in array

## addition
You can use push, but there are other options:

* **add(obj,allowDuplicates)**: Add an object. By default allowDuplicates is false, in this case, if object already exists won't be added.

* **addArray(array,allowDuplicates)**: Add each item of provided array to this. By default allowDuplicates is false, in this case, if a object already exists won't be added.

## Delete
* **del(obj)**: Del an object
* **delByField(field,value)**: Del an object when **value** in **field** match with provided
* **delByIndex(index)**: Del an object in defined index

## Indexes
* **index(obj)**: Get index of object
* **indexByField(field,value)**: Get index of first object that match with **value** in **field** provided

## Set operations
* **clone()**: Clone this array and returns an other equivalent
* **intersectionWith(array)** Returns the intersenction between this array an provided.
* **unionWith(array)**: Returns the union between this array and provided, don't allow duplicates

## Get & search
* **getByField(value,field)**: Returns the first object matches with the **value** in **field**

* **search(value,field,method,accentFold)**: Returns the list of objects than matche with **value** in **field** using a method comparation (anyPosition,startWith,anyWord,completeWord). 

	* method (optional, by default is normal)
	* accentFold (optional, by default is true):  

* **searchOne(value,field,method,accentFold)**
* **searchAdvanced(value,config,accentFold)**

### Advanced cofiguration: methods

There are 4 comparation methods:
* **anyPosition** ( alias: '**normal**', by default): search-cad can be in any position of value
* **startWith** ( alias: '**sw**'): Value must start with search-cad
* **anyWord** ( alias: '**aw**'): search-cad is divided as words (using space) for each one is equivalent a anyPosition
* **completeWord** ( alias: '**=**'): Value must be equal to search-cad
* **allWords**:  search-cad is divided as words (using space) for each one. All words must apply anyPosition

## Sort
* **sortAlphabeticallyByField(field)**: sort an array alphabetically using a field