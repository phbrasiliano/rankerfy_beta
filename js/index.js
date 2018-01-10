// returns a Jquery item for the trimmer list of the application
function newTrimmerItem(name, img) {
  var item = $("<div>").addClass("row").addClass("item-trimmer");
  var imgCol = $("<div>").addClass("col-3");
  var nameCol = $("<div>").addClass("col-6 itemName").text(name);
  var removeCol = $("<div>").addClass("col-3");
  var imgLink = $("<img>").addClass("img-item").attr("src", img).attr("alt", name);
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

  var item = $("<div>").addClass("row").addClass("item-final");
  var numCol = $("<div>").addClass("col-1").text(i.toString() + ".");
  var nameCol = $("<div>").addClass("col-6").text(name);
  var imgLink = $("<img>").addClass("img-item").attr("src", img).attr("alt", name);
  var imgCol = $("<div>").addClass("col-3");

  imgCol.append(imgLink);

  item.append(numCol);
  item.append(imgCol);
  item.append(nameCol);

  return item;
}

function updateRankerItems(items, baseJson){
  var leftItem = items[0]
  var rightItem = items[1]
  $("#left-ranker").children("p").text(leftItem)
  $("#left-ranker").children("img").attr("src", baseJson.list[leftItem]["img"])

  $("#right-ranker").children("p").text(rightItem)
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
    listToRank = iceCreamJson
    updateTrimmerList(listToRank);
    $("#picker").fadeOut(400, function(){
      $("#trimmer").fadeIn(400);
    });
  });

  $("#continue-trimmer").click(function(){
    $(".itemName").each(function(){trimmedList.push($(this).text())});
    $("#trimmer").fadeOut(400, function(){
      $("#ranker").fadeIn(400);
    });

    sorter = new MergeSorter();
    sorter.init(trimmedList);
    updateRankerItems(sorter.getNextComparisonItems(), listToRank)
    sorter.onChange(() => {
      updateRankerItems(sorter.getNextComparisonItems(), listToRank)
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
