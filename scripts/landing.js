var revealPoint = function(idx) {  
  points[idx].style.opacity = 1;
  points[idx].style.transform = "scaleX(1) translateY(0)";
  points[idx].style.msTransform = "scaleX(1) translateY(0)";
  points[idx].style.WebkitTransform = "scaleX(1) translateY(0)";
  points[idx].style.transition = "all 2s ease-in-out";
  points[idx].style.msTransition = "all 2s ease-in-out";
  points[idx].style.WebkitTransition = "all 2s ease-in-out";
  points[idx].style.transitionDelay = "1s";
  points[idx].style.msTransitionDelay = "1s";
  points[idx].style.WebkitTransitionDelay = "1s";
};

var points = document.getElementsByClassName('point');

for (var i = 0; i< points.length; i++) {
    revealPoint(i);
}




