
var items = document.getElementsByClassName("imag");
var parentItems = document.getElementsByClassName("option");
var parentItems2= document.getElementsByClassName("secondary-option");
var button = document.getElementById("back_btn");
var button2 = document.getElementById("add_btn");
var submit = document.getElementById("submit_btn");

var modal= document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];



var recipes;

  localStorage.setItem("currentPage", "main");
  localStorage.setItem("isCreated","false");
       




for( var i = 0; i<parentItems.length;i++)
{    
     
	parentItems[i].onmouseover=function(){
         
         var a = this.childNodes[3].childNodes[1] ;
         var opacity = 0.3;

		 // MyFadeFunction(opacity,a);
		 
		 a.parentElement.previousElementSibling.style.visibility="hidden";
	}

	parentItems[i].onmouseout= function()
	{    
		  var a = this.childNodes[3].childNodes[1] ;
		  var opacity = 1.0;
		  
		  // MyFadeOutFunction(opacity, a);

		  a.parentElement.previousElementSibling.style.visibility = "visible";
	}
}

parentItems[0].onmousedown = function(){
	localStorage.setItem("currentPage",'recipe');
	document.getElementsByClassName("content")[0].style.display="none";
	button.style.display="inline-block";
	button2.style.display="inline-block";

	updateContent();
	// window.location='page_name.php'
	

}

parentItems[1].onmousedown = function(){
	localStorage.setItem("currentPage",'handmade');
	document.getElementsByClassName("content")[0].style.display="none";
	document.getElementById("back_btn").style.display="block";
	updateContent();
	//window.location='page_name.php'
}



button.onmousedown = function()
{
	this.style.display="none";
	button2.style.display="none";
	localStorage.setItem("currentPage", "main");
	console.log(localStorage.getItem("currentPage"));
	updateContent();
}

button2.onclick = function()
{
	
	modal.style.display = "block";
	
}

 submit.onclick = function()
 {
 	getData();
 }

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



 function MyFadeFunction(opacity,element) 
 {
     if (opacity<1) 
   		{
      		opacity = opacity +  .1;
      		opacity=parseFloat(opacity.toFixed(2));
      		setTimeout(function(){MyFadeFunction(opacity,element)},50);
   		}
   				
   		element.style.opacity = opacity;
 }

 function MyFadeOutFunction(opacity,element) 
 {
     if (opacity>.3) 
   		{
      		opacity = opacity -  .1;
      		opacity=parseFloat(opacity.toFixed(2));	
      		setTimeout(function(){MyFadeOutFunction(opacity,element)},30);
   		}
   				
   		element.style.opacity = opacity;
 }


function getData()
{
	var form = document.getElementById("myForm");
    
    var name = form.elements[0].value;
    var description = form.elements[1].value;
    var ingredients = form.elements[2].value;
    var arrIngred  = ingredients.split("\n");
    var steps = form.elements[3].value;
    var arrSteps = steps.split("\n");
    var picutre = form.elements[4].value;

    var recipeObj={
      
      name: form.elements[0].value


    };
    
    recipeObj.description=description;
    recipeObj.ingredients= arrIngred;
    recipeObj.recipe_steps=arrSteps;
    recipeObj.srcL = picutre;

    for(let it =0 ; it<form.length-2;it++)
    {
       form.elements[it].value="";
    }
    
    var myJson = JSON.stringify(recipeObj);
    
    fetch('http://localhost:3000/retete', {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body:myJson
  })
  .then(res => res.json())
// .then(response => console.log('Success:', JSON.stringify(response)))
.then(response => showSucces())
.catch(error => console.error('Error:', error));

	

}


function showSucces (){

	var label_status = document.getElementById("status");
	console.log("Am intrat in functie");
	var text = document.createTextNode("Succes");
	label_status.appendChild(text);
}

 function updateContent(){
    
     var option = localStorage.getItem("currentPage");
     console.log(option);

     var design = document.getElementsByClassName("secondary-content")[0];
     
     design.style.display="flex";
     //design.gridTemplateColumns = "3";
     
     if(option=="recipe")
     {
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
			        var reteteNr = data.length;

			        /*design.style.gridTemplateColumns="auto auto auto";
                    
                      for(var it=1;it<=Math.floor(reteteNr/3)+1; it++ )
			            design.style.gridTemplateRows = design.style.gridTemplateRows + "auto ";*/
			     
                   if(localStorage.getItem("isCreated")=="false")
			        {
			          for(let i = 0; i<reteteNr;i++)
			           {   
                            var j = 0;

                         var globe = document.createElement("DIV");
                         globe.className="globe";

                         var hook = document.createElement("DIV");
                         hook.className="hook";
                         var ring = document.createElement("DIV");
                         ring.className="ring";

                         globe.appendChild(ring);
                         globe.appendChild(hook);

			             var article = document.createElement("ARTICLE");
			             article.className="secondary-option";
			             

			             article.style.gridColumnStart = "auto";
			             article.style.gridColumnEnd = "auto";
			             article.style.gridRowStart= "auto";
			             article.style.gridRowEnd = "auto";

			             var articleTitle = document.createElement("H3");
			             articleTitle.className="main-title";

			             var articleTitleCont = document.createTextNode(data[i].name);
			             articleTitle.appendChild(articleTitleCont);
			             article.appendChild(articleTitle);

			             var spanItem = document.createElement("SPAN");
			             spanItem.className="imagine";

			             var image = document.createElement("IMG");
			             image.className="imag";
			             image.src = data[i].srcL;

                         spanItem.appendChild(image);
                         
              
			             article.appendChild(spanItem);
			             globe.appendChild(article);
			             design.appendChild(globe);

			          }

			           var recipes = document.getElementsByClassName("secondary-option");
			           
			           for (let it =0; it<recipes.length;it++)
			           { 
			           	recipes[it].number = it + 1;
			           	recipes[it].onmousedown = function()
			             {
			             	localStorage.setItem("currentRecipe", this.number);
			             	console.log("clicked "+ this.number);
			             	window.location.href = "recipes.html";
			             }
			           }

                       localStorage.setItem("isCreated","true");

			        }
			      });
			    }
			  )
			  .catch(function(err) {
			    console.log('Fetch Error :-S', err);
			  });
			     }

else if (option=="main")
{    
	var articles = document.getElementsByClassName("secondary-option")[0];
     var ele = articles.parentElement;
     console.log(articles);

     for(var it = ele.length-1  ; it>=0 ;it--)
     {
     	  ele[it].parentElement.removeChild(ele[it]);
     }

    document.getElementsByClassName("content")[0].style.display="flex";
    design.style.display="none";
    
     
     
 } 

}


