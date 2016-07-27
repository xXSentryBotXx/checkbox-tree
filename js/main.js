//First example tree:
(function () {
	//Data object structure:
	var data = [{
			categoryName: 'Category 1',
			subCategories: [{
				categoryName: 'Subcategory 1-1',
				subCategories: [{
					categoryName: 'Subcategory 1-1-1',
				}]
			},
			{
				categoryName: 'Subcategory 1-2',
				subCategories: []
			},
			{
				categoryName: 'Subcategory 1-3'
			}]
		},
		{
			categoryName: 'Category 2',
			subCategories: [{
				categoryName: 'Subcategory 2-1',
				subCategories: [{
					categoryName: 'Subcategory 2-1-1'
				}]
			},
			{
				categoryName: 'Subcategory 2-2',
				subCategories: [{
					categoryName: 'Subcategory 2-2-1',
					subCategories: []
				},
				{
					categoryName: 'Subcategory 2-2-2',
					subCategories: [{
						categoryName: 'Subcategory 2-2-2-1'
					}]
				},
				{
					categoryName: 'Subcategory 2-2-3',
					subCategories: []
				}]
			},
			{
				categoryName: 'Subcategory 2-3',
				subCategories: []
			},
			{
				categoryName: 'Subcategory 2-4',
				subCategories: []
			}]
		},
		{
			categoryName: 'Category 3',
			subCategories: []
		}
	];

	var elem = document.getElementById('first-tree'); //Element to append tree
	var tree = new CheckBoxTree(data, elem); //Creating a new Checkbox Tree.
	var resultArray = document.getElementById('array');
	var resultObject = document.getElementById('object');
	var pArray = document.createElement('p');
	pArray.id = 'result-array';
	var pObject = document.createElement('pre');

	document.getElementById('first-tree').style.display = 'block'; //Displaying first tree whe loading.

	resultArray.appendChild(pArray);
	resultObject.appendChild(pObject);

	pArray.className += ' tabcontent';
	pObject.className += ' tabcontent';
	pArray.className += ' first-tree';
	pObject.className += ' first-tree';

	function callback () {
		pArray.innerText = tree.value.selectedsArray; //Getting the array of selected checkboxes
		pObject.innerText = JSON.stringify(tree.value.dataObject, null, 2); //Getting the Javascript Object with detailed info.
	}

	//Listener added to show results.
	tree.treeElement.addEventListener('change', callback);
	callback();
})();

//Second example tree:
(function () {
	//Data object structure:
	var data = [{
			categoryName: 'Category 1',
			subCategories: [{
				categoryName: 'Subcategory 1-1'
			},
			{
				categoryName: 'Subcategory 1-2',
				subCategories: []
			},
			{
				categoryName: 'Subcategory 1-3'
			}]
		},
		{
			categoryName: 'Category 2',
			subCategories: [{
				categoryName: 'Subcategory 2-1',
				subCategories: [{
					categoryName: 'Subcategory 2-1-1'
				}]
			},
			{
				categoryName: 'Subcategory 2-2',
				subCategories: [{
					categoryName: 'Subcategory 2-2-1',
					subCategories: []
				},
				{
					categoryName: 'Subcategory 2-2-2'
				},
				{
					categoryName: 'Subcategory 2-2-3',
					subCategories: []
				}]
			},
			{
				categoryName: 'Subcategory 2-3',
				subCategories: []
			},
			{
				categoryName: 'Subcategory 2-4',
				subCategories: []
			}]
		},
		{
			categoryName: 'Category 3',
			subCategories: []
		}
	];

	var elem = document.getElementById('second-tree'); //Element to append tree
	var tree = new CheckBoxTree(); //Creating a new instance of CheckboxTree.

	tree.setData(data);
	tree.setElementToRender(elem);
	tree.render();

	var resultArray = document.getElementById('array');
	var resultObject = document.getElementById('object');
	var pArray = document.createElement('p');
	pArray.id = 'result-array';
	var pObject = document.createElement('pre');

	resultArray.appendChild(pArray);
	resultObject.appendChild(pObject);

	pArray.className += ' tabcontent';
	pObject.className += ' tabcontent';
	pArray.className += ' second-tree';
	pObject.className += ' second-tree';

	function callback () {
		pArray.innerText = tree.value.selectedsArray; //Geting the array of selected checkboxes
		pObject.innerText = JSON.stringify(tree.value.dataObject, null, 2); //Getting the Javascript Object with detailed info.
	}

	//Listener added to show results.
	tree.treeElement.addEventListener('change', callback);
	callback();
})()

function openMethod(evt, method) {

    var i, tabcontent, tablinks, elems;

    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    elems = document.getElementsByClassName(method);

    console.log(elems);

    for (i = 0; i < elems.length; i++) {
    	elems[i].style.display = 'block';
    }
    evt.currentTarget.className += ' active';
}
