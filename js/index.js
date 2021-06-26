
var api_key = 'd1fbac53ccc3044ce12332eebf023776';
var url = 'https://api.themoviedb.org/3/search/movie?api_key=d1fbac53ccc3044ce12332eebf023776';

var url1 = 'https://api.themoviedb.org/3/search/movie/?api_key=d1fbac53ccc3044ce12332eebf023776&language=en-US&append_to_response=images&include_image_language=en';

var img_url = 'https://image.tmdb.org/t/p/w500';


const st = document.querySelector('.searchtext');
const searchbtn = document.querySelector('.searchbtn');

const x = document.querySelector('.fa-times-circle');
const entertext = document.querySelector('.enterst');
const imgslide = document.querySelector('.img-slide');

//searchbtn main
searchbtn.addEventListener('click', (e)=> {
e.preventDefault();

if (st.value === "") {
entertext.classList.add('open');
} else{
const searchtext = st.value;
getmovies(searchtext);
imgslide.classList.add('hide');
}
setTimeout(function() {
entertext.classList.remove('open');
}, 2000);
});

x.addEventListener('click', () =>{
entertext.classList.toggle('open');
});

//getting movies
function getmovies(searchtext) {
const newurl = url + '&query=' + searchtext; 

fetch(newurl)
.then((res) => res.json())
.then((data) => {
  const cont = document.querySelector('.container');
  var movies = data.results;
//console.log(movies);
  var output ='';
movies.forEach((movie, index)=> {
output += `
<div class="box">
 <div class="img">
    <img src="${img_url + movie.poster_path}" alt="${movie.title}" />
 </div>
<h2 class="head">${movie.original_title}</h2>

<button 
data-id=${movie.id} 
data-name="${movie.title}" 
data-poster="${movie.poster_path}" 
data-overview="${movie.overview}" 
data-popularity="${movie.popularity}" 
data-date="${movie.release_date}" 
data-average="${movie.vote_average}" 
onclick="movieopen(
this.dataset.name, 
this.dataset.id, 
this.dataset.poster,
this.dataset.overview,
this.dataset.popularity,
this.dataset.date,
this.dataset.average
)" 
class="watchbtn" 
type="button">
watch the movie
</button>

</div>
`;
  });
cont.innerHTML = output;
return cont;
})
.catch((error) => {
  console.log(error);
})
//console.log(searchtext);
st.value = "";
}

//movieopen
function movieopen(name, id, poster, view, pop, date, avg){
//alert(id);
sessionStorage.setItem('id', id);
sessionStorage.setItem('title', name);
sessionStorage.setItem('image', poster);
sessionStorage.setItem('view', view);
sessionStorage.setItem('popular', pop);
sessionStorage.setItem('date', date);
sessionStorage.setItem('avg', avg);
window.location = 'Openmovie.html';
 return false;
}

//geting movies to open another site
function getmovie() {
  
let movieid = sessionStorage.getItem('id');
let tit = sessionStorage.getItem('title');
let img = sessionStorage.getItem('image');
let view = sessionStorage.getItem('view');
let pop = sessionStorage.getItem('popular');
let avg = sessionStorage.getItem('avg');
let date = sessionStorage.getItem('date');
var img_url = 'https://image.tmdb.org/t/p/w500';
const cont = document.querySelector('.c');
var url = `https://api.themoviedb.org/3/movie/${movieid}?api_key=${api_key}&append_to_response=videos`;
fetch(url)
.then((res) => res.json())
.then((data) => {
var getM = data;
console.log(getM);

if (img === "null") {
  img_url = "";
  img = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.explicit.bing.net%2Fth%3Fid%3DOIP.icdiuCtWIBiEsoJvyaQqDgHaFj%26pid%3DApi&f=1';
}

if (view === "null") {
  view = "overview of the movie is not been displayed";
}

output = `
 <div class="displayarea">
   <div class="img">
     <img src="${img_url+img}" alt=" ${tit}" />
     <div class="btn">
      <button onclick="movietrailer('${tit}')" type="button">YouTube</button>
      <button onclick="yttrailer('${movieid}')" type="button">Trailer</button>
     </div>
       <div class="btn">
      <button onclick="offmovie('${getM.homepage}')" type="button">Official</button>
      <button onclick="imdbmovie('${getM.imdb_id}')" type="button">IMDB</button>
     </div>
   </div>
  <div class="cnrntarea">
    <h2 class="head" >${tit}</h2>
    <strong><p>AVERAGE :<span> ${ avg}</span></p></strong> 
    <strong><p>POPULARITY :<span> ${ pop}</span></p></strong> 
    <strong><p>RELEASED DATE :<span> ${ date}</span></p></strong> 
    <strong><p>OVERVIEW :<span> ${ view}</span></p></strong>
  </div>
 </div>
`;
cont.innerHTML = output;
return cont;
})
.catch((err) => {
  console.log(err);
});
}

function offmovie(a){
  if(a=== ""){
    alert('Their is no official site for this movie');
  }else{
    window.open(a);
  }
// console.log(a);  
}
function imdbmovie(b){
//console.log(b);
if(b === ""){
 alert('Their is no imdb id for this movie'); 
} else {
const imdb = `https://m.imdb.com/title/${b}/`;
window.open(imdb);
}
}

// open site can going back
function goback(){
  window.history.back();
}


//movietrailer
function movietrailer(id){
const yurl = 'https://m.youtube.com/results?sp=mAEA&search_query=';
const youid = yurl+id;
window.open(youid);
}


function createiframe(keys){
var yturl = 'https://www.youtube.com/embed/';

var iframe = `
 <iframe height="300" width="300" src="${yturl+keys.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`;
return iframe;
}


function yttrailer(i){
  
var url = `https://api.themoviedb.org/3/movie/${i}?api_key=${api_key}&append_to_response=videos`;


const iframecont = document.querySelector('.ytvideos');

fetch(url)
.then((res) => res.json())
.then((data) => {
const videos = data.videos.results;
const length =videos.length > 4 ? 4 : videos.length;
//console.log(length);

if (length == 0) {
 alert("ther is no trailer yet for this movie");
} else{
  setTimeout(function() {
window.scrollTo(0,document.body.scrollHeight);
}, 500);
}
for (let i = 0; i < length; i++){
let keys = videos[i];
//console.log(keys);
const iframes = createiframe(keys);
iframecont.innerHTML = iframes;
return iframecont;
}

})
.catch((err) => {
  console.log(err);
});

//console.log(url);
}


window.addEventListener('load', ()=> {
//alert('welcome to movie app');
popular();
toprated();
onetheair();
latest();
nowplaying();
thriller();
animation();
});


function popular(){

var url = 'https://api.themoviedb.org/3/tv/popular?api_key=d1fbac53ccc3044ce12332eebf023776';


//console.log(url);

const popular = document.querySelector('.popular .one-c');
const output = '';

fetch(url)
.then((res) => res.json())
.then((data) => {
const movies = data.results;
var output ='';
movies.forEach((movie, index)=> {
output += `
<div class="smallbox">
 <div class="img">
    <img
    data-id=${movie.id} 
data-name="${movie.name}" 
data-poster="${movie.poster_path}" 
data-overview="${movie.overview}" 
data-popularity="${movie.popularity}" 
data-date="${movie.first_air_date}" 
data-average="${movie.vote_average}" 
onclick="movieopen(
this.dataset.name, 
this.dataset.id, 
this.dataset.poster,
this.dataset.overview,
this.dataset.popularity,
this.dataset.date,
this.dataset.average
)" 
    src="${img_url + movie.poster_path}" alt="${movie.name}" />
 </div>

</div>
`;
  });
popular.innerHTML = output;
return popular;
  
})
.catch((er)=> {
  console.log(er);
});

}


