//We wrap the template in a function. This function returns the markup string as a jQuery object, that we're calling a jQuery template. 
var buildCollectionItemTemplate = function() {
 
     var template =
     '<div class="collection-album-container column fourth">'
   + '  <img src="assets/images/album_covers/01.png"/>'
   + '  <div class="collection-album-info caption">'
   + '    <p>'
   + '      <a class="album-name" href="/album.html"> The Colors </a>'
   + '      <br/>'
   + '      <a href="/album.html"> Pablo Picasso </a>'
   + '      <br/>'
   + '      X songs'
   + '      <br/>'
   + '    </p>'
   + '  </div>'
   + '</div>';
     
     //currently not using jQuery methods, but we may later. To support that, we wrap template in a jQuery object to future-proof it. 
     return $(template);
 };

$(window).load(function() {
    //Substitute DOM selection with the shorter jQuery alternative. When teh element selection becomes a jQery object, we prefix the collectionContainer variable name with a $. This is a convention that identifies jQuery-related variables. 
   var $collectionContainer = $('.album-covers .clearfix');
    //Replaced the vanilla DOM scripting innerHTML property with the jQuery empty()method. The empty() method, like many jQuery operations, is literal in what it does - it empties, or removes, any text or other element(s) it is called on
     $collectionContainer.empty();

     // Insert all of the albums in the collection containers
     for (var i = 0; i < 12; i++) {
        var $newThumbnail = buildCollectionItemTemplate();
         //Replaced the += in the for loop with the append() method. With each loop, we append the template content to the collection container. 
        $collectionContainer.append($newThumbnail);
    }  
});