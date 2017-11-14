const DomoChamp = function(props) {
  if(props.domos.length === 0){
    return (
      <h3>There is no champion because you have no Domos!</h3>
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
  
  return (
    <h1>{champName} is the champion, with a dankness level of {champDank}</h1>
  );
};

const DomoList = function(props) {
  if(props.domos.length === 0){
    return (
      <div className="domoList">
        <h3 className="emptyDomo">No Domos yet</h3>
      </div>
    );
  }
  
  const domoNodes = props.domos.map(function(domo) {
    return (
      <div let={domo._id} className="domo">
        <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
        <h3 className="domoName">Name: {domo.name}</h3>
        <h3 className="domoAge">Age: {domo.age}</h3>
        <h3 className="domoAge">Dankness: {domo.dankness}</h3>
      </div>
    );
  });
  
  return (
    <div className="domoList">
      {domoNodes}
    </div>
  );
};

const setup = function(csrf) {  
  sendAjax('GET', '/getDomos', null, (data) => {
    ReactDOM.render(
      <DomoList domos={data.domos} />,
      document.querySelector("#domos")
    );
    
    ReactDOM.render(
    <DomoChamp domos={data.domos} />,
    document.querySelector("#domoChampion")
    );
  });
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
  
  console.log("document ready");
});