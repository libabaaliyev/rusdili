$(document).ready(function()
{

	function shuffle(array) {
	  array = array.sort(() => Math.random() - 0.5);
	  return array;
	}

	arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	arr1 = shuffle(arr);
	console.log(arr1);
});