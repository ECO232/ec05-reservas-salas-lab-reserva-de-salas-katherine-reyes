const { z } = require('zod');

// Definir un esquema de validación para los datos de usuario
const userSchema = z.object({
    name: z.string().min(1).max(50),
    lastname: z.string().min(1).max(50),
    identification: z.string().min(1).max(20),
});

module.exports = {
    validateUsers: (data) => {
        return userSchema.safeParse(data);
    },
};
