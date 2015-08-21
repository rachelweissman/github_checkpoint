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
    return template;
};

var setCurrentAlbum = function(album) {
    // #1
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
    // #2
    albumTitle.firstChild.nodeValue = album.name;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);
    // #3
    albumSongList.innerHTML = '';
    // #4
    for (var i=0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
    }
};


var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

var songRows = document.getElementsByClassName('album-view-song-item');
 // Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';


 window.onload = function() {

     setCurrentAlbum(albumPicasso); 

     for (i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
         });
     }
    
    songListContainer.addEventListener('mouseover', function(event) {

        // Only target individual song rows during event delegation
         if (event.target.parentElement.className === 'album-view-song-item') {
         event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
         }
     });
    
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