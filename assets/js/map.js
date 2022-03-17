navigator.geolocation.getCurrentPosition(successCallback);  
	
function successCallback(position){  
    var lat = position.coords.latitude;  
    var long = position.coords.longitude;  
        lat = 33.883319144135996;  //set location to CSUF for track
        long =-117.88519218058632;

    var map=L.map('map').setView([lat,long],15);

    var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: 'images/Flushy-Marker-Shadow.png',
        iconSize:     [48, 50],
        shadowSize:   [45, 60],
        iconAnchor:   [22, 94],
        shadowAnchor: [23, 100],
        popupAnchor:  [-10, -85]
    }
    });

    var flushyIcon = new LeafIcon({iconUrl: 'images/Flushy-Marker.png'});

    L.icon = function (options) {
    return new L.Icon(options);
    };

    var marker = L.marker([lat, long], {icon: flushyIcon}).addTo(map)
    .bindPopup('You Are Here. <nav id="nav"><ul><a href="#about" id="about-link">Create a review here.</span></a></ul></nav>')
    .openPopup();; // current position
        
    //add maker for all nearbybathroom
    var nearbathroom = naerby(lat,long, map);
        
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=73G3DfyKZkKf9Tzah1qH', 
    {attributes:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',}).addTo(map);

    
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
    });
    googleStreets.addTo(map);

    googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
    });
    //window.googleSat.addTo(map); if you want use googleSat
}
