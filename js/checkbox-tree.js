
var CheckBoxTree = function (treeArray, treeElement) {
	this.treeArray = treeArray ? (JSON.parse(JSON.stringify(treeArray))) : null; //Cloning the data
	this.value = {
		selectedsArray: null,
		dataObject: null
	}
	this.treeElement = treeElement;
	this.nodes = null;
	this.checkboxTree = null;
	this.init(this.treeArray);
}

CheckBoxTree.prototype = {
	getNodes: function (treeArray) {
		var nodes = [];
		for (var i = 0; i < treeArray.length; i++){
			nodes.push(treeArray[i].categoryName);
			if(treeArray[i].subCategories)
				nodes = nodes.concat(this.getNodes(treeArray[i].subCategories));
		}
		return nodes;
	},
	createCheckbox: function (text) {
		var li = document.createElement('li');
		var checkBox = document.createElement('input');
		var label = document.createElement('label');

		li.appendChild(checkBox);
		li.appendChild(label);

		label.innerText = text;

		checkBox.label = text;
		checkBox.type = 'checkbox';

		return li;
	},
	createCheckboxTree: function (treeArray, parentCategory) {
		var mainList = document.createElement('ul');

		for (var i = 0; i < treeArray.length; i++){

			var li = this.createCheckbox(treeArray[i].categoryName);
			treeArray[i].checkbox = li.firstChild;
			treeArray[i].selected = false;
			if(parentCategory)
				treeArray[i].parentCategory = parentCategory;
			if(treeArray[i].subCategories)
				li.appendChild(this.createCheckboxTree(treeArray[i].subCategories, treeArray[i].categoryName));
			mainList.appendChild(li);
		}
		this.value.dataObject = treeArray;
		return mainList;
	},
	addCheckboxListeners: function (tree) {
		var checkboxes = tree.querySelectorAll('input[type="checkbox"]');
		for (var i = 0; i < checkboxes.length; i++) {
			checkboxes[i].addEventListener('change', this.nodeSelected.bind(this), false);
			checkboxes[i].addEventListener('change', function() {
				this.value.selectedsArray = this.getSelectedNodes(this.checkboxTree);
			}.bind(this));
			checkboxes[i].addEventListener('change', function() {
				this.value.dataObject = this.getSelectedNodesObject(this.checkboxTree);
			}.bind(this));
		}
	},
	nodeSelected: function (evt) {
		var category = evt.srcElement.parentNode.querySelector('label').innerText;
		var node = this.searchNode(this.value.dataObject, category);
		node.selected = node.checkbox.checked;
		this.setChildsSelected(node);
		if (node && node.checkbox.checked)
			this.setParentsSelected(node);
	},
	searchNode: function (treeArray, category) {
		var node = null;
		for (var i = 0; i < treeArray.length; i++) {
			if (treeArray[i].categoryName === category){
				treeArray[i].selected = true;
				node = treeArray[i];
				break;
			}
			else {
				if (treeArray[i].subCategories)
					node = this.searchNode(treeArray[i].subCategories, category);
				if (node)
					break;
			}
		}
		return node;
	},
	setParentsSelected: function (node) {
		node.checkbox.checked = true;
		node.selected = true;
		if (node.parentCategory)
			this.setParentsSelected(this.searchNode(this.value.dataObject, node.parentCategory));
	},
	setChildsSelected: function (node) {
		if (node.subCategories) {
			for (var i = 0; i < node.subCategories.length; i++) {
				node.subCategories[i].checkbox.checked = node.checkbox.checked;
				node.subCategories[i].selected = node.checkbox.checked;
				this.setChildsSelected(node.subCategories[i]);
			}
		}
	},
	getSelectedNodes: function (tree) {
		var descendants = tree.querySelectorAll('input[type="checkbox"]');
		var checkedItems = [];
		for (var i = 0; i < descendants.length; i++) {
			if (descendants[i].checked) {
				checkedItems.push(descendants[i].parentNode.querySelector('label').innerText);
			}
		}
		return checkedItems;
	},
	getSelectedNodesObject: function (tree) {
		var descendants = tree.querySelectorAll('input[type="checkbox"]');
		var selectedsObject = this.value.dataObject;
		var checkedItems = [];
		for (var i = 0; i < descendants.length; i++) {
			if (descendants[i].checked) {
				selectedsObject = this.setSelectedProperty(descendants[i].parentNode.querySelector('label').innerText, selectedsObject);
			}
		}
		return selectedsObject;
	},
	setSelectedProperty: function (label, dataObject) {
		for (var i = 0; i < dataObject.length; i++) {
			if (dataObject[i].categoryName === label){
				dataObject[i].selected = true;
				return dataObject;
			}
			if (dataObject[i].subCategories)
				this.setSelectedProperty(label, dataObject[i].subCategories);
		}
		return dataObject;
	},
	init: function (treeArray) {
		if (this.treeArray && this.treeElement) {
			this.checkboxTree = this.createCheckboxTree(treeArray);
			this.treeElement.appendChild(this.checkboxTree);
			this.nodes = this.getNodes(treeArray);
			this.addCheckboxListeners(this.checkboxTree);
		}
	},
	setData: function (data) {
		this.treeArray = (JSON.parse(JSON.stringify(data))); //Cloning the data array.
		return this;
	},
	setElementToRender: function (element) {
		this.treeElement = element;
		return this;
	},
	render: function () {
		this.init(this.treeArray);
		return this;
	}
}