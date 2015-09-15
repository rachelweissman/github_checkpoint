
var createSongRow = function(songNumber, songName, songLength) {
    var template =
       '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
    ;
    
    var $row = $(template);   
    
  var clickHandler = function() {

        var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            
            currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        
         if (currentlyPlayingSongNumber !== songNumber) {
             // Switch from Play -> Pause button to indicate new song is playing.
             setSong(songNumber);
+            currentSoundFile.play();
+
             $(this).html(pauseButtonTemplate);
             updatePlayerBarSong();
         }
 
         else if (currentlyPlayingSongNumber === songNumber) {

            if (currentSoundFile.isPaused()) {
                $(this).html(pauseButtonTemplate);
                $('.left-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
            } else {
                $(this).html(playButtonTemplate);
                $('.left-controls .play-pause').html(playerBarPlayButton);
                currentSoundFile.pause();   
            }

         }
  };
 

    
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    }
 
    var offHover = function() {
        var $leaveSongItem = $(this).find(".song-item-number");
		var leaveSongNum = parseInt($leaveSongItem.attr("data-song-number"));
		
		if (leaveSongNum !== currentlyPlayingSongNumber) {
			$leaveSongItem.html(leaveSongNum);
		}
        console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
    }
    
    $row.find(".song-item-number").click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
    
};


var setCurrentAlbum = function(album) {
    
    currentAlbum = album;
    
    //Select elements that we want to populate with text dynamically
    var $albumTitle = $(".album-view-title");
	var $albumArtist = $(".album-view-artist");
	var $albumReleaseInfo = $(".album-view-release-info");
	var $albumImage = $(".album-cover-art");
	var $albumSongList = $(".album-view-song-list");
    
    //Replace the content of the text nodes
    $albumTitle.text(album.name);
	$albumArtist.text(album.artist);
	$albumReleaseInfo.text(album.year + " " + album.label);
	$albumImage.attr("src", album.albumArtUrl);
    
    // Clear contents of album song list container
    $albumSongList.empty();
    
    // Build list of songs from album JavaScript object
    for (i = 0; i < album.songs.length; ++i) {
		var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
        $albumSongList.append($newRow);
	}
    
};

//Updates the text of the <h2> tags that contain the song name and artist name. 
var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
    
    $('.left-controls .play-pause').html(playerBarPauseButton);
};



var setSong = function(songNumber) {
    
    if (currentSoundFile) {
        currentSoundFile.stop();
    }
    
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    
    //Assign the new Buzz sound object. Passed the audo file via the albmUrl property
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        //Formats is an array of strings with acceptable audio formats.
        formats: [ 'mp3' ],
        preload: true
    });
    
    setVolume(currentVolume);
};
        
        
 var setVolume = function(volume) {
 
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
 
 };        


var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
}
 
var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

//Next Song
var nextSong = function(){
    
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

//Previous Buttons
var previousSong = function() {
    
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
  
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var togglePlayFromPlayerBar = function() {
    var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);

    if (currentSoundFile.isPaused()) {
        currentSoundFile.play();
        $playPauseButton.html(playerBarPauseButton);
        currentlyPlayingCell.html(pauseButtonTemplate);
    }
    else if (!currentSoundFile.isPaused()) {
        currentSoundFile.pause();
        $playPauseButton.html(playerBarPlayButton);
        currentlyPlayingCell.html(playButtonTemplate);
    }
};



 var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
    $('.left-controls .play-pause').html(playerBarPauseButton); 
}

//Album button Templates
var playButtonTemplate = '<a class="album-song-button"><div class="album-song-button-icon ion-play"></div></a>';
var pauseButtonTemplate = '<a class="album-song-button"><div class="album-song-button-icon ion-pause"></div></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

//Variables in the global scope to hold current song/album info
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;
 var $previousButton = $('.left-controls .previous');
 var $nextButton = $('.left-controls .next');
var $playPauseButton = $('.left-controls .play-pause');

$(document).ready(function() {
    
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    $playPauseButton.click(togglePlayFromPlayerBar);
    
    console.log("hey");
    
    var allAlbums = [albumPicasso, albumMarconi, tameImpala];
    
    var albumCoverElementsArray = document.getElementsByClassName('album-cover-art');
    var albumCoverElement = albumCoverElementsArray[0];
    
    var nextAlbum = 0;
    
    var changeAlbum = function() {
        console.log("hey");
        
        nextAlbum++;

        if (nextAlbum >= allAlbums.length) {
            nextAlbum = 0;
        }
        setCurrentAlbum(allAlbums[nextAlbum]);
    };
    
    
    albumCoverElement.addEventListener('click', changeAlbum);

});