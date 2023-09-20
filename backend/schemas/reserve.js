const { z } = require('zod');

// Define a validation scheme for the reservation data
const reserveSchema = z.object({
    roomId: z.string().min(1).max(50), // Identificación de la sala, entre 1 y 50 caracteres
    startHour: z.number().int().min(7).max(18), // Hora de inicio de la reserva, entre 7 y 18
    userName: z.string().min(1).max(50), // Nombre del usuario, entre 1 y 50 caracteres
    userLastName: z.string().min(1).max(50), // Apellido del usuario, entre 1 y 50 caracteres
    userIdentification: z.string().min(1).max(20), // Identificación del usuario, entre 1 y 20 caracteres
});

module.exports = {
    validateReserve: (data) => {
        // Validate the reservation data 
        return reserveSchema.safeParse(data);
    },
};
