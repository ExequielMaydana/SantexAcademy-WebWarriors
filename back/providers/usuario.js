const { Usuario, Testimonios } = require("../models");
const { comparePassword, hashPassword } = require("../config/crypt");

const createTestimonialById = async (id, testimonial) => {
  try {
    // Crear el testimonio asociado al usuario identificado por 'id'
    console.log("Creando testimonio con los siguientes datos:");
    console.log("Usuario ID:", id);
    console.log("Testimonio:", testimonial);

    const testimonialCreated = await Testimonios.create({
      ...testimonial,
      userId: id, // Asociar el testimonio al usuario
    });

    console.log("Testimonio creado exitosamente:", testimonialCreated);

    return testimonialCreated;
  } catch (error) {
    console.error("Error al crear el testimonio:", error);
    throw error;
  }
};

const getAllTestimonials = async () => {
  try {
    const testimonials = await Testimonios.findAll({
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["fullName", "image"],
        },
      ],
    });

    return testimonials;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await Usuario.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const matchPassword = comparePassword(password, user.password);

    if (!matchPassword) {
      throw new Error("Invalid Credentials");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const createUser = async (usuario) => {
  const { image, password, rolesId, ...restOfData } = usuario;

  try {
    let rolUser = 0;
    if (!rolesId) {
      rolUser = 1;
    }
    const newUser = await Usuario.create({
      image,
      password: hashPassword(password),
      rolesId: rolUser,
      ...restOfData,
    });
    return {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
    };
  } catch (err) {
    console.log(err);
    return;
  }
};

const getUsersByCriteria = async (queryOptions, bodyOptions) => {
  try {
    const options = { ...queryOptions, ...bodyOptions }; // Combinar las opciones de búsqueda
    const where = {}; // Excluir registros eliminados lógicamente
    const validOptions = ["id", "fullName", "telefono", "email"];

    validOptions.forEach((option) => {
      if (options[option]) where[option] = options[option];
    });
    where.deletedAt = null;

    const users = await Usuario.findAll({
      where,
      attributes: { exclude: ["deletedAt"] },
    });

    return users;
  } catch (error) {
    console.error(
      "The organization/s could not be retrieved due to an error.",
      error
    );
    throw error;
  }
};

const getMyProfile = async (id) => {
  try {
    const userProfile = await Usuario.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
      exclude: ["password"],
      attributes: { exclude: ["deletedAt"] },
    });

    if (!userProfile) {
      throw new Error("The user does not exist");
    }
    return userProfile;
  } catch (error) {
    throw new Error(error);
  }
};

const updateMyUser = async (usuario, id) => {
  try {
    const updatedUser = await Usuario.update(usuario, { where: { id: id } });
    return updatedUser;
  } catch (error) {
    console.error("The user could not be updated due to an error.", error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await Usuario.destroy({
      where: {
        id,
      },
    });
    return deletedUser;
  } catch (error) {
    console.error("Ocurrió un error al eliminar el usuario.", error);
    throw error;
  }
};

const updatePhotoMyProfile = async (image, id) => {
  try {
    const updatedUser = await Usuario.update(
      { image: image },
      { where: { id: id }, returning: true }
    );

    if (!updatedUser) return;

    return updatedUser;
  } catch (error) {
    return console.log("Error updating your profile picture", error);
  }
};

module.exports = {
  createTestimonialById,
  getAllTestimonials,
  loginUser,
  createUser,
  getUsersByCriteria,
  getMyProfile,
  updateMyUser,
  deleteUser,
  updatePhotoMyProfile,
};
