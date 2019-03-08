'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1Ijoiamw1MjIxIiwiYSI6ImNqdDBicXR6ejAxdTk0OW9oN3Qyems4eTgifQ.EGG7ct_SzG9fPa21HsV7_w'

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/brianhouse/cjn0u552b52kr2spdz6yhpqj4',
    center: [-73.96216,40.80779],
    zoom: 16,
    pitch: 45
})

// create an instance of NavigationControl
let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})

// add the navigation to your map
map.addControl(navigation, 'top-left')

// create an instance of ScaleControl
let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})

// add the scale to your map
map.addControl(scale, 'bottom-right')

let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})

map.addControl(geolocate, 'top-left')

// this is an event handler
geolocate.on('geolocate', function(event) {

    // create new variables to store the attributes we're interested in from the event
    let lng = event.coords.longitude
    let lat = event.coords.latitude

    // debug
    console.log('geolocated:', lng, lat)

    // format lng lat values and display them on our 'info' element
    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

map.on('click', function(event) {

    let lng = event.lngLat.lng
    let lat = event.lngLat.lat

    console.log("clicked:", lng, lat)

    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

let marker = new mapboxgl.Marker()
marker.setLngLat([-73.96101451477425, 40.808184380198554])
marker.addTo(map)

let popup = new mapboxgl.Popup()
popup.setHTML('I start my journey to go back to my home from here <br /><img src="http://www.wikicu.com/images/1/1a/Avery.jpg" />')
marker.setPopup(popup)

let data = [
    {
        location: [-73.96371120451509, 40.80812017327486],
        content: 'Take on train bounds to WTC <br /><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/116th_Street_Columbia_University_IRT_006.JPG/1920px-116th_Street_Columbia_University_IRT_006.JPG" />'
    },
    {
        location: [-73.98185763192204, 40.768042113825516],
        content: 'Stop by Williams Sonoma. cookware shopping <br /><img src="data:image/jpeg;base64,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" />'
    },
    {
        location: [-73.99190451873798, 40.750017878261616],
        content: 'rendezvous with husband. Keep going to WTC <br /><img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Penn_Station_NYC_main_entrance.jpg" />'
    },
    {
        location: [-74.00533370326097, 40.72856059947554],
        content: 'Change of plan. take off from train and heading to SOHO <br /><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/East_Houston_Street_NYC_9183.JPG/2560px-East_Houston_Street_NYC_9183.JPG" />'
    },
    {
        location: [-73.99844545316844, 40.723445202239134],
        content: 'Shopping at MUJI while walking down the SoHo street <br /><img src="http://info.muji.us/info/wp-content/uploads/2018/04/muji-SOHO-06261-550x319.jpg" />'
    },
    {
        location: [-74.00489603522745, 40.72136231054725],
        content: 'Keep going to WTC. getting pieces of pizza from 5 boroughs pizza. <br /><img src="https://s3-media4.fl.yelpcdn.com/bphoto/e-G7i-q7cudtMam4dLXI1Q/ls.jpg" />'
    },
    {
        location: [-74.01176870176077, 40.71549228898422],
        content: 'Stop by Whole foods Market. grap some fruits, meats and pasta <br /><img src="https://fastly.4sqi.net/img/general/600x600/660464_tHarEwULMWhxCEfudqsGytS8R-G4go2FPc8t9NLMHz4.jpg" />'
    },
    {
        location: [-74.01146511591494, 40.711574647223216],
        content: 'take PATH to NJ. <br /><img src="https://i2.wp.com/keepcalmandwander.com/wp-content/uploads/2018/05/Oculus-New-York-NYC-12.jpg?resize=960%2C639" />'
    },
    {
        location: [-74.06306814887162, 40.7320768640144],
        content: 'Arrived at home. Total hours of coming back home = 4.5H <br /><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Blvd_Bridge_west_arch_jeh.jpg/1920px-Blvd_Bridge_west_arch_jeh.jpg" />'
    },
    ]

    data.forEach(function(d) {

    let marker = new mapboxgl.Marker()    
    marker.setLngLat(d.location)
    marker.addTo(map)  

    let popup = new mapboxgl.Popup()
    popup.setHTML(d.content)
    marker.setPopup(popup)

})
