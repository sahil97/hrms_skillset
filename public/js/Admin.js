var obj,EditID,col = [];
var token = localStorage.getItem('token');
$(document).ready(function(){

    // $("#pop").hide();

    $("#logoutbtn").click(function(){

        console.log("token here");
        localStorage.removeItem("token");
    });
    $("#list_button").click(function(){
          $("#pop").show();
          GETALL();
    });

});

function GETALL(){
  $.ajax({
    "async": true,
    "crossDomain": true,
    "url": "/api/users",
    "method": "GET",
    "data":"",
    success: function(res){
      console.log(res);

            var pop = document.getElementById("pop");
            pop.innerHTML="";
      showtable(res);

      obj = res;
    },
  });
}

function showtable(jsonObj){
  col.push("name");
  col.push("username");
  col.push("");
  console.log("col");
  console.log(col);

      var pop = document.getElementById("pop");
      console.log("clearing pop");
      console.log(pop);
      pop.innerHTML= "";
      var table = document.createElement("table");
      var tr = table.insertRow(-1);
      for (var i = 0; i < col.length; i++) {
          var th = document.createElement("th");  // headings
          console.log("headings");
          th.innerHTML = col[i].toUpperCase();
          tr.appendChild(th);
      }
      table.appendChild(tr);
      for (var i = 0; i < jsonObj.length; i++) {
          if(jsonObj[i].role == "sa"){
            console.log("Skipped");
            continue;
          }
          tr = table.insertRow(-1);

          for (var j = 0; j < (col.length - 1) ; j++) {
              var tabCell = tr.insertCell(-1);                    // values in table cells
              tabCell.innerHTML = jsonObj[i][col[j]];
          }

          var tabCell = tr.insertCell(-1);

          var myImage1 = new Image(20, );
          myImage1.src = 'edit.png';
          myImage1.setAttribute("data-toggle","modal");
          myImage1.setAttribute("data-target","#exampleModal");              // Edit and Delete images
          var myImage2 = new Image(20, );
          myImage2.src = 'delete.png';
          myImage1.setAttribute("id", jsonObj[i]._id);
          myImage1.setAttribute("onclick","myfuncedit(this.id)");
          myImage2.setAttribute("id", "del" + jsonObj[i]._id)
          myImage2.setAttribute("onclick","myfuncdel(this.id)");

          tabCell.appendChild(myImage1);
          tabCell.appendChild(myImage2);
          tr.appendChild(tabCell);
          table.appendChild(tr);
      }

      pop.appendChild(table);

  }




function myfuncdel(imageID){       // function to delete data
    console.log("In Delete");
    console.log(imageID);
    delid = imageID.slice(3,);
    console.log(delid);
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "/api/users/user/"+delid,
      "method": "GET",
      "headers": {
        "x-auth-token":token
      },
      // "processData": false,
      "data":"",
      success: function(res){
        console.log("GOT by id");
        console.log(res);
        $.ajax({
          "async": false,
          "crossDomain": true,
          "url": "/api/users/register/" + delid,
          "method": "DELETE",
          "headers": {
            "x-auth-token":token
          },
          // "processData": false,
          "data":"",
          success: function(res){
              console.log("deleted");
              window.location.reload();
      }
    });

  }
});
}


function myfuncedit(imageID){               // function to edit data
    EditID = imageID;
    console.log("In Edit");
    console.log("THIS is :",imageID);
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "/api/users/user/"+imageID,
      "method": "GET",
      "headers": {
        "x-auth-token":token
      },
      "data":"",
      success: function(res){
        console.log("GOT BY ID");
        console.log(res);
        var name = $('#newname');
        var some = document.getElementById('some');
        console.log(res.username);
        newname.setAttribute("value",res.name);
        some.setAttribute("value",res.username);
      }
    });
}

function updatemethod(){
    console.log("In update");
    var name = document.getElementById("newname").value;
    var username = document.getElementById("some").value;

    console.log(newname);
    console.log(EditID);
    myOBJ = {name, username};
    console.log(myOBJ);
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "/api/users/register/" + EditID,
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json",
        "x-auth-token":token
      },
      "data":JSON.stringify(myOBJ),
      success: function(res){
        console.log(res);
        console.log("Updated");
        alert("Updated");
        window.location.reload();
      }
    });
}
