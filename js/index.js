// returns a Jquery item for the trimmer list of the application
function newTrimmerItem(name, img) {
  var item = $("<div>").addClass("row").addClass("item-trimmer");
  var imgCol = $("<div>").addClass("col-5");
  var nameCol = $("<div>").addClass("col-3 itemName").text(name);
  var removeCol = $("<div>").addClass("col-4");
  var imgLink = $("<img>").attr("src", img).attr("alt", name).addClass("img-thumbnail").addClass("img-trimmer");
  var button = $("<button>").attr("href", "#").addClass("btn btn-danger");
  var icon = $("<i>").addClass("fa").addClass("fa-times");

  button.append(icon);
  removeCol.append(button);
  imgCol.append(imgLink);

  item.append(imgCol);
  item.append(nameCol);
  item.append(removeCol);

  return item;
}

// returns a Jquery item for the final Rank of the application
function newFinalItem(name, img, i) {
  var i = i + 1
  var finalText = "#" + i.toString() + " " + name

  var item = $("<div>").addClass("row").addClass("item-final");
  var nameCol = $("<div>");
  var imgLink = $("<img>").addClass("img-fluid").addClass("img-final").attr("src", img).attr("alt", name);
  var imgCol = $("<div>").addClass("final-img-col");

  if(i == 1){
    finalText = "<h3>" + finalText + "</h3>";
    item.addClass("first-place");
    nameCol.addClass("col-6").html(finalText);
    imgCol.addClass("col-6");
  } else {
    nameCol.addClass("col-6").html(finalText);
    imgCol.addClass("col-5");
  };

  imgCol.append(imgLink);

  item.append(imgCol);
  item.append(nameCol);

  return item;
}

function updateRankerItems(items, baseJson){
  var leftItem = items[0]
  var rightItem = items[1]
  $("#left-ranker").children("h3").text(leftItem)
  $("#left-ranker").children("img").attr("src", baseJson.list[leftItem]["img"])

  $("#right-ranker").children("h3").text(rightItem)
  $("#right-ranker").children("img").attr("src", baseJson.list[rightItem]["img"])
}

// removes the row of a trimmer item
function removeItem() {
  event.preventDefault();
  var item = $(this).parent().parent()
  item.fadeOut(400, function(){
    item.remove()
  });
}

// loops through the given json and creates the trimmer list on the page view
function updateTrimmerList(json){
  $("#explanation").html(json.explanation)
  for (key in json.list) {
    var item = newTrimmerItem(key, json.list[key]["img"]);

    item.find(".btn-danger").click(removeItem);

    $(".trimmer-list").append(item);
  };
}

// loops through the given list and creates the final list on the page view
// uses a base json to get the remaining information
function updateFinalList(list, baseJson){
  for (var i=0; i < list.length; i++) {
    var key = list[i]
    var item = newFinalItem(key, baseJson.list[key]["img"], i);
    $(".rank-list").append(item);
  }
}

// Function to shuffle the array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Runs the program
$(document).ready(function(){
  var trimmedList = [];
  var finalList = [];
  var sorter;
  var listToRank;

  $("#pick-ice-cream").click(function(){
    listToRank = iceCreamJson;
    updateTrimmerList(listToRank);
    $("#picker").fadeOut(400, function(){
      $("#trimmer").fadeIn(400);
    });
  });

  $("#pick-pixar").click(function(){
    listToRank = pixarJson;
    updateTrimmerList(listToRank);
    $("#picker").fadeOut(400, function(){
      $("#trimmer").fadeIn(400);
    });
  });

  $("#pick-goty-2017").click(function(){
    listToRank = goty2017json;
    updateTrimmerList(listToRank);
    $("#picker").fadeOut(400, function(){
      $("#trimmer").fadeIn(400);
    });
  });

  $("#continue-trimmer").click(function(){
    $(".itemName").each(function(){trimmedList.push($(this).text())});
    shuffle(trimmedList);
    $("#trimmer").fadeOut(400, function(){
      $("#ranker").fadeIn(400);
    });

    sorter = new MergeSorter();
    sorter.init(trimmedList);
    updateRankerItems(sorter.getNextComparisonItems(), listToRank)
    sorter.onChange(() => {
      $("#ranker").fadeOut(100, function(){
        updateRankerItems(sorter.getNextComparisonItems(), listToRank)
        $("#ranker").fadeIn(100);
      });
    });

    sorter.onFinish(sortedList => {
      finalList = sortedList;
  		// stop sorting
  		sort = false;
      updateFinalList(finalList, listToRank);
      $("#ranker").fadeOut(400, function(){
        $("#final-rank").fadeIn(400);
      });
  	});

    $('#left-ranker').click(function (){
      sorter.setComparisonResult(true);
    });

    $('#right-ranker').click(function (){
      sorter.setComparisonResult(false);
    });
  });
});
