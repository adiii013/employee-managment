window.onload = loadTasks;

let guid = () => {
  let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function loadTasks() {
  document.querySelector('#customers').innerHTML = '';
  let employees = localStorage.getItem("employees");
  if (employees != null) {
    let data = JSON.parse(localStorage.getItem("employees"));
    let html = ""
    data.forEach((employee, index) => {
      var count = index+1;
      var buttonData = `<button class='delete_btn' onclick=removeEmployee("${employee.id}")>X</button>`
      html+="<tr><td>"+count+"</td><td>"+employee.name+"</td><td>"+employee.phone+"</td><td>"+buttonData+"</td></tr>";
    });
    document.querySelector('#customers').innerHTML = html;
  }
  else{
    localStorage.setItem('employees',JSON.stringify([]));
  }
}

 function addTask() {
  var first = document.getElementById("first_name").value;
  var last = document.getElementById("last_name").value;
  var name = first + " " + last;
  var phone = document.getElementById("phone_no").value;

  if (name === "" || phone === "") {
    alert("All fields are required");
  } else {
    let employees = JSON.parse(localStorage.getItem("employees"));
    let count = 0;
    var flag = true;
    employees.forEach((employee) => {
      if (employee.name === name && employee.phone === phone) {
        alert("Name already exist!");
        flag = false;
        return;
      }
      count++;
    });
    if(flag){
      const id = guid();
      const data = {
        name: name,
        phone: phone,
        id:guid()
      };
      employees.push(data);
      localStorage.setItem("employees", JSON.stringify(employees));
      loadTasks();
      document.getElementById("first_name").value = "";
      document.getElementById("last_name").value = ""
      document.getElementById("phone_no").value = "";
    }
  }
};

function searchEmployee(){
  var pattern = document.querySelector('.search_bar').value;
  if(pattern===""){
    loadTasks()
  }
  else{
    document.querySelector('#customers').innerHTML = '';
    let data = JSON.parse(localStorage.getItem("employees"));
    data = data.filter((employee)=>{
      var name = employee.name.toLowerCase();
      pattern = pattern.toLowerCase();
      return name.includes(pattern);
    })
    let html = ""
    data.forEach((employee, index) => {
      console.log(employee.id);
      var buttonData = `<button class='delete_btn' onclick=removeEmployee("${employee.id}")>X</button>`
      html+="<tr><td>"+index+1+"</td><td>"+employee.name+"</td><td>"+employee.phone+"</td><td>"+buttonData+"</td></tr>";
    });
    document.querySelector('#customers').innerHTML = html;
}
}

function removeEmployee(id) {
  var flag = confirm("Are you sure you want to remove ? ");
  if(flag){
    let employees = JSON.parse(localStorage.getItem("employees"));
    employees = employees.filter((employee) => employee.id!== id);
    localStorage.setItem("employees", JSON.stringify(employees));
    loadTasks();
  }
}