document.addEventListener("DOMContentLoaded", () => {
    // Executes when the HTML document is completely loaded

    // Select relevant forms and elements
    const userForm = document.getElementById("user-form");
    const roomForm = document.getElementById("room-form");
    const reservationForm = document.getElementById("reservation-form");

    // Handle form submission to create a new user
    userForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent the form from being submitted by default

        // Get values from the form
        const name = document.getElementById("name").value;
        const lastname = document.getElementById("lastname").value;
        const identification = document.getElementById("identification").value;

        // Send a POST request to the server to create a new user
        fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, lastname, identification }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Process the server's response
                alert(data.message);
                // You can perform more actions here, like updating the list of users in the interface
            })
            .catch((error) => {
                console.error("Error creating the user:", error);
            });
    });

    // Handle form submission to create a new room
    roomForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get values from the form
        const roomName = document.getElementById("room-name").value;
        const roomLocation = document.getElementById("room-location").value;

        // Send a POST request to the server to create a new room
        fetch("/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: roomName, location: roomLocation }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Process the server's response
                alert(data.message);
                // You can perform more actions here, like updating the list of rooms in the interface
            })
            .catch((error) => {
                console.error("Error creating the room:", error);
            });
    });

    // Handle form submission to make a reservation
    reservationForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get values from the form
        const userName = document.getElementById("user-name").value;
        const userLastName = document.getElementById("user-lastname").value;
        const userIdentification = document.getElementById("user-identification").value;
        const roomId = document.getElementById("room-select").value;
        const reservationHour = parseInt(document.getElementById("reservation-hour").value);

        // Send a POST request to the server to make a reservation
        fetch("/reserve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                roomId,
                startHour: reservationHour,
                userName,
                userLastName,
                userIdentification,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Process the server's response
                alert(data.message);
                // You can perform more actions here, like updating the interface to show the reservation made
            })
            .catch((error) => {
                console.error("Error making the reservation:", error);
            });
    });
});
