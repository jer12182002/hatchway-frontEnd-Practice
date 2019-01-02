const url = "https://www.hatchways.io/api/assessment/students";
fetch(url)
  .then(res => res.json())
  .then(function(data) {
    let students = data.students;

    return students.map(function(student) {
      var li = document.createElement("li");
      var img = document.createElement("img");
      var name = document.createElement("h1");
      var email = document.createElement("p");
      var company = document.createElement("p");
      var skill = document.createElement("p");
      var avg = document.createElement("p");

      //======================create tages for collpase=====================
      var collbtn = document.createElement("button");
      var coll = document.createElement("div");
      var collText = document.createElement("p");
      collbtn.className = "collapsible";
      coll.className = "content";
      var temp = "";
      for (var i = 0; i < student.grades.length; i++) {
        temp += "test" + (i + 1) + ":       " + student.grades[i] + "<br>";
      }
      collText.innerHTML = temp;

      img.setAttribute("src", student.pic);
      name.innerHTML = student.lastName + " " + student.firstName;
      email.innerHTML = "Email: " + student.email;
      company.innerHTML = "Company: " + student.company;
      skill.innerHTML = "Skill:  " + student.skill;
      var total = 0;
      student.grades.forEach(element => {
        total += parseInt(element);
      });
      total = total / student.grades.length;
      avg.innerHTML = "Average: " + total + "%";
      coll.appendChild(collText);
      collbtn.appendChild(coll);
      li.appendChild(img);
      li.appendChild(collbtn);
      li.appendChild(name);
      li.appendChild(email);
      li.appendChild(company);
      li.appendChild(skill);
      li.appendChild(avg);

      document.getElementById("students").appendChild(li);
      dropdown();
    });
  })
  .catch(error => {
    console.log(JSON.stringify(error));
  });

//===============================filter function ===================================
function filterFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("students");
  li = ul.getElementsByTagName("li");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("h1")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

//===============================dropdown function ===================================
function dropdown() {
  var coll = document.getElementsByClassName("collapsible");
  var i;
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}
