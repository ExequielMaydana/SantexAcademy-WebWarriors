const { body } = require("express-validator");

const createAndUpdateUserValidation = [
  body("fullName")
    .isLength({ min: 2 })
    .withMessage("El nombre completo debe tener al menos 2 caracteres"),
  body("phone")
    .optional()
    .matches(/^(?:\d{7,14}|\d{2}[ -]?\d{4}[ -]?\d{4})$/)
    .withMessage("El número de teléfono no es válido para Argentina"),

  body("email").isEmail().withMessage("El correo electrónico no es válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres.")
    .bail() // Este método detiene la cadena de validación si alguna de las validaciones anteriores ha fallado
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).{8,}$/ )
    .withMessage(
      "La contraeña tener al menos 8 caracteres, incluyendo al menos un carácter en minúscula, un carácter en mayúscula, un dígito y cualquier carácter especial o símbolo (excluyendo espacios)"
    ),
];

const loginUserValidation = [
  body("email").isEmail().withMessage("El correo electrónico no es válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres.")
    .bail() // Este método detiene la cadena de validación si alguna de las validaciones anteriores ha fallado
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    .withMessage(
      "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un símbolo."
    ),
];

module.exports = {
  createAndUpdateUserValidation,
  loginUserValidation,
};
