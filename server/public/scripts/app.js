var people = [];
var currentIndex = 0;
var timerID = null;

$(document).ready(function(){
  loadData();
  startTimer();

  // event listeners
  $("#next-person").on("click", nextPerson);
  $("#prev-person").on("click", prevPerson);

  function nextPerson() {
    $("#person-container").fadeOut(400, function() {
      currentIndex++;
      if(currentIndex >= people.length) {
        currentIndex = 0;
      }
      showPerson();
      updateTracker();
      restartTimer();
    });

  }

  function prevPerson() {
    $("#person-container").fadeOut(400, function() {
      currentIndex--;
      if(currentIndex < 0) {
        currentIndex = people.length - 1;
      }
      showPerson();
      updateTracker();
      restartTimer();
    });
  }

  function showPerson() {
    var person = people[currentIndex];
    var gitLink = "https://github.com/" + person.git_username;
    // update DOM elements
    $("#person-name").text(person.name);
    $("#person-shoutout").text(person.shoutout);
    $("#person-git").attr("href", gitLink);
    $("#person-container").fadeIn(200);
  }

  function loadData() {
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        people = data.omicron;
        showPerson();
        createTracker();
      }
    });
  }

  function createTracker() {
    people.forEach(function(person, i) {
      $("#tracker-container").append("<li>" + i + "</li>");
      $("#tracker-container").children().last().data("index", i);
    });
    updateTracker();
  }

  function updateTracker() {
    $("#tracker-container").children().each(function(i, item) {
      if($(this).data("index") == currentIndex) {
        $(this).addClass("current");
      } else {
        $(this).removeClass("current");
      }
    })
  }

  function startTimer() {
    timerID = setInterval(nextPerson, 4000);
  }

  function restartTimer() {
    clearInterval(timerID);
    startTimer();
  }

});
