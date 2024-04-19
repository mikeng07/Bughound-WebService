var employeeList = []
// Function to add an employee to the employeeList array
function addEmployeeToList(employee) {
    employeeList.push(employee);

    // Extract employee details and add to userList
    var loginId = employee.login_id;
    var employeeLevel = employee.level;

    // Default password for employees
    var password = "user";

    // Add the employee to the user list
    userList.push({ username: loginId, password: password, accessLevel: employeeLevel });

}

var backButton1 = document.getElementById("backButton1");
if (backButton1) {
    backButton1.addEventListener("click", function() {
        window.location.href = "../maintenancePage.html";
    });
}
var logoutButton1 =  document.getElementById("logoutButton1")
if(logoutButton1) {
  logoutButton1.addEventListener("click", function() {

    window.location.href = "../login.html"; // Redirect to login page
  });
}

// Function to log out user
// function logout() {
//   localStorage.removeItem("isLoggedIn"); // Remove isLoggedIn flag from local storage
//   localStorage.removeItem("accessLevel");
//   window.location.href = "Login.html"; // Redirect to login page
// }

// ADD EMPLOYEES
var newEmployeeButton = document.getElementById("newEmployeeButton");
var removeEmployeeButton = document.getElementById("removeEmployeeButton");
var clearEmployeeButton = document.getElementById("clearEmployeeButton");
var submitEmployeeButton = document.getElementById("submitEmployeeButton");

var employeeEntityCount = 0;

// Event listener for adding a new employee
if (newEmployeeButton) {
    newEmployeeButton.addEventListener("click", function() {
        // Generate unique IDs for the new employee entity
        var entityId = "employee_entity_" + employeeEntityCount;
        var nameId = "employee_name_" + employeeEntityCount;
        var loginId = "login_id_" + employeeEntityCount;
        var levelId = "employee_level_" + employeeEntityCount;

        // Construct the HTML for the new employee entity
        var temp =  '<div id="' + entityId + '" class="employee_entity">'+
                        '<input id="' + nameId + '" name="employee_name" size="10" placeholder="username"> '+
                        '<input id="' + loginId + '" name="login_id" size="7" placeholder="Login ID"> '+
                        '<input id="' + levelId + '" name="employee_level" size="4" placeholder="level">'+
                        '<br><br>'+
                    '</div>';

        // Append the new employee entity to the container
        document.getElementById("employee_list_values").insertAdjacentHTML('beforeend', temp);

        // Increment the counter
        employeeEntityCount++;

        // Show the remove employee button
        removeEmployeeButton.hidden = false;
    });
}

// Event listener for removing an employee
if (removeEmployeeButton) {
    removeEmployeeButton.addEventListener("click", function() {
        // Select the last employee entity
        var lastEmployeeEntity = document.querySelector(".employee_entity:last-child");
        
        // Remove the last employee entity if it exists
        if (lastEmployeeEntity) {
            lastEmployeeEntity.remove();
            
            // Decrement the counter
            employeeEntityCount--;

            // Hide the remove employee button if no more employees
            if (employeeEntityCount === 0) {
                removeEmployeeButton.hidden = true;
            }
        }
    });
}
if (clearEmployeeButton) {
    clearEmployeeButton.addEventListener("click", function() {
        // Clear all dynamically added employee entities
        var employeeEntities = document.querySelectorAll(".employee_entity");
        employeeEntities.forEach(function(entity) {
            entity.remove();
        });

        // Reset the counter
        employeeEntityCount = 0;

        // Hide the remove employee button
        removeEmployeeButton.hidden = true;
    });
}

//if (submitEmployeeButton) {
    // submitEmployeeButton.addEventListener("click", function(e) {
    //     e.preventDefault();
    //     $.ajax({
    //         type: "POST",
    //         url:  "db_connect.php",
    //         data: {
    //             f: "add_employees",
    //             q: "",
    //         },
    //         success: function(obj) {
    //             console.log(obj);
    //         },
    //         dataType: "json",
    //     });
    // });

// Event listener for submitting employees
if (submitEmployeeButton) {
    submitEmployeeButton.addEventListener("click", function() {
        // Select all employee entities
        var employeeEntities = document.querySelectorAll(".employee_entity");

        // Iterate over each employee entity
        employeeEntities.forEach(function(entity) {
            // Retrieve data for each employee
            var employeeName = entity.querySelector("input[name='employee_name']").value;
            var loginId = entity.querySelector("input[name='login_id']").value;
            var employeeLevel = parseInt(entity.querySelector("input[name='employee_level']").value);

            // Create an object for the employee and add it to the employeeList array
            addEmployeeToList({ user: employeeName, login_id: loginId, level: employeeLevel });
        });

        // Display the updated employeeList (optional)
        console.log(employeeList);
        console.log(userList);

        localStorage.setItem('userList', JSON.stringify(userList));

        // Reset the form or perform any other necessary action
        // form.reset();
    });
}

// EDIT EMPLOYEE INFO (ACCESS LEVEL ONLY)

var clearAccessChangeButton = document.getElementById("clearAccessChangeButton");
var submitAccessChangeButton = document.getElementById("submitAccessChangeButton");

if (clearAccessChangeButton) {
    clearAccessChangeButton.addEventListener("click", function() {
        $('#employee_realname').val("");
        $('#level_change').val("");
        $('#employee_change_res').html("");
    });
}

if (submitAccessChangeButton) {
    submitAccessChangeButton.addEventListener("click", function() {
        let employee_name = $('#employee_realname').val();
        let new_access_level = $('#level_change').val();

        var res = "";
        let incompleteFlag = false;

        if (employee_name === '') {
            res = res + "<span>warning -- no employee specified. whose access level are you changing?<span><br>";
            incompleteFlag = true;
        }
        if (new_access_level === '') {
            res = res + "<span>warning -- no access level specified. what are you changing this to?<span><br>";
            incompleteFlag = true;
        }
        // TODO: match this to that user's accessLevel
        // if (new_access_level === access_level_of_the_user) {
        //     res = res + "<span>warning -- the user has this access level currently<span><br>";
        //     incompleteFlag = true;
        // }
        console.log(res);
        $('#employee_change_res').html(res);
        
        if (incompleteFlag) {
            console.log("not completely filled out."); 
            return;

        } else {
    
            // POST new change

            // put out the results, regardless of success or failure

            // result = "<span>"+ "" +"</span>";    // place results here
            // $('#employee_change_res').append(result);

        }
    });
}