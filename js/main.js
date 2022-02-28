var urlOne = 'https://newsapi.org/v2/everything?' +
          'q=Ukraine&' +
          'sources=bbc-news&'+
          'from=2022-02-27&' +
          'sortBy=publishedAt&' +
          'apiKey=6ae202723813481e9bdd49f27368f69d';
var reqOne = new Request(urlOne);
var urlTwo = 'https://newsapi.org/v2/everything?' +
          'q=Ukraine&' +
          'sources=independent&'+
          'from=2022-02-27&' +
          'sortBy=publishedAt&' +
          'apiKey=6ae202723813481e9bdd49f27368f69d';
var reqTwo = new Request(urlTwo);
var urlThree = 'https://newsapi.org/v2/everything?' +
          'q=Ukraine&' +
          'sources=reuters&'+
          'from=2022-02-27&' +
          'sortBy=publishedAt&' +
          'apiKey=6ae202723813481e9bdd49f27368f69d';
var reqThree = new Request(urlThree);

var srcOne = localStorage.getItem('localSourceOne');
var srcTwo = localStorage.getItem('localSourceTwo');
var srcThree = localStorage.getItem('localSourceThree');

var parseOne = JSON.parse(srcOne)
var parseTwo = JSON.parse(srcTwo)
var parseThree = JSON.parse(srcThree)

function sourceRender (source, selector) {
  let nws = source;
  let artcls = nws.articles;
  let sourcesSelector = '.sources-container__placeholder '+ selector +' .source-one-content';
  console.log(sourcesSelector);
  console.log(nws, 'news');

  var placeholder = document.querySelector(sourcesSelector);
  var html = [];

  artcls.forEach((item, i) => {
    let splitTitle;
    let sourceAuthor;
    let date;

    date = new Date(item.publishedAt).toLocaleDateString(
      'en-gb',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    ); // 18 February 2019

    if(item.author != null) {
      sourceAuthor = item.author;
    }else {
      sourceAuthor = item.source.name;
    }
    if(item.title.includes(':')) {
      var titleSplit = item.title.split(':');
      splitTitle = '<span>'+titleSplit[0]+'</span>'+titleSplit[1];
    }else {
      splitTitle = item.title;
    }
    html.push('<div class="source-content-card"><div class="image-placeholder"><img class="source-image" src="'+item.urlToImage+'"></img></div><h1 class="source-healine">'+splitTitle+'</h1>'+'<small>'+sourceAuthor + ' / ' + date+'</small> <a target="_blank" href="'+item.url+'"></a></div>');
  });

  placeholder.innerHTML = html.join('', '');
}

//bbc
if(!srcOne) {
  console.log('LIVE');
  fetch(reqOne)
      .then(function(response) {
          var nwsObj = response.json();
          return nwsObj;
      })
      .then((data) => {
        localStorage.setItem('localSourceOne', JSON.stringify(data));
        sourceRender(data, '.source-one');
      })
      .catch(function(error) {
       console.log(error);
     });
     fetch(reqTwo)
         .then(function(response) {
             var nwsObj = response.json();
             return nwsObj;
         })
         .then((data) => {
           localStorage.setItem('localSourceTwo', JSON.stringify(data));
           sourceRender(data, '.source-two');
         })
         .catch(function(error) {
          console.log(error);
        });
      fetch(reqThree)
          .then(function(response) {
              var nwsObj = response.json();
              return nwsObj;
          })
          .then((data) => {
            localStorage.setItem('localSourceThree', JSON.stringify(data));
            sourceRender(data, '.source-three');
          })
          .catch(function(error) {
           console.log(error);
         });
} else {
  console.log('TESTING');
  sourceRender(parseOne, '.source-one');
  sourceRender(parseTwo, '.source-two');
  sourceRender(parseThree, '.source-three');
}
