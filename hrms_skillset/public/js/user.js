$(document).ready(function() {
    var username, username_email, skills,username_img;
    $('.js-example-basic-multiple').select2();

    console.log(localStorage.getItem('token'));
    var token = localStorage.getItem('token');

    $.ajax({
      "async": false,
      "crossDomain": true,
      "url": "http://localhost:3333/api/skills/Allskills",
      "method": "GET",
      "data":"",
      success: function(res){
        console.log(res);
        var Skills_option = document.getElementById("Skills_option");
        for(var i=0; i<res.length; i++){
          var option = document.createElement("option");      // TABLE HEADER.
          option.innerHTML = res[i].name;
          option.setAttribute("value",res[i].name);
          Skills_option.appendChild(option);
        }
      },
    });

    $.ajax({
      "async": false,
      "crossDomain": true,
      "url": "http://localhost:3333/api/users/skills",
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        "x-auth-token":token
      },
      // "processData": false,
      "data":"",
      success: function(res){
        console.log(res);
            skills = res.skills;
            username = res.name;
            username_email = res.username;
            username_img = res.path;
            console.log(username);
            console.log(username_email);
            updateSkills(skills);
        },
    });


    function updateSkills(skills){

      document.getElementById("Username").innerHTML = username;
      document.getElementById("Username_email").innerHTML = username_email;
      document.getElementById("prf_img").setAttribute("src","/img/"+username_img);
      var display_skills = document.getElementById("display_skills");
      display_skills.innerHTML = "";
      for (var i = 0; i < skills.length; i++) {
          var skilldiv = document.createElement("div");      // TABLE HEADER.
          skilldiv.innerHTML = skills[i];
          skilldiv.setAttribute("value",skills[i]);
          skilldiv.setAttribute("class","skill");
          display_skills.appendChild(skilldiv);
      }
    }

    $("#ADDbtn").click(function(){
      console.log("here");
      console.log($(".js-example-basic-multiple").val());
      var newskill = $(".js-example-basic-multiple").val();  // Values selected in select2
      $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3333/api/users/skills",
        "method": "PUT",
        "headers": {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          "x-auth-token":token
        },
        // "processData": false,
        "data":JSON.stringify({"skills":newskill}),
        success: function(res){
              var skills = res;
              updateSkills(skills);
              $('.js-example-basic-multiple').val('').trigger('change');
              // location.reload();
          },
      });
    });
    $("#logoutbtn").click(function(){

        console.log("token here");
        localStorage.removeItem("token");
    });
});
