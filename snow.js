
var snowFlakesArray = document.getElementsByClassName("snow-flake");
var snowFlakesCount = snowFlakesArray.length;
var snowSpeed = 2;
var snowRefresh = 50;
var rotations=[];
var rotateValue=4;

var screenWidth= window.screen.availWidth;
var screenHeight= window.screen.availHeight;

console.log(screenHeight);

 
 /* for(i=0;i<snowFlakesCount;i++)
  {
  	snowFlakesArray2.push(document.getElementsByTagName('img')[i]);
  }*/

  function initSnow()
  {
     for(i=0;i<snowFlakesCount;i++)
     {
         snowFlakesArray[i].style.top = (randomise(550)-600)+'px';
         snowFlakesArray[i].style.left = (randomise(screenWidth-100))+'px';
         snowFlakesArray[i].style.width = (randomise(30)+5)+'px';

         var rotate = randomise(360);
         rotations[i]=rotate;
         snowFlakesArray[i].style.transform = "rotate(" + rotate + "deg)";

         /*var a=snowFlakesArray[i].style.getPropertyValue('transform').split('rotate(');
         a= a[1].split("deg)");
         var number = parseInt(a[0]);
         console.log(number);*/
     }

     console.log(rotations);

  }

  
 function startSnow()
 {  
    initSnow();
 	snowTimer=window.setInterval(letItSnow, snowRefresh);
 }

 function letItSnow()
 {   
 
    for(i=0;i<snowFlakesCount;i++)
    {   
    	var yValue = parseInt(snowFlakesArray[i].style.top);
    	var snowSpeed;
    	var snowWidth=snowFlakesArray[i].style.getPropertyValue('width');
    	snowWidth=parseInt(snowWidth);

    	if(snowWidth>=5 && snowWidth<=15)
    		snowSpeed=4;

    	if(snowWidth>15 && snowWidth<=25)
    		snowSpeed=5;

    	if(snowWidth>25 && snowWidth<=35)
    		snowSpeed=6;

    	snowFlakesArray[i].style.top = (yValue+snowSpeed) + "px";

    	 var a=snowFlakesArray[i].style.getPropertyValue('transform').split('rotate(');
         a= a[1].split("deg)");
         var number = parseInt(a[0]); 
    	snowFlakesArray[i].style.transform="rotate("+(number+rotateValue)+"deg)";



    	if(yValue+snowSpeed>=screenHeight-150)
    		{
    		  snowFlakesArray[i].style.top=(randomise(60)-80) +'px';
    	      snowFlakesArray[i].style.left = (randomise(screenWidth-100))+'px';
              snowFlakesArray[i].style.width = (randomise(30)+5)+'px';
            }

    	//console.log(snowFlakesArray[0].style.top);
    }


 } 
  
  function randomise(range) {
	rand = Math.floor(range * Math.random());
	return rand;
}

 function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

   
 
 window.addEventListener("load",startSnow());


