const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    const firstName = document.getElementById("FirstName");
    const firstNameError = document.getElementById("FirstNameError");

    const lastName = document.getElementById("LastName");
    const lastNameError = document.getElementById("LastNameError");

    const emailAddress = document.getElementById("EmailAddress");
    const emailAddressError = document.getElementById("EmailAddressError");

    const query = document.querySelector('input[name="query"]:checked');
    const queryError = document.getElementById("QueryTypeError");

    const messageArea = document.getElementById("MessageArea");
    const messageAreaError = document.getElementById("MessageAreaError");

    const accept = document.getElementById("Accept");
    const acceptError = document.getElementById("AcceptError");

    if (firstName.value == "") {
        firstName.classList.add("errorInput");
        firstNameError.textContent = "This field is required";
        isValid = false;
    } else {
        firstName.classList.remove("errorInput");
        firstNameError.textContent = "";
    }

    if (lastName.value == "") {
        lastName.classList.add("errorInput");
        lastNameError.textContent = "This field is required";
        isValid = false;
    } else {
        lastName.classList.remove("errorInput");
        lastNameError.textContent = "";
    }

    if (!emailAddress.value.includes("@")) {
        emailAddress.classList.add("errorInput");
        emailAddressError.textContent = "Please enter a valid email address";
        isValid = false;
    } else if (emailAddress.value == "") {
        emailAddress.classList.add("errorInput");
        emailAddressError.textContent = "Please enter a valid email address";
        isValid = false;
    } else {
        emailAddress.classList.remove("errorInput");
        emailAddressError.textContent = "";
    }

    if (!query) {
        queryError.textContent = "Please select a query type";
        isValid = false;
    } else {
        queryError.textContent = "";
    }

    if (messageArea.value == "") {
        messageArea.classList.add("errorInput");
        messageAreaError.textContent = "This field is required";
        isValid = false;
    } else {
        messageArea.classList.remove("errorInput");
        messageAreaError.textContent = "";
    }

    if (!accept.checked) {
        accept.classList.add("errorInput");
        acceptError.textContent =
            "To submit this form, please consent to being contacted";
        isValid = false;
    } else {
        accept.classList.remove("errorInput");
        acceptError.textContent = "";
    }

    const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: emailAddress.value,
        query: query.value,
        message: messageArea.value,
        accept: accept.checked,
    };

    const dialog = document.getElementById("successDialog");

    if (isValid) {
        dialog.show();

        setTimeout(() => {
            dialog.classList.toggle("fade-out");
        }, 2000);

        setTimeout(() => {
            dialog.close();
            dialog.classList.remove("fade-out");
        }, 4000);

        fetch("https://webhook.site/3c733f2f-3d29-4643-a3f0-eb87c8864da0", {
            method: "POST",
            body: JSON.stringify(data),
        })
            .then((response) => response.text())
            .then((result) => {
                console.log("Sukces:", result);
            })
            .catch((err) => {
                console.log("Błąd:", err);
            });
    }
});
