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

var elem = document.getElementById('tree-plugin'); //Element to append tree
var tree = new CheckBoxTree(data, elem); //Creating a new Checkbox Tree.
var results = document.getElementById('plugin-results');
var pArray = document.createElement('p');
var pObject = document.createElement('p');

//Listener added to show results.
tree.treeElement.addEventListener('change', function () {
	pArray.innerText = 'Selecteds Array: ' + tree.value.selectedsArray; //Geting the array of selected checkboxes
	pObject.innerText = 'Selecteds Object: ' + JSON.stringify(tree.value.dataObject); //Getting the Javascript Object with detailed info.
});
results.appendChild(pArray);
results.appendChild(pObject);