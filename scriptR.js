
var button = document.getElementById("back_btn");

button.onmousedown = function()
{
	window.location.href="index.html";
}

function updateContent() 
{
   var nr = localStorage.getItem("currentRecipe") - 1;
   console.log(nr);
  
     
   fetch('http://localhost:3000/retete')
			  .then(
			    function(response) {
			      if (response.status !== 200) {
			        console.log('Looks like there was a problem. Status Code: ' +
			          response.status);
			        return;
			      }

			      // Examine the text in the response
			      response.json().then(function(data) {

			      	var image = document.getElementById("imag");
			      	image.src = data[nr].srcL;

			      	var ingredients = document.getElementsByClassName("ingredList")[0];
			      	var noOfIngred = data[nr].ingredients.length;

			      	for (let it = 0 ;it<noOfIngred;it++)
			      	{
			      		var listItem = document.createElement("LI");
			      		var listContent = document.createTextNode(data[nr].ingredients[it]);
			      		listItem.appendChild(listContent);
			      		ingredients.appendChild(listItem);
			      	}

			      	var steps = document.getElementsByClassName("stepsList")[0];
			      	var noOfSteps = data[nr].recipe_steps.length;

			      	for (let it = 0 ;it<noOfSteps;it++)
			      	{
			      		var listItem = document.createElement("LI");
			      		var listContent = document.createTextNode(data[nr].recipe_steps[it]);
			      		listItem.appendChild(listContent);
			      		steps.appendChild(listItem);


			      	}
			       
			      });
			    }
			  )
			  .catch(function(err) {
			    console.log('Fetch Error :-S', err);
			  });
 }

updateContent();