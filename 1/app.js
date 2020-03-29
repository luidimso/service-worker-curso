;(function(){
  'use strict';

  var button = document.getElementById("btn-git");
  button.addEventListener('click', function(event){
    self.fetch("https://api.github.com/users").then(function(response){
      return response.json();
    }).then(function(users){
      console.log(users);
    });
  });
})();
