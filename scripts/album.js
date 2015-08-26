// Example Album
 var albumPicasso = {
     name: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/02.png',
     songs: [
         { name: 'Blue', length: '4:26' },
         { name: 'Green', length: '3:14' },
         { name: 'Red', length: '5:01' },
         { name: 'Pink', length: '3:21'},
         { name: 'Magenta', length: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     name: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { name: 'Hello, Operator?', length: '1:01' },
         { name: 'Ring, ring, ring', length: '5:01' },
         { name: 'Fits in your pocket', length: '3:21'},
         { name: 'Can you hear me now?', length: '3:14' },
         { name: 'Wrong phone number', length: '2:15'}
     ]
 };

 // Third Example Album
var tameImpala = {
     name: 'Currents',
     artist: 'Tame Impala',
     label: 'Modular',
     year: '2015',
     albumArtUrl: 'assets/images/album_covers/22.png',
     songs: [
         { name: 'Let It Happen', length: '7:46' },
         { name: 'Nangs', length: '1:47' },
         { name: 'The Moment', length: '4:15'},
         { name: 'Yes I\'m Changing', length: '4:30' },
         { name: 'Eventually', length: '5:19'}
     ]
 };

var createSongRow = function(songNumber, songName, songLength) {
    var template =
       '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
    return $(template);
};

var setCurrentAlbum = function(album) {
    //Replaced each instance of getElementsByClassName with a jQuery selector and use CSS-style syntax to select the elements. We add a $ to the start of each variable name because they now reference jQuery objects
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    //Call jQuery's text() method to replace the content of the text nodes. Change setAttribute() to jQuery's attr() method, which changes the element attribute using the same arguments.
    $albumTitle.text(album.name);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    // Clear contents of album song list container
    $albumSongList.empty();
    // Build list of songs from album JavaScript object
    for (var i=0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
         $albumSongList.append($newRow);
    }
};


//Change the Song Number to the Pause Button
var findParentByClassName = function(checkElement, parentClass) {
    var allParents = checkElement.parentElement;
    if (allParents == null) {
        alert("No parent found");
    } else {
        while (allParents != null) {
            if (allParents.className == parentClass) {
                return allParents;
            }
            allParents = allParents.parentElement;
        }
        alert("No parent with that class name found.");
    }
};

//Use a switch statement that returns the element w the .song-item-number class
var getSongItem = function(thing) {
    switch(thing.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause': // children of area to change, so find parent
            return findParentByClassName(thing, 'song-item-number');
        case 'album-view-song-item': // across the song row
            return thing.querySelector('.song-item-number'); // parent of area to change, so find query
        case 'song-item-title':
        case 'song-item-duration': // children of same parent, so have to go to the parent then find query
            return findParentByClassName(thing, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number': // the thing we want to change
            return thing;
        default:
            return; // nothings
    }
};

var clickHandler = function(targetElement) {
    //Store the .song-item-number element, selected using the getsongItem() function in a variable
    var songItem = getSongItem(targetElement);  
    //Create a conditional that checks if currentlyPlayingSong is null. If true, it should set the songItem's content to the pause button and set currentlyPlayingSong to the new song's number:
    if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
    //Add another conditional to revert the button back to a play button if the playing song is clicked again. Set currentlyPlayingSong to null after:
    else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
     }
    //If the clicked song is not the active song, set the content of the new song to the pause button:
    else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
};


//Elements to which we'll be adding listeners
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
 
// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';


//Store state of playing songs
var currentlyPlayingSong = null;

 window.onload = function() {

     setCurrentAlbum(albumPicasso); 
     
      songListContainer.addEventListener('mouseover', function(event) {
        if (event.target.parentElement.className === 'album-view-song-item') { 
            var thisSong = getSongItem(event.target);
            var thisSongNumber = thisSong.getAttribute('data-song-number');
            if (thisSongNumber !== currentlyPlayingSong) {
                thisSong.innerHTML = playButtonTemplate;
            }
        }
    });

     for (i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             // #1
             var leavingSongItem = getSongItem(event.target);
             var leavingSongItemNumber = leavingSongItem.getAttribute('data-song-number');
 
             // #2
             if (leavingSongItemNumber !== currentlyPlayingSong) {
                 leavingSongItem.innerHTML = leavingSongItemNumber;
             }
         });
            
         songRows[i].addEventListener('click', function(event) {
            //click handler to the event listener
             clickHandler(event.target);
        });
     }
    
    
    
    var allAlbums = [albumPicasso, albumMarconi, tameImpala];

    
    var albumCoverElementsArray = document.getElementsByClassName('album-cover-art');
    var albumCoverElement = albumCoverElementsArray[0];
    
    var nextAlbum = 0;
    
    var changeAlbum = function() {
        
        nextAlbum++;

        if (nextAlbum >= allAlbums.length) {
            nextAlbum = 0;
        }
        setCurrentAlbum(allAlbums[nextAlbum]);
    };
    
    
    albumCoverElement.addEventListener('click', changeAlbum);
    
};