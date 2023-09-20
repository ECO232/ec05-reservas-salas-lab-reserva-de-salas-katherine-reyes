const { z } = require('zod');

// Definir un esquema de validación para los datos de la sala
const roomSchema = z.object({
    name: z.string().min(1).max(50), // Nombre de la sala, entre 1 y 50 caracteres
    location: z.string().min(1).max(50), // Ubicación de la sala, entre 1 y 50 caracteres
});

module.exports = {
    validateRooms: (data) => {
        // Validar los datos de la sala utilizando el esquema definido
        return roomSchema.safeParse(data);
    },
};
