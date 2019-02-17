
var obj;
$(document).ready(function(){

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

});

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
        myImage1.setAttribute("onclick","myfuncedit(this.i)");
        myImage2.setAttribute("id", "del" + jsonObj[i]._id)
        myImage2.setAttribute("onclick","myfuncdel(this.i)");

        tabCell.appendChild(myImage1);
        tabCell.appendChild(myImage2);
        tr.appendChild(tabCell);
        table.appendChild(tr);
    }
    var pop = document.getElementById("pop");
    pop.appendChild(table);

}




function myfuncdel(imageID){       // function to delete data
    console.log("In Delete");
    delid = imageID.slice(3,);
}


function myfuncedit(imageID){               // function to edit data

    console.log("In Edit");
    console.log("THIS  IS OBJE",imageID);
    console.log(obj[imageID].name);
    // console.log(obj[0][imageID]["name"]);
    var input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("name","name");
    input.setAttribute("placeholder", obj[0].name);
    input.setAttribute("class", "text-center");
    var modal_body = document.getElementById("modal_body");
    modal_body.appendChild(input);



}

function updatemethod(){
    console.log("In update");

}
