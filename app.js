const API = `http://star-cors.herokuapp.com`;
const endpoints = ['people', 'films', 'vehicles', 'starships'];
const urls = endpoints.map( endpoint => {
  return `${API}/${endpoint}`;
});
const promises = urls.map( url => {
  return fetch(url)
    .then( response => response.json())
});

let people, films, vehicles, starships;

const peopleContainer = document.querySelector('#people');
peopleContainer.addEventListener('keyup', ({target}) => {
  
  const filteredList = {
    results: people.results.filter( person => {
      return person.name.toUpperCase().includes(target.value.toUpperCase().trim());
    })
  }

  console.log(filteredList);
  rerender('people', filteredList, function(person){
    return `
        The name is: ${ person.name }
        <br />
        Has appeared in ${ person.films.length } films.
    `;
  }, people.results.length);
})



const filmsContainer = document.querySelector('#films');
filmsContainer.addEventListener('keyup', ({target}) => {
  
  const filteredList = {
    results: films.results.filter( film => {
      return film.title.toUpperCase().includes(target.value.toUpperCase().trim());
    })
  }

  console.log(filteredList);
  rerender('films', filteredList, (film)=> {
    return `
      <b>${ film.title }</b>
      <br />
      Released On ${ ['Su', 'Mo', 'Tues', 'Wed', 'Thurs', 'Friday', 'Sat'][((new Date(film.release_date)).getDay())] } ${ film.release_date}
    `;
  },films.results.length);
})

const vehiclesContainer = document.querySelector('#vehicles');
vehiclesContainer.addEventListener('keyup', ({target}) => {
  
  const filteredList = {
    results: vehicles.results.filter( vehicle => {
      return vehicle.name.toUpperCase().includes(target.value.toUpperCase().trim());
    })
  }

  console.log(filteredList);
  rerender('vehicles', filteredList, (vehicle)=> {
    return `
      ${ vehicle.name }
      <br />
      ${ vehicle.manufacturer }
    `;
  },vehicles.results.length);
})

const starshipsContainer = document.querySelector('#starships');
starshipsContainer.addEventListener('keyup', ({target}) => {
  
  const filteredList = {
    results: starships.results.filter( starship => {
      return starship.name.toUpperCase().includes(target.value.toUpperCase().trim());
    })
  }

  console.log(filteredList);
  rerender('starships', filteredList, (starship)=> {
    return `
      ${ starship.name }
      <br />
      ${ starship.manufacturer }
    `;
  },starships.results.length);
})

const renderData = (endpoint, data, itemRenderer)=> {
  const div = document.querySelector(`#${ endpoint }`);
  let html = `Viewing ${data.results.length} out of ${data.results.length} ${endpoint}` 
    + data.results.map( item => {
    return `
      <li>
        ${ itemRenderer( item )}
      </li>
    `;
  }).join('');
  html = `<h2>${endpoint}</h2>
          <input type = 'text'/>
          <ul id = '${endpoint}List'>${html}</ul>`;
  div.innerHTML = html;
};

const rerender = (endpoint, data, itemRenderer, total)=> {
  const ul = document.querySelector(`#${endpoint}List`);
  let html = data.results.map( item => {
    return `
      <li>
        ${ itemRenderer( item )}
      </li>
    `;
  }).join('');
  
  ul.innerHTML = `Viewing ${data.results.length} out of ${total} ${endpoint}` +html;
};

const renderPeople = (people)=> {
  renderData(
    'people',
    people,
    function(person){
      return `
          The name is: ${ person.name }
          <br />
          Has appeared in ${ person.films.length } films.
      `;
    }
  );
};

const renderFilms = (films)=> {
  renderData(
    'films',
    films,
    (film)=> {
      return `
        <b>${ film.title }</b>
        <br />
        Released On ${ ['Su', 'Mo', 'Tues', 'Wed', 'Thurs', 'Friday', 'Sat'][((new Date(film.release_date)).getDay())] } ${ film.release_date}
      `;
    }
  );
};

const renderVehicles = (vehicles)=> {
  renderData(
    'vehicles',
    vehicles,
    (vehicle)=> {
      return `
        ${ vehicle.name }
        <br />
        ${ vehicle.manufacturer }
      `;
    }
  );
};

const renderStarships = (starships)=> {
  renderData(
    'starships',
    starships,
    (starship)=> {
      return `
        ${ starship.name }
        <br />
        ${ starship.manufacturer }
      `;
    }
  );
};

Promise.all(promises)
  .then( result => {
    [ people, films, vehicles, starships ] = result;
    renderPeople(people);
    renderFilms(films);
    renderVehicles(vehicles);
    renderStarships(starships);
  });