function toprated(){

var url = 'https://api.themoviedb.org/3/tv/top_rated?api_key=d1fbac53ccc3044ce12332eebf023776';

//console.log(url);

const popular = document.querySelector('.top-rated .one-c');
const output = '';

fetch(url)
.then((res) => res.json())
.then((data) => {
const movies = data.results;
var output ='';
movies.forEach((movie, index)=> {
output += `
<div class="smallbox">
 <div class="img">
    <img 
    data-id=${movie.id} 
data-name="${movie.name}" 
data-poster="${movie.poster_path}" 
data-overview="${movie.overview}" 
data-popularity="${movie.popularity}" 
data-date="${movie.first_air_date}" 
data-average="${movie.vote_average}" 
onclick="movieopen(
this.dataset.name, 
this.dataset.id, 
this.dataset.poster,
this.dataset.overview,
this.dataset.popularity,
this.dataset.date,
this.dataset.average
)" 
    src="${img_url + movie.poster_path}" alt="${movie.name}" />
 </div>
</div>
`;
  });
popular.innerHTML = output;
return popular;
  
})
.catch((er)=> {
  console.log(er);
});

}


function animation(){

var url = 'https://api.themoviedb.org/3/tv/top_rated?api_key=d1fbac53ccc3044ce12332eebf023776';

//console.log(url);

const popular = document.querySelector('.animation .one-c');
const output = '';

fetch(url)
.then((res) => res.json())
.then((data) => {
const movies = data.results;
var output ='';
movies.forEach((movie, index)=> {
output += `
<div class="smallbox">
 <div class="img">
    <img 
    data-id=${movie.id} 
data-name="${movie.name}" 
data-poster="${movie.poster_path}" 
data-overview="${movie.overview}" 
data-popularity="${movie.popularity}" 
data-date="${movie.first_air_date}" 
data-average="${movie.vote_average}" 
onclick="movieopen(
this.dataset.name, 
this.dataset.id, 
this.dataset.poster,
this.dataset.overview,
this.dataset.popularity,
this.dataset.date,
this.dataset.average
)" 
    src="${img_url + movie.poster_path}" alt="${movie.name}" />
 </div>
</div>
`;
  });
popular.innerHTML = output;
return popular;
  
})
.catch((er)=> {
  console.log(er);
});

}


function onetheair(){

var url = 'https://api.themoviedb.org/3/tv/on_the_air?api_key=d1fbac53ccc3044ce12332eebf023776';


//console.log(url);

const popular = document.querySelector('.ontheair .one-c');
const output = '';

fetch(url)
.then((res) => res.json())
.then((data) => {
const movies = data.results;
var output ='';
movies.forEach((movie, index)=> {
output += `
<div class="smallbox">
 <div class="img">
    <img 
    data-id=${movie.id} 
data-name="${movie.name}" 
data-poster="${movie.poster_path}" 
data-overview="${movie.overview}" 
data-popularity="${movie.popularity}" 
data-date="${movie.first_air_date}" 
data-average="${movie.vote_average}" 
onclick="movieopen(
this.dataset.name, 
this.dataset.id, 
this.dataset.poster,
this.dataset.overview,
this.dataset.popularity,
this.dataset.date,
this.dataset.average
)" 
    src="${img_url + movie.poster_path}" alt="${movie.name}" />
 </div>
</div>
`;
  });
popular.innerHTML = output;
return popular;
})
.catch((er)=> {
  console.log(er);
});

}


function latest(){

var url = 'https://api.themoviedb.org/3/trending/all/day?api_key=d1fbac53ccc3044ce12332eebf023776';

//console.log(url);

const popular = document.querySelector('.latest .one-c');
const output = '';

fetch(url)
.then((res) => res.json())
.then((data) => {
const movies = data.results;
var output ='';
movies.forEach((movie, index)=> {
output += `
<div class="smallbox">
 <div class="img">
    <img
    data-id=${movie.id} 
data-name="${movie.name}" 
data-poster="${movie.poster_path}" 
data-overview="${movie.overview}" 
data-popularity="${movie.popularity}" 
data-date="${movie.first_air_date}" 
data-average="${movie.vote_average}" 
onclick="movieopen(
this.dataset.name, 
this.dataset.id, 
this.dataset.poster,
this.dataset.overview,
this.dataset.popularity,
this.dataset.date,
this.dataset.average
)" 
    src="${img_url + movie.poster_path}" alt="${movie.name}" />
 </div>
</div>
`;
  });
popular.innerHTML = output;
return popular;
})
.catch((er)=> {
  console.log(er);
});

}


