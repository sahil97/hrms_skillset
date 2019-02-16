$(document).ready(function() {
    var username, username_email, skills;
    $('.js-example-basic-multiple').select2();
    all_skills = ["html","CS"];
    console.log(localStorage.getItem('token'));
    var token = localStorage.getItem('token');
    // skill is for user's skills
    // all_skill is for all skills
    // and skill database
    // store all skills in skills array

    $.ajax({
      "async": true,
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
            console.log(username);
            console.log(username_email);
            updateSkills(skills);
        },
    });


    function updateSkills(skills){

      document.getElementById("Username").innerHTML = username;
      document.getElementById("Username_email").innerHTML = username_email;
      var display_skills = document.getElementById("display_skills");
      for (var i = 0; i < skills.length; i++) {
          var skilldiv = document.createElement("div");      // TABLE HEADER.
          skilldiv.innerHTML = skills[i];
          skilldiv.setAttribute("value",skills[i]);
          skilldiv.setAttribute("class","skill");
          display_skills.appendChild(skilldiv);
      }
    }

    var Skills_option = document.getElementById("Skills_option");
    for (var i = 0; i < all_skills.length; i++) {
        var option = document.createElement("option");      // TABLE HEADER.
        option.innerHTML = all_skills[i];
        option.setAttribute("value",all_skills[i]);
        Skills_option.appendChild(option);
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
              location.reload();
          },
      });
    });
    $("#logoutbtn").click(function(){

        console.log("token here");
        localStorage.removeItem("token");
    });
});
