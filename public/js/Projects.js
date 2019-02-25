$(document).ready(function() {
    $('.js-example-basic-multiple').select2();
    var token = localStorage.getItem('token');
    $("#logoutbtn").click(function(){

        console.log("token here");
        localStorage.removeItem("token");

    });
    $.ajax({
      "async": false,
      "crossDomain": true,
      "url": "/api/skills/Allskills",
      "method": "GET",
      "data":"",
      success: function(res){
        console.log(res);
        console.log("Inside");
        var Skills_option = document.getElementById("Skills_option");
        for(var i=0; i<res.length; i++){

          var option = document.createElement("option");      // TABLE HEADER.
          option.innerHTML = res[i].name;
          option.setAttribute("value",res[i].name);
          Skills_option.appendChild(option);
        }
      },
    });

    $("#pop").hide();

    $("#recommend").click(function(){

      console.log("Inside recommend");
      console.log($(".js-example-basic-multiple").val());
      var skills = $(".js-example-basic-multiple").val();
      if(skills.length == 0 || !(document.getElementById("Name").value)){
        console.log(skills);
        alert("All fields are required");
      }
      else{
        $.ajax({
          "async": false,
          "crossDomain": true,
          "url": "/api/users/getBySkill",
          "method": "POST",
          "headers": {
            "Content-Type": "application/json",
            "x-auth-token":token
          },
          "data":JSON.stringify({ "skills": skills}),
          success: function(res){
            console.log(res);
            console.log("received");
            var recommend = document.getElementById("recommendcol");
            if(document.getElementById("Select")){
              console.log("There are 2 ");
              var select = document.getElementById("Select");
              select.parentNode.removeChild(select);
            }
            var select = document.createElement("Select");
            for(var i=0; i<res.length; i++){
              console.log(res[i].name);
              var option = document.createElement("option");
              // option.setAttribute("class","col-sm-6");
              option.textContent = res[i].name;
              option.setAttribute("value",res[i].name);

              select.appendChild(option);
            }
            recommend.appendChild(select);
          }
        });
      }
});
});
