const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const { validateUsers } = require('./schemas/users');
const { validateRooms } = require('./schemas/rooms');
const { validateReserve } = require('./schemas/reserve');

let users = [];
let rooms = [];
let reserve = [];

// Route to create a new user
app.post('/users', (req, res) => {
    const { name, lastname, identification } = req.body;

    // Validate user data
    const userValidation = validateUsers({ name, lastname, identification });

    if (userValidation.error) {
        return res.status(400).json({
            message: userValidation.error.message
        });
    }

    const newuser = {
        name: req.body.name,
        lastname: req.body.lastname,
        identification: req.body.identification,
    };

    users.push(newuser);
    res.status(201).json({
        message: 'User created successfully',
        user: newuser
    });
});

// Route to get the list of users
app.get('/users', (req, res) => {
    res.json({ users });
});

// Route to create a new room
app.post('/rooms', (req, res) => {
    const { name, location } = req.body;

    // Validate room data
    const roomValidation = validateRooms({ name, location });

    if (roomValidation.error) {
        return res.status(400).json({
            message: roomValidation.error.message
        });
    }

    const newRoom = {
        name: roomValidation.data.name,
        location: roomValidation.data.location,
    };

    rooms.push(newRoom);
    res.status(201).json({
        message: 'Room created successfully',
        room: newRoom
    });
});

// Route to get the list of rooms
app.get('/rooms', (req, res) => {
    res.json({ rooms });
});

// Route to make a reservation
app.post('/reserve', (req, res) => {
    const { roomId, startHour, userName, userLastName, userIdentification } = req.body;

    // Validate reservation data
    const reserveValidation = validateReserve({
        roomId, startHour, userName, userLastName, userIdentification
    });

    if (reserveValidation.error) {
        return res.status(400).json({
            message: reserveValidation.error.message
        });
    }

    // Check if the room is available at the specified time
    const room = rooms.find((r) => r.id === roomId);

    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }

    const hourIndex = startHour - 7;

    if (hourIndex < 0 || hourIndex >= room.schedule.length) {
        return res.status(400).json({ message: 'Invalid time' });
    }

    if (!room.schedule[hourIndex]) {
        return res.status(400).json({ message: 'The room is not available at that time' });
    }

    // Make the reservation
    room.schedule[hourIndex] = false; // Mark the hour as unavailable

    const reservation = {
        roomId,
        roomName: room.name,
        location: room.location,
        startHour,
        endHour: startHour + 1, // 1-hour reservation
        userName,
        userLastName,
        userIdentification,
    };

    reserve.push(reservation);

    res.status(201).json({
        message: 'Reservation made successfully',
        reservation
    });
});

// Start the Server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
