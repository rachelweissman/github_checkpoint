var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points){

var revealPoint = function(idx) {  
      points[idx].style.opacity = 1;
      points[idx].style.transform = "scaleX(1) translateY(0)";
      points[idx].style.msTransform = "scaleX(1) translateY(0)";
      points[idx].style.WebkitTransform = "scaleX(1) translateY(0)";
    };
  forEach(points, revealPoint);  
};

window.onload = function () {
    
    if (window.innerHeight > 950) {
        animatePoints(pointsArray)
    }
    
    window.addEventListener('scroll', function(event) {
        if (pointsArray[0].getBoundingClientRect().top <= 500) {
             animatePoints(pointsArray);
         }
    });
};
