console.log(localStorage.getItem('token'));
var token = localStorage.getItem('token');


function submitbtn(){

  console.log("hello");
  username = document.getElementById("email").value;
  password = document.getElementById("password").value;

  // var re = /[a-z]+\.[a-z]+$/;
  // var emailFormat = re.test($("#email").val()); // this returns result in boolean type
  // console.log(emailFormat);
  // if (!emailFormat) {
  //   alert("Email id is incorrect");
  // }
  if (!username) {
    alert("Please enter the Email");
  }
  else if (!password) {
    alert("Please enter the password");
  }
  http://localhost:3333/api/users/register
  myOBJ = {username, password};
  $.ajax({
    "async": true,
    "crossDomain": true,
    "url": "/api/users/register",
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
