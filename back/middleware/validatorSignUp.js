const { check, validationResult } = require("express-validator");
const { Usuario } = require("../models");
const { Organizacion } = require("../models");

const mailFoudVolunteer = async (req, res, next) => {
  const userFound = await Usuario.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (userFound)
    return res
      .status(400)
      .json({ emailFound: "Your email is already registered" });
  next();
};

const mailFoudOrg = async (req, res, next) => {
  const userFound = await Organizacion.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (userFound)
    return res
      .status(400)
      .json({ emailFound: "Your email is already registered" });
  next();
};

const signUpVolunteer = [
  check("fullName")
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("El nombre completo debe tener al menos 2 caracteres"),

  check("email")
    .notEmpty()
    .matches(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/)
    .withMessage("Eso no parece un correo válido."),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")

    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).{8,}$/ )
    .withMessage(
      "La contraeña tener al menos 8 caracteres, incluyendo al menos un carácter en minúscula, un carácter en mayúscula, un dígito y cualquier carácter especial o símbolo (excluyendo espacios)"
    ),
  check("phone")
    .optional()
    .matches(/^(?:\d{7,14}|\d{2}[ -]?\d{4}[ -]?\d{4})$/)
    .withMessage("El número de teléfono no es válido para Argentina"),

  //   check("confirmpassword")
  //     .notEmpty()
  //     .withMessage("Debes confirmar la contraseña")
  //     .custom((value, { req }) => {
  //       if (value !== req.body.password) {
  //         throw new Error("Las contraseñas no coinciden");
  //       }
  //       return true;
  //     }),

  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      const validationErrors = error.array().map((err) => ({
        param: err.param,
        location: err.location,
        msg: err.msg,
      }));
      res.status(403).json({ errors: validationErrors });
    }
  },
];

const signUpCoordinator = [
  check("name")
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres"),

  check("description")
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("La descripción debe tener al menos 2 caracteres"),

  check("email")
    .notEmpty()
    .isEmail()
    .withMessage("El correo electrónico no es válido"),

  check("phone")
    .notEmpty()
    .matches(/^(?:\d{7,14}|\d{2}[ -]?\d{4}[ -]?\d{4})$/)
    .withMessage("El número de teléfono no es válido para Argentina"),

  check("cuit")
    .notEmpty()
    .matches(/^(?:[0-9]{11}|[0-9]{2}-[0-9]{8}-[0-9])$/)
    .withMessage(
      "El CUIT no es válido. Debe tener el formato XX-XXXXXXXX-X o XXXXXXXXXXX."
    ),

  check("location")
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("La ubicación debe tener al menos 2 caracteres"),

  check("password")
    .notEmpty()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).{8,}$/)
    .withMessage(
      "La contraeña tener al menos 8 caracteres, incluyendo al menos un carácter en minúscula, un carácter en mayúscula, un dígito y cualquier carácter especial o símbolo (excluyendo espacios)"
    ),
  check("category")
    .notEmpty()
    .isIn([
      "Medioambiente y fauna",
      "Asistencia social",
      "Salud y discapacidad",
    ])
    .withMessage("La categoría no es válida"),

  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      const validationErrors = error.array().map((err) => ({
        param: err.param,
        location: err.location,
        msg: err.msg,
      }));
      res.status(403).json({ errors: validationErrors });
    }
  },
];

module.exports = {
  mailFoudVolunteer,
  mailFoudOrg,
  signUpVolunteer,
  signUpCoordinator,
};
