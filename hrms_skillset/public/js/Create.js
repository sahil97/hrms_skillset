function submitbtn(){

  console.log("hello");
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  var re = /[a-z]+\.[a-z]+$/;
  var emailFormat = re.test($("#email").val()); // this returns result in boolean type
  console.log(emailFormat);
  if (!emailFormat) {
    alert("Email id is incorrect");
  }
  else if (!password) {
    alert("Please enter the password");
  }


  var myOBJ = {email, password};
  console.log(myOBJ);

  // $.ajax({
  //     type: 'POST',
  //     url: "http://localhost:50434/api/employees/",
  //     dataType: "JSON",
  //     data :myOBJ,
  //     success: function(res){
  //       console.log("Created");
  //    }
  // });
}
