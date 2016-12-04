/**
 * Created by suransh on 25/10/16.
 */

    var map; var str = '';

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

    function addMarker(lat, lng, name) {
        myLatlng = new google.maps.LatLng(lat, lng);
        var infowindow = new google.maps.InfoWindow();
        marker = new google.maps.Marker({
            position: myLatlng,
            draggable: true,
            map: map,
            animation: google.maps.Animation.DROP,
            title: name
        });
        marker.addListener('mouseover', function () {
            infowindow.setContent('<div><strong>' + name + '</strong>');
            infowindow.open(map, this);
        });
    }

    function PlaceDetails(placeid,name,type,url) {
        var request = {
            placeId: placeid
        };
        service = new google.maps.places.PlacesService(map);
        service.getDetails(request,callback);

    function callback(place,status) {
        if (status = google.maps.places.PlacesServiceStatus.OK) {
            var photo = place.photos;
            str = card(name,type,url,photo[0].getUrl({'maxWidth': 318,'maxHeight': 180}));
            var string = $('.container').html();
            string += str;
            $('.container').html(string);
        }
    }
}

function card (name,type,url,photo) {
    var s;
    console.log(photo);
    s = '<div class="card" >';
    s += '<div class="card-block">';
    s +=  '<h4 class="card-title">'+name+'</h4>';
    s += '<h6 class="card-subtitle text-muted">'+type+'</h6> </div>';
    s += "<img src=" + '"' + photo + '"'+ "alt="+ '"Card image"' + ">";
    s+=  '<div class="card-block">';
    s += '<a href='+ '"' + url + '"' + ' target="_blank" class="card-link">Website</a> </div> </div>';
    return s;
}

    $( function () {
    $('#submit').click(function () {
        var type = $('#type').val();
        $.get('/show', {type: type}, (results) => {
            var data = "";
            for (var i = 0; i < results.length; i++) {
                PlaceDetails(results[i].place_id,results[i].name,results[i].type,results[i].link);
                addMarker(results[i].lat, results[i].lng, results[i].name);
            }
        });
    });

} )