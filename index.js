function newListItem(name, img) {
  var item = $("<div>").addClass("row").addClass("item");
  var imgColumn = $("<div>").addClass("col-2");
  var nameColumn = $("<div>").addClass("col-6").text(name);
  var removeColumn = $("<div>").addClass("col-2");
  var imglink = $("<img>").addClass("img-item").attr("src", img).attr("alt", name);
  var button = $("<button>").attr("href", "#").addClass("btn btn-danger");
  var icon = $("<i>").addClass("fa").addClass("fa-times");


  button.append(icon);
  removeColumn.append(button);
  imgColumn.append(imglink);
  

  item.append(imgColumn);
  item.append(nameColumn);
  item.append(removeColumn);
  
  return item;
}

function removeItem() {
  event.preventDefault();
  var item = $(this).parent().parent();

  item.fadeOut(function(){
    item.remove();
  });
}

function updatePreList(json){
  var listLength = json.list.length;

  for (var i =0; i < listLength; i++) {
    var item = json.list[i];
    item = newListItem(item.name, item.img);

    item.find(".botao-remover").click(removeItem);

    $("#trimmer").append(item);
  };
}

var iceCreamJson = {
  "title": "Ice Cream Flavors",
  "explanation": "Those are the most popular Ice Cream Flavors according to the International Ice Cream Association. From those flavors, which ones are YOUR favorites?",
  "list": [ {"name": "Vanilla", "img": "http://www.tidyaire.com/uploads/7/4/2/9/74291919/s677363335125410898_p12_i1_w500.jpeg"},
            {"name": "Chocolate", "img": "http://www.milkmaid.in/Images/Recipe/Chocolate%20694x400_11.JPG"},
            {"name": "Strawberry", "img": "http://holisticallyengineered.com/wp-content/uploads/2012/09/strawberry-ice-cream_tuneblog-1.jpg"},
            {"name": "Neapolitan", "img": "http://www.articlesweb.org/blog/wp-content/uploads/2011/11/neapolitan-ice-cream-origin-and-recipe-sources-4.jpg"},
            {"name": "Chocolate chip", "img": "http://www.vegrecipesofindia.com/wp-content/uploads/2016/12/chocolate-chips-ice-cream-recipe-12.jpg"},
            {"name": "Cookies and Cream", "img": "http://www.chewoutloud.com/wp-content/uploads/2013/08/Cookies-n-Cream-Ice-Cream-2.jpg"},
            {"name": "Cherry", "img": "http://www.seriouseats.com/recipes/assets_c/2012/06/20120627-cherry-ice-cream-primary-thumb-625xauto-252967.jpg"},
            {"name": "Chocolate almond", "img": "https://barefeetinthekitchen.com/wp-content/uploads/2013/07/chocolate-almond-ice-cream-8.jpg"},
            {"name": "Pistachio", "img": "https://www.tablefortwoblog.com/wp-content/uploads/2014/04/pistachio-ice-cream-tablefortwoblog-2.jpg"},
            {"name": "Mint Chocolate", "img": "http://www.recipe4living.com/assets/itemimages/400/400/3/default_36fc5210cd4f4bae865ead91bef9071c_junemediamint.jpg"}]
}

$(document).ready(function(){
  console.log("ai papai")
  updatePreList(iceCreamJson);
});