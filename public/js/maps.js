/**
 * Created by suransh on 25/10/16.
 */

var map;
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 28.5272181, lng: 77.0688996},
        zoom: 12
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            marker = new google.maps.Marker({
                map: map,
                draggable: false,
                animation: google.maps.Animation.DROP,
                position: pos,
                title: 'Current Location',
                icon: 'http://i.stack.imgur.com/orZ4x.png'
            });

            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

}

function addMarker(lat,lng,name){
    myLatlng = new google.maps.LatLng(lat,lng);
    var infowindow = new google.maps.InfoWindow();
    marker = new google.maps.Marker({
        position: myLatlng,
        draggable: true,
        map: map,
        animation: google.maps.Animation.DROP,
        title: name});
    marker.addListener('mouseover', function() {
        infowindow.setContent('<div><strong>' + name + '</strong>');
        infowindow.open(map, this);
    });
}

$('#submit').click(function () {
    var type = $('#type').val();
    $.get('/show', {type:type}, (results) => {
        var data = "";
        for (var i = 0;i<results.length;i++) {
            data += '<li ><a target="_blank" href="' + results[i].link + '">'+results[i].name+'</a></li>';
            addMarker(results[i].lat,results[i].lng,results[i].name);
        }
        $('#list').html(data);
    });

});