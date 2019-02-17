
var obj,EditID;
console.log(localStorage.getItem('token'));
var token = localStorage.getItem('token');
$(document).ready(function(){
  $("#Add_button").click(function(){

      var name = document.getElementById("SkillText").value;
      if(!name){
        alert("Please Enter first");
        window.location.reload();
      }
      console.log(name);
      myOBJ = { name };
      console.log("Adding");
      console.log(myOBJ);
       AddSkill();

  });
  $("#list_button").click(function(){

      console.log("Showing");
      GETALL();
  });

    $("#logoutbtn").click(function(){

        console.log("token here");
        localStorage.removeItem("token");

    });

});



function GETALL(){
  $.ajax({
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3333/api/skills/Allskills",
    "method": "GET",
    "data":"",
    success: function(res){
      console.log(res);
      showtable(res);
      obj = res;
    },
  });
}

function AddSkill(){
    console.log("Inside Skills");
    var name = document.getElementById("SkillText").value;
    myOBJ = { name };
    console.log(name);
    console.log(myOBJ);

    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3333/api/skills/makeskill",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "x-auth-token":token
      },
      // "processData": false,
      "data":JSON.stringify(myOBJ),
      success: function(res){

        console.log("Created");
        console.log(res);
        alert("Added");
        window.location.reload();
      }
    });
}


function myfuncdel(imageID){       // function to delete data
    console.log("In Delete");
    console.log(imageID);
    delid = imageID.slice(3,);
    console.log(delid);
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3333/api/skills/"+delid,
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
          "url": "http://localhost:3333/api/skills/" + delid,
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
      "url": "http://localhost:3333/api/skills/"+imageID,
      "method": "GET",
      "headers": {
        "x-auth-token":token
      },
      "data":"",
      success: function(res){
        console.log("GOT BY ID");
        console.log(res);
        var input = document.createElement("input");
        input.setAttribute("type","text");
        input.setAttribute("id","NewName");
        input.setAttribute("placeholder", res.name);
        input.setAttribute("class", "text-center");
        var modal_body = document.getElementById("modal_body");
        modal_body.appendChild(input);
  }
});
}

function updatemethod(){
    console.log("In update");
    var name = document.getElementById("NewName").value;
    console.log(name);
    console.log(EditID);
    myOBJ = {name};
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3333/api/skills/" + EditID,
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json",
        "x-auth-token":token
      },
      "data":JSON.stringify(myOBJ),
      success: function(res){

        console.log("Updated");
        alert("Updated");
        window.location.reload();
      }
    });
}




function showtable(jsonObj){

// function showtable(jsonObj) {
    var body = document.getElementById('pop');
    var col = [];
        // for (var i = 0; i < jsonObj.length; i++) {
        //     for (var key in jsonObj[i]) {
        //         if (col.indexOf(key) === -1 ) {
        //             col.push(key);
        //         }
        //     }
        // }
    col.push("name");
    col.push("");
    console.log("col");
    console.log(col);


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

        tr = table.insertRow(-1);

        for (var j = 0; j < (col.length - 1) ; j++) {
            var tabCell = tr.insertCell(-1);                    // values in table cells
            tabCell.innerHTML = jsonObj[i][col[j]];
        }

        var tabCell = tr.insertCell(-1);

        var myImage1 = new Image(20, );
        myImage1.src = 'edit.png';
        myImage1.setAttribute("data-toggle","modal");
        myImage1.setAttribute("data-target","#exampleModal");                    // Edit and Delete images
        var myImage2 = new Image(20, );
        myImage2.src = 'delete.png';
        myImage1.setAttribute("id", jsonObj[i]._id);
        console.log(jsonObj[i]._id);
        myImage1.setAttribute("onclick","myfuncedit(this.id)");
        myImage2.setAttribute("id", "del" + jsonObj[i]._id)
        myImage2.setAttribute("onclick","myfuncdel(this.id)");

        tabCell.appendChild(myImage1);
        tabCell.appendChild(myImage2);
        tr.appendChild(tabCell);
        table.appendChild(tr);
    }
    var pop = document.getElementById("pop");
    pop.appendChild(table);

}