function nowplaying(){

var url = ' https://api.themoviedb.org/3/movie/now_playing?api_key=d1fbac53ccc3044ce12332eebf023776&language=en-US&page=1';

//console.log(url);

const popular = document.querySelector('.playingnow .one-c');
const output = '';

fetch(url)
.then((res) => res.json())
.then((data) => {
const movies = data.results;
var output ='';
movies.forEach((movie, index)=> {
output += `
<div class="smallbox">
 <div class="img">
    <img
    data-id=${movie.id} 
data-name="${movie.name}" 
data-poster="${movie.poster_path}" 
data-overview="${movie.overview}" 
data-popularity="${movie.popularity}" 
data-date="${movie.first_air_date}" 
data-average="${movie.vote_average}" 
onclick="movieopen(
this.dataset.name, 
this.dataset.id, 
this.dataset.poster,
this.dataset.overview,
this.dataset.popularity,
this.dataset.date,
this.dataset.average
)" 
    src="${img_url + movie.poster_path}" alt="${movie.name}" />
 </div>
</div>
`;
  });
popular.innerHTML = output;
return popular;
})
.catch((er)=> {
  console.log(er);
});

}


function thriller(){

var url = ' https://api.themoviedb.org/3/movie/now_playing?api_key=d1fbac53ccc3044ce12332eebf023776&language=en-US&page=1';

//console.log(url);

const popular = document.querySelector('.thriller .one-c');
const output = '';

fetch(url)
.then((res) => res.json())
.then((data) => {
const movies = data.results;
var output ='';
movies.forEach((movie, index)=> {
output += `
<div class="smallbox">
 <div class="img">
    <img
    data-id=${movie.id} 
data-name="${movie.name}" 
data-poster="${movie.poster_path}" 
data-overview="${movie.overview}" 
data-popularity="${movie.popularity}" 
data-date="${movie.first_air_date}" 
data-average="${movie.vote_average}" 
onclick="movieopen(
this.dataset.name, 
this.dataset.id, 
this.dataset.poster,
this.dataset.overview,
this.dataset.popularity,
this.dataset.date,
this.dataset.average
)" 
    src="${img_url + movie.poster_path}" alt="${movie.name}" />
 </div>
</div>
`;
  });
popular.innerHTML = output;
return popular;
})
.catch((er)=> {
  console.log(er);
});

}


// gototop btn
window.addEventListener('scroll', function() {
const gotobtn = document.querySelector('.gototop');
  
if(this.scrollY > 350){
gotobtn.classList.add('displaynone');
} else{
gotobtn.classList.remove('displaynone');
}

});

function gototop() {
  window.scrollTo({
   top:0,
   left: 0
  });
 // alert('hdhd');
}


function changemaonimg() {
  
const imgarray = [
  'https://image.tmdb.org/t/p/w500/bEAdFxRSDrfuVhLfubZoubbcMqI.jpg',
  'https://image.tmdb.org/t/p/w500/r17jFHAemzcWPPtoO0UxjIX0xas.jpg',
  'https://image.tmdb.org/t/p/w500/514NdnX5jPBbGMnmzDaWrWKGytC.jpg',
  'https://image.tmdb.org/t/p/w500/lVcI3MOtumvEbOdS1Og7QoV6Lfc.jpg',
  'https://image.tmdb.org/t/p/w500/ihNGwszP89k2h4OHaYAnePQ15xc.jpg'
  ];
  
let i = Math.floor(Math.random() * 5);
 
const imgc = document.querySelector('.is-img img');

const img = imgarray[i];
imgc.src = img;


}


setInterval(changemaonimg, 2500);


// thambi
//bEAdFxRSDrfuVhLfubZoubbcMqI.jpg

//johnwick
//r17jFHAemzcWPPtoO0UxjIX0xas.jpg

//ayya
//514NdnX5jPBbGMnmzDaWrWKGytC.jpg

//jango
//lVcI3MOtumvEbOdS1Og7QoV6Lfc.jpg

//6
//https://image.tmdb.org/t/p/w500
//ihNGwszP89k2h4OHaYAnePQ15xc.jpg