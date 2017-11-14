"use strict";

var DomoChamp = function DomoChamp(props) {
  if(props.domos.length === 0){
    return React.createElement(
      "h3",
      "There is no champion because you have no Domos!"
    );
  }
  
  var champDank = 0;
  var champAge = 0;
  var champName = "";
  
  props.domos.map(function(domo) {
    if(domo.dankness > champDank){
      champName = domo.name;
      champAge = domo.age;
      champDank = domo.dankness;
    } else if(domo.dankness === champDank){
      if(domo.age > champAge){
        champName = domo.name;
        champAge = domo.age;
        champDank = domo.dankness;
      }
    }
  });
  
  return React.createElement(
    "h1",
    "",
    champName, 
    " is the champion, with a dankness level of ",
    champDank,
    "!"
  );
};

var DomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return React.createElement(
      "div",
      { className: "domoList" },
      React.createElement(
        "h3",
        { className: "emptyDomo" },
        "No Domos yet"
      )
    );
  }

  var domoNodes = props.domos.map(function (domo) {
    return React.createElement(
      "div",
      { "let": domo._id, className: "domo" },
      React.createElement("img", { src: "/assets/img/domoface.jpeg", alt: "domo face", className: "domoFace" }),
      React.createElement(
        "h3",
        { className: "domoName" },
        "Name: ",
        domo.name
      ),
      React.createElement(
        "h3",
        { className: "domoAge" },
        "Age: ",
        domo.age
      ),
      React.createElement(
        "h3",
        { className: "domoDankness" },
        "Dankness: ",
        domo.dankness
      )
    );
  });

  return React.createElement(
    "div",
    { className: "domoList" },
    domoNodes
  );
};

var setup = function setup(csrf) {
  sendAjax('GET', '/getDomos', null, function (data) {
    ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector("#domos"));
    
    ReactDOM.render(React.createElement(DomoChamp, { domos: data.domos }), document.querySelector("#domoChampion"));
  });
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();

  console.log("document ready");
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({ width: 'hide' }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageOb = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};