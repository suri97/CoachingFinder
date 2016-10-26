/**
 * Created by suransh on 25/10/16.
 */

var map; function CreateMarker(pos,name) {}
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
                draggable: true,
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
    $.get('/show', {type:type}, (rows) => {
        var data = "";
        for (var i = 0;i<rows.length;i++) {
            data += '<li >' + rows[i].name + '</li>';
            addMarker(rows[i].lat,rows[i].lng,rows[i].name);
        }
        $('#list').append(data);
    });

});