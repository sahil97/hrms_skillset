$(document).ready(()=>{
  const submitbtn = $('#submitbtn');
  submitbtn.on('click',(e)=>{
    e.preventDefault();
    console.log("hello");
    var username = $('#email').val();
    var password = $('#password').val();
    // console.log(username,password);
    var data = {username:username,password:password};

    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "/api/users/login",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
      // "processData": false,
      "data": JSON.stringify(data),
      success: function(res,textStatus,request){
            var token = request.getResponseHeader('x-auth-token');
            localStorage.setItem("token",token);
            alert('login');
            console.log(res);

            if(res=="sa"){window.location.href='admin.html';}
            else if(res=="u"){window.location.href='user.html';}

        },
      statusCode: {
      400: function() {
        alert('Incorrect Password');
      },
      404: function() {
        alert('Incorrect Username');
      }
    }
  });

  })
});
