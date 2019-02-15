function submitbtn(){
  console.log("hello");
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  var myOBJ = {email, password};
  console.log(myOBJ);

  $.ajax({
      type: 'POST',
      url: "http://localhost:50434/api/employees/",
      dataType: "JSON",
      data :myOBJ,
      success: function(res){
        console.log("Created");
     }
  });
}
