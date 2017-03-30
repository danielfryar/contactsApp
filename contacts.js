function validateForm() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("emailAddress").value;
    var phone = document.getElementById("phoneNumber").value;

    if (firstName === null || firstName === '' || firstName === "First Name") {
        alert("Please enter first name");
        return false;
    }
    if (lastName === null || lastName === '' || lastName === "Last Name") {
        alert("Please enter last name");
        return false;
    }
    if (email === null || email === '' || email === "Email Address") {
        alert("Please enter email address");
        return false;
    } else {
        var validEmail = /\S+@\S+\.\S+/;
        if (!validEmail.test(email)) {
            alert("Please enter a valid email address");
            return false;
        }
    }
    if (phone === null || phone === '' || phone === "Phone Number") {
        alert("Please enter phone number");
        return false;
    } else {
        var validPhone = /\d{3}-\d{3}-\d{4}/;
        var validPhone1 = /\d{3}\.\d{3}\.\d{4}/;
        if (!validPhone.test(phone) && !validPhone1.test(phone)) {
            alert("Please enter a valid phone number");
            return false;
        }
    }
    return true;
}

var contactsData = document.getElementById("contactsData");
if (contactsData !== null) {
    //for each contact stored in localStorage, add a new table row
    var table = document.getElementById("contactsTable");
    for (var i in localStorage) {
        var nextRow = table.insertRow();
        nextRow.setAttribute("id", i);
        var nextContact = JSON.parse(localStorage[i]);

        var nextFirstName = nextRow.insertCell(0);
        nextFirstName.innerHTML = nextContact.firstName;
        var nextLastName = nextRow.insertCell(1);
        nextLastName.innerHTML = nextContact.lastName;
        var nextEmail = nextRow.insertCell(2);
        nextEmail.innerHTML = nextContact.emailAddress;
        var nextPhone = nextRow.insertCell(3);
        nextPhone.innerHTML = nextContact.phoneNumber;

        var nextEdit = nextRow.insertCell(4);
        var editLink = document.createElement("a");
        editLink.setAttribute("href", "editContact.html?" + i);
        editLink.innerHTML = "edit";
        nextEdit.appendChild(editLink);

        var nextDelete = nextRow.insertCell(5);
        var deleteLink = document.createElement("a");
        deleteLink.setAttribute("href", "deleteContact.html?" + i);
        deleteLink.innerHTML = "delete";
        nextDelete.appendChild(deleteLink);
    }
    document.getElementById("searchButton").addEventListener("click", function() {
        var searchString = document.getElementById("search").value;
        if (searchString !== null) {
            for (var p in localStorage) {
                var searchContact = JSON.parse(localStorage[p]);
                for (var q in searchContact) {
                    if (searchContact.hasOwnProperty(q))
                        if (searchString === searchContact[q]) {
                            document.getElementById(p).setAttribute("class", "warning");
                            // var searchLink = "editContact.html?"+p;
                            // window.location.href = searchLink;
                        }
                }
            }
        }
    });
} //contactsHome

function addContact(nameFirst, nameLast, emailkey, contactPhone) {
    var newContact = {
        firstName: nameFirst,
        lastName: nameLast,
        emailAddress: emailkey,
        phoneNumber: contactPhone
    };
    var newContactString = JSON.stringify(newContact);
    localStorage.setItem(emailkey, newContactString);
}

function editContact(key, nameFirst, nameLast, emailkey, contactPhone) {
    var editContact = {
        firstName: nameFirst,
        lastName: nameLast,
        emailAddress: emailkey,
        phoneNumber: contactPhone
    };
    var newContactString = JSON.stringify(editContact);
    localStorage.setItem(key, newContactString);
}

var addButton = document.getElementById("addButton");
if (addButton !== null) {
    addButton.addEventListener("click", function(e) {
        e.preventDefault();
        if (validateForm()) {
            var firstName = document.getElementById("firstName").value;
            var lastName = document.getElementById("lastName").value;
            var emailAddress = document.getElementById("emailAddress").value;
            var phoneNumber = document.getElementById("phoneNumber").value;
            addContact(firstName, lastName, emailAddress, phoneNumber);
            window.location.href = "contactsHome.html";
        }
    });
}

var editButton = document.getElementById("editButton");
if (editButton !== null) {
    var key = window.location.search.substring(1);
    var contactInfo = JSON.parse(localStorage.getItem(key));
    document.getElementById("firstName").value = contactInfo.firstName;
    document.getElementById("lastName").value = contactInfo.lastName;
    document.getElementById("emailAddress").value = contactInfo.emailAddress;
    document.getElementById("phoneNumber").value = contactInfo.phoneNumber;
    editButton.addEventListener("click", function(e) {
        e.preventDefault();
        if (validateForm()) {
            firstName = document.getElementById("firstName").value;
            lastName = document.getElementById("lastName").value;
            emailAddress = document.getElementById("emailAddress").value;
            phoneNumber = document.getElementById("phoneNumber").value;
            editContact(key, firstName, lastName, emailAddress, phoneNumber);
            window.location.href = "contactsHome.html";
        }
    });
}

var deleteButton = document.getElementById("deleteButton");
if (deleteButton !== null) {
    var id = window.location.search.substring(1);
    var contact = JSON.parse(localStorage.getItem(id));
    document.getElementById("firstName").innerHTML = contact.firstName;
    document.getElementById("lastName").innerHTML = contact.lastName;
    document.getElementById("emailAddress").innerHTML = contact.emailAddress;
    document.getElementById("phoneNumber").innerHTML = contact.phoneNumber;
    deleteButton.addEventListener("click", function(e) {
        e.preventDefault();
        localStorage.removeItem(key);
        window.location.href = "contactsHome.html";
    });
}
