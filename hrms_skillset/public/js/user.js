$(document).ready(function() {
    // skill is for user's skills
    // all_skill is for all skills
    // and skill database
    // store all skills in skills array
    $('.js-example-basic-multiple').select2();


    all_skills = ["HTML","b","HTML","b"];  ///////////////////////////////
    var Skills_option = document.getElementById("Skills_option");
    for (var i = 0; i < all_skills.length; i++) {
        var option = document.createElement("option");      // TABLE HEADER.
        option.innerHTML = all_skills[i];
        option.setAttribute("value","AY");
        Skills_option.appendChild(option);
    }



    skills = ["HTML","b","HTML","b"];  ///////////////////////////////
    var display_skills = document.getElementById("display_skills");
    for (var i = 0; i < skills.length; i++) {
        var skilldiv = document.createElement("div");      // TABLE HEADER.
        skilldiv.innerHTML = skills[i];
        skilldiv.setAttribute("class","skill");
        display_skills.appendChild(skilldiv);
    }

});
