var obj;
$(document).ready(function(){

    $("#pop").hide();
    $("#Updatebtn").click(function(){
      var Updatebtn = document.getElementById("Updatebtn");
      Updatebtn.setAttribute("data-dismiss","modal");
    });

    console.log(localStorage.getItem('token'));
    var token = localStorage.getItem('token');

    $("#list_button").click(function(){
          $("#pop").show();
///////////////////////////////////////////////////////////////////////////////////////////////////
          $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3333/api/users",
            "method": "GET",
            "data":"",
            success: function(res){
              console.log(res);
              showtable(res);
              obj = res;
            },
          });
///////////////////////////////////////////////////////////////////////////////////////////////////

    });


    $("#logoutbtn").click(function(){

        console.log("token here");
        localStorage.removeItem("token");
    });
});

function showtable(jsonObj){

  var body = document.getElementById('pop');
  // jsonObj = [{"Name": "Taran", "Id": "33"}];
  showtable(jsonObj);
  // showtable(res);
  function showtable(jsonObj) {

      var col = [ "name", "username"];
          // for (var i = 0; i < jsonObj.length; i++) {
          //     for (var key in jsonObj[0][i]) {
          //         if (col.indexOf(key) === -1 ) {
          //             col.push(key);
          //         }
          //     }
          // }
      col.push("");
      console.log("col");
      console.log(col);


      var table = document.createElement("table");
      var tr = table.insertRow(-1);

      for (var i = 0; i < col.length; i++) {
          var th = document.createElement("th");  // headings
          console.log("headings");
          th.innerHTML = col[i];
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
          // data-toggle="modal" data-target="#exampleModal"
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
      var pop = document.getElementById("pop");
      pop.appendChild(table);

  }

}



function myfuncedit(imageID){               // function to edit data

  console.log("In Edit");

    // $.ajax({
    //     async: false,
    //     type: 'GET',
    //     url: "http://localhost:50434/api/Skills/" + imageID,
    //     dataType: "JSON",
    //     success: function(res){
        console.log(obj);
        console.log(obj[0].name);
        console.log(obj[imageID]);
        var input = document.createElement("input");
        input.setAttribute("type","text");
        input.setAttribute("name",obj[imageID].name);
        input.setAttribute("placeholder", res.Name);
        input.setAttribute("class", "text-center");
        var modal_body = document.getElementById("modal_body");
        modal_body.appendChild(input);


      // document.getElementById("code2").innerHTML =  res.id;
            // gid = res.id;
            // document.getElementById("name2").setAttribute("value", res.name);
            // document.getElementById("mail2").setAttribute("value", res.mail);
            // document.getElementById("designation").value = res.designation["id"];
//         }
// });
}

function myfuncdel(imageID){       // function to delete data
    console.log("In Delete");
    delid = imageID.slice(3,);

//     $.ajax({
//
//         type: 'DELETE',
//         url: "http://localhost:50434/api/employees/" + delid,
//         dataType: "JSON",
//         success: function(res){
//             document.location.reload();
//         }
// });
}


function updatemethod(){
    console.log("In update");

    // $.ajax({
    //     type: 'PUT',
    //     url: "http://localhost:50434/api/employees/"+ gid,
    //     dataType: "JSON",
    //     data :myOBJ2,
    //     success: function(res){
    //         document.location.reload();
    //    }
    //
    // });
}
