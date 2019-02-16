$(document).ready(function() {
    $('.js-example-basic-multiple').select2();

    all_skills = ["HTML","b","Bootstrap"];
    var Skills_option = document.getElementById("Skills_option");
    for (var i = 0; i < all_skills.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = all_skills[i];
        option.setAttribute("value",all_skills[i]);
        Skills_option.appendChild(option);
    }
    $("#pop").hide();
    $("#recommend").click(function(){
        $("#pop").show();
        
      console.log("here");
        // Values selected in select2
       var myOBJ=[];
        myOBJ= $(".js-example-basic-multiple").val();
        console.log(myOBJ);
        
        /*Post the tech stack to get the recommendations of users*/
        
       $.ajax({
           type: 'POST',
           url: "http://localhost:50434/api/users/",
           dataType: "JSON",
           data :myOBJ,
           success: function(res){
               var body = document.getElementById('pop');
               var jsonObj = [{"Name": "SB", "Id": "016"}];
               showtable(jsonObj);  /*showtable(res)*/
           }
        });
        
        /*to show dynamic table of users with required skills*/
        
        function showtable(jsonObj) {
            var col = [];
            for (var i = 0; i < jsonObj.length; i++) {
                for (var key in jsonObj[i]) {
                    if (col.indexOf(key) === -1 ) {
                        col.push(key);
                    }
                }
            }
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
                tr.appendChild(tabCell);
                table.appendChild(tr);
            }
            var pop = document.getElementById("pop");
            pop.appendChild(table);
        }
    });
    });