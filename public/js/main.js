// ######## OAuth API
hello.init({
    facebook: "605612360973350",
    google: "679313092033-2j8qabl5e3dt2agp8c1aso4a736ghsos.apps.googleusercontent.com",
    instagram: "",
    github: "",
    windows: "",
    twitter: "",
    linkedin: "",
    dropbox: "",
    yahoo: "",
    soundcloud: "",
    joinme: "",
    foursquare: "",
    flickr: "",
    vk: "",
    tumblr: "",
    bikeindex: "",
    box: ""
},
{
    redirect_uri: "https://dog-cat-7b3a6.web.app/"
});

// Triggered whenever session changes
hello.on("auth", function(auth)
{
});

// Triggered whenever a user logs in
hello.on("auth.login", function(auth)
{
    // Call user information, for the given network
    hello(auth.network).api("me").then(function(p)
    {
        if (window.location.pathname != "/admin.html")
        window.location.href = "admin.html";
        // p.first_name,
        // p.last_name,
        // p.email,
        // p.thumbnail
    });
});

// Remove a callback. Both event name and function must exist.
// hello.off('auth.login', sessionStart);

// Triggered whenever a user logs out
hello.on("auth.logout", function(auth)
{
    // Call user information, for the given network
    hello(auth.network).api("me").then(function(p)
    {
        window.location.href = "index.html";
    });
});

// Triggered prior to requesting an authentication flow
hello.on("auth.init", function(auth)
{
});

// Triggered whenever a users credentials change
hello.on("auth.update", function(auth)
{
});

// Logout button
const logout = (network) => hello(network).logout().then(function()
{
    window.location.href = "index.html";
}, function(e)
{
    console.log("logout error: " + e.error.message);
});

// 
function initOAuth(network, force = false) {
    // Make a login call and handle the response using promises
    var hi = hello(network);
    hi.login({display: "popup", scope: "email", force: force}).then(function()
    {
        console.log("fullfilled", "making api call");
        // Reurn another promise to get the users profile.
        return 	hi.api("me");
    }).then(function(p)
    {
        // Print it to console.
        console.log("hello.api(me) was fullfilled", p);
        return p;
    }).then(function(p)
    {
        // p.first_name
        // p.last_name
        // p.email
        // p.name
        // p.thumbnail
        // p.id
    }).then(null, function(e)
    {
        // Uh oh
        console.error(e);
    });
}

// ######## Google Maps API

let map, marker;
async function initMap()
{
    let data = {
      latitud: parseFloat("20.485193215567346"),
      longitud: parseFloat("-99.21841097091944"),
      nombre: "Ubicacion",
    };
    // Asigna las coordenadas: longitud, latitud a la constante coords
    // Mustra el mapa con las coordenadas asignadas
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: data.latitud, lng: data.longitud }, // centra el mapa en las coordenadas asignadas a la constante
      zoom: 17,
    });

    // Especifica un marcador personalizado con el tamano determinado
    const icon = {
      url: "images/dog-cat.gif", // url
      scaledSize: new google.maps.Size(60, 60), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0), // anchor
    };

    // Agrega un marcador al mapa
    marker = new google.maps.Marker({
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: { lat: data.latitud, lng: data.longitud }, // centra el marcador en las coordenadas asignadas a la constante
      map,
      icon: icon,
      title: data.nombre, // Agrega un titulo la marcador
    });
}

const toggleMenuOpen = () => document.body.classList.toggle("open");

// ########## Email / Password validations
function validateEmail(email)
{
    if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(email))) {
        alert("Please enter a valid email address")
        return false;
    } else {
        alert("login");
        return true;
    }
}

function select(kind) {
    if (kind == "dogs") {
        window.location.href = "Catalogo_dogs.html";
    }
    else {
        window.location.href = "Catalogo_cats.html";
    }
}

function closeDialog() {
    document.querySelector(".modal").style.display = "none";
}

function showDialog() {
    document.querySelector(".modal").style.display = "block";
}

function dropHandler(ev) {
    console.log('File(s) dropped');
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === 'file') {
          const file = item.getAsFile();
          console.log(`${file.name}`);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  }

  function dragOverHandler(ev) {
    console.log('File(s) in drop zone');
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }
  

  function select(kind){
    if (kind =="dogs"){
        window.location.href ="Catalogo_dogs.html";
    }
    else {
        window.location.href ="Catalogo_cats.html";
    }
  }