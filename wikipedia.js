var lang ='en';
var message ='<p> No matches found!</p>';
var more ='Read More ...';


$('#fr').click(function(){
  $('#results').empty();
  lang ='fr';
  message ='<p>Aucune correspondance trouvée</p>'
  $('#searchInput').attr('placeholder','Entrez un mot clé')
  $('#fr').addClass('badge badge-primary');
  $('#en').removeClass('badge badge-primary');
  more  = 'Lire plus ...';

});

$('#en').click(function(){
  $('#results').empty();
  lang ='en';
  message ='<p> No matches found!</p>'
  $('#searchInput').attr('placeholder','Insert a keyword')
  $('#en').addClass('badge badge-primary');
  $('#fr').removeClass('badge badge-primary');
  more ='Read More ...';
});

$('#random').click(function(){
  window.open('https://'+lang+'.wikipedia.org/wiki/Special:Random');
});

function search(){

  $('#results').empty();
  var keyword =$('#searchInput').val();
  $('#searchInput').val('');
  $.getJSON('https://'+lang+'.wikipedia.org/w/api.php?action=opensearch&search='+keyword+'&format=json&origin=*',function( json ){
    console.log(json);
    if (typeof json[1] !== "undefined" && json[1].length > 0) {
      var numberOfItem = json[1].length;
      for (var i = 0 ; i<numberOfItem; i++){
        $('#results').append(
          '<article class="card"><header class="card-header">'
          +json[1][i]+
          '</header><section class="card-body"><p class="card-text">'
          +json[2][i]+
          '</p><span class="footer"><button data-url='
          +json[3][i]+
          ' class="btn btn-primary oneArticle">'+more+'</button></span></section></article></br>')
      }
    }
    else{
      $('#results').append(message);
    }
  });

}

$(document).keypress(function(e) {
    if(e.which == 13) {
        search();
    }
});

$('#search').click(function(){
  search();
});

$(document).on( "click",'.oneArticle', function() {
  window.open($(this).attr('data-url'));

});

$(document).ready(function(){
  $('#searchInput').focus();
});
