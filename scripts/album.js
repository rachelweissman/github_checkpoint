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
      + '</tr>';
    
    var $row = $(template);   
    
     var clickHandler = function() {
        var $songItem = $(this);
        var songNum = $songItem.attr("data-song-number");

        if (currentSong === null) {
            // Revert to song number for currently playing song because user started playing new song.
            $songItem.html(pauseButtonTemplate);
			currentSong = songNum;
        }

        else if (currentSong === songNum) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $songItem.html(playButtonTemplate);
			currentSong = null;
        }

       else if (currentSong !== songNum) {
            // Switch from Pause -> Play button to pause currently playing song.
            var $currentSongElement = $("[data-song-number='" + currentSong + "']");
			$currentSongElement.html($currentSongElement.attr('data-song-number'));
			$songItem.html(pauseButtonTemplate);
			currentSong = songNum;
        }
         
    };
    
    var onHover = function(event) {
        var $hoverSongItem = $(this).find(".song-item-number");
		var hoverSongNum = $hoverSongItem.attr("data-song-number");
		
		if (hoverSongNum !== currentSong) {
			$hoverSongItem.html(playButtonTemplate);
		}
    };
 
    var offHover = function(event) {
        var $leaveSongItem = $(this).find(".song-item-number");
		var leaveSongNum = $leaveSongItem.attr("data-song-number");
		
		if (leaveSongNum !== currentSong) {
			$leaveSongItem.html(leaveSongNum);
		}
    };
    
    //the jQuery find() method is similar to querySelector(). We call it here to find the element with the .song-item-number class that contained in whichever row is clicked. jQuery's click event listener executes the callback we pass to it when the target element is clicked. 
    $row.find(".song-item-number").click(clickHandler);
    //The hover() event listener combines the mouseover and mouseleave functions we relied on previously. The first arugment is a callback that executes when the user mouses over the $row element and the second is a callback executed when the mouse leaves $row.
    $row.hover(onHover, offHover);
    //We return $row 
    return $row;
};

var setCurrentAlbum = function(album) {
    //Replaced each instance of getElementsByClassName with a jQuery selector and use CSS-style syntax to select the elements. We add a $ to the start of each variable name because they now reference jQuery objects
    var $albumTitle = $(".album-view-title");
	var $albumArtist = $(".album-view-artist");
	var $albumReleaseInfo = $(".album-view-release-info");
	var $albumImage = $(".album-cover-art");
	var $albumSongList = $(".album-view-song-list");
    //Call jQuery's text() method to replace the content of the text nodes. Change setAttribute() to jQuery's attr() method, which changes the element attribute using the same arguments.
    $albumTitle.text(album.name);
	$albumArtist.text(album.artist);
	$albumReleaseInfo.text(album.year + " " + album.label);
	$albumImage.attr('src', album.albumArtUrl);
    // Clear contents of album song list container
    $albumSongList.empty();
    // Build list of songs from album JavaScript object
    for (i = 0; i < album.songs.length; ++i) {
		var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
        $albumSongList.append($newRow);
	}
};


setCurrentAlbum(albumPicasso);

var currentSong = null;
var playButtonTemplate = '<a class="album-song-button"><div class="album-song-button-icon ion-play"></div></a>';
var pauseButtonTemplate = '<a class="album-song-button"><div class="album-song-button-icon ion-pause"></div></a>';

$(document).ready(function() {
});