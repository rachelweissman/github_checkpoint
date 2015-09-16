var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(){

var revealPoint = function() {
    //using jQuery css() method in place of the multiple style property instsances
    //Due to jQuery's cross-browser compatibility, we don't need to use the vendor prefixes on the transform property
    //the revealPoint function now refers to $(this) instead of a specific .point element. to use this with jQuery we must wrap it in a jQuery object $(this) 
    $(this).css({
        opacity: 1,
        transform: 'scaleX(1) translateY(0)'
    });
    
    //using jQuery $.each()fnction that iterates over each .point element and executes the callback function, revealPoint
    $.each($('.point'), revealPoint);
};

//jQuery object, takes function as an argument. When the page loads, the function will execute
$(window).load = (function() {
    
    //using jQuery's height() method, which gets or sets an objects height. Since we pass no arguments to the function, we get the height.
    if ($(window).height() > 950) {
        animatePoints();
    }
    
    //using jQuery's scroll() method, which takes a function as an arugment. When the window scrolls, the function executes. 
    $(window).scroll(function(event) {
        
        //using jQuery's scrollTop() method that measures the distance from the top of the page to the top of the element. 
        if ($(window).scrollTop() >= 500) {
             animatePoints();
         }
    });
};
