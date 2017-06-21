var app = function(){
  var url = "https://api.punkapi.com/v2/beers";
  var request = new XMLHttpRequest();
  request.open( "GET", url );

  request.addEventListener( "load", function() {
    handleData( request.responseText );
  });
  request.send();
  loadFromStorage();
}



var findBeerById = function( value, beers ) {
  for (beer of beers ) {
    if ( beer.id == value ) {
      return beer;
    }
  }  
}

var handleData = function( beers ) {
  beers = JSON.parse( beers );
  createBeerDropdown( beers );
  populateBeerDropdown( beers );
}

var createBeerDropdown = function( beers ) {
  var dropdown = document.createElement( "select" );
  var option = document.createElement( "option" );
  option.text = "Choose a beer, punk";
  dropdown.options.add( option );
  option.disabled = true;
  option.selected = true;

  dropdown.addEventListener( "change", function(event) {
    var value = event.target.selectedOptions[0].value;
    var beer = findBeerById( value, beers );
    createBeer( beer );
    saveBeer( beer );
  })
  var div = document.querySelector( "#select");
  append( div, dropdown )
}

var append = function() {
  for ( var i = 0; i < arguments.length - 1; i++ ) {
    arguments[i].appendChild( arguments[i + 1] );
  }
}

var populateBeerDropdown = function( beers ) {
  var select = document.querySelector( "select" )
  for ( beer of beers ) {
    var option = document.createElement( "option" );
    option.value = beer.id;
    option.text = beer.name;
    select.options.add( option );
  }
}

var createBeer = function( beer ) {
  var list = document.createElement( "dl" );
  var name = document.createElement( "dt" );
  var tagline = document.createElement( "dd" );
  var beerDD = document.createElement( "dd" );
  var beerImg = document.createElement( "img" );
  var description = document.createElement( "dd" );
  var beerDiv = document.querySelector( "#beer" );

  name.innerText = beer.name;
  name.className = "name";

  tagline.innerText = beer.tagline;
  tagline.className = "tagline";

  beerImg.src = beer.image_url;
  beerImg.className = "bottle";

  description.innerHTML = "<p>Description: </p>" + beer.description;
  description.className = "description";

  append( beerDD, beerImg );
  append( name, tagline );
  append( name, beerDD );
  append( name, description );
  append( list, name );
    if ( beerDiv.childElementCount > 0 ){
      beerDiv.insertBefore(list, beerDiv.childNodes[0] );
    } else {
      append( beerDiv, list );
    }
  }

var saveBeer = function( beer ) {
  var beerString = JSON.stringify( beer );
  localStorage.setItem( "beer", beerString );
}

var loadFromStorage = function() {
  if ( localStorage.beer ) {
    var stringBeer = localStorage.beer;
    if ( stringBeer ) {
      var beer = JSON.parse(localStorage.beer);
      createBeer( beer );
    }
  }
}



window.addEventListener('load', app);