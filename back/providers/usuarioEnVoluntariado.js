const { UsuarioEnVoluntariado, Voluntariado, Usuario } = require("../models");

// Proveedor de Datos para crear la relación usuario-voluntariado
const join = async (userId, organizationId, idVolunteering) => {
  try {
    const volunteeringFound = await Voluntariado.findByPk(idVolunteering);

    if (!volunteeringFound) {
      throw new Error("The volunteering does not exist.");
    }

    if (volunteeringFound.vacancies <= 0) {
      throw new Error("The volunteering is full.");
    }

    await UsuarioEnVoluntariado.create({
      userId,
      organizationId,
      idVolunteering,
    });

    await volunteeringFound.decrement("vacancies");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getJoins = async (userId) => {
  try {
    const joins = await UsuarioEnVoluntariado.findAll({
      where: { userId, deletedAt: null },
      include: [{ model: Voluntariado, as: "voluntariado" }],
      attributes: { exclude: ["deletedAt"] },
    });

    return joins;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const getCompletedPostulation = async (idOrg) => {
  try {
    const postulation = await UsuarioEnVoluntariado.findAll({
      where: { organizationId: idOrg, status: "finished", deletedAt: null },
      attributes: { exclude: ["deletedAt"] },
      include: [
        {
          model: Voluntariado,
          as: "voluntariado",
          //attributes: ["descripcion", "reward"],
        },
        {
          model: Usuario,
          as: "usuario",
          //attributes: ["fullname", "email"],
        },
      ],
    });

    return postulation;
  } catch (error) {
    console.error(
      "The volunteering/s could not be retrieved due to an error.",
      error
    );
    throw error;
  }
};

const accreditationReward = async (idPostulation, action) => {
  try {
    const postulationFinish = await UsuarioEnVoluntariado.findOne({
      where: { postulateId: idPostulation },
      include: [{ model: Voluntariado, as: "voluntariado" }],
    });

    const user = await Usuario.findOne({
      where: { id: postulationFinish.dataValues.userId },
    });

    if (postulationFinish.dataValues.isProcessed) {
      throw new Error("The reward has already been processed.");
    }

    if (action === "acreditar") {
      //Validar que la recompensa no haya sido acreditada

      // Sumar la recompensa de la postulación a la recompensa del usuario
      user.hoursAcc += postulationFinish.voluntariado.reward;

      // Marcar la postulacion como acreditada:
      postulationFinish.isProcessed = true;

      // Mandar un mensaje de confirmacion a traves de la columna observations:
      postulationFinish.observations = "Recompensa acreditada exitosamente.";

      //Guardar la observacion de la postulacion:
    } else if (action === "rechazar") {
      // Marcar la postulacion como no acreditada:
      postulationFinish.isProcessed = true;

      // Mandar un mensaje de cancelacion a traves de la columna observations:
      postulationFinish.observations =
        "Se detectaron incumplimientos en las condiciones del voluntariado.La recompensa no ha sido acreditada";
    }

    // Guardar el usuario actualizado
    await user.save();
    await postulationFinish.save();
    // }
  } catch (error) {
    console.error(error);
  }
};

const updateStatusById = async (idPostulation, status) => {
  try {
    const postulationUpdate = await UsuarioEnVoluntariado.update(
      { status },
      {
        where: { postulateId: idPostulation },
      }
    );
    if (!postulationUpdate) return;
    return postulationUpdate;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteJoinById = async (postulateId) => {
  try {
    const postulate = await UsuarioEnVoluntariado.findByPk(postulateId);

    if (!postulate) {
      throw new Error("The postulate does not exist.");
    }

    if (postulate.status !== "finished" && postulate.status !== "abandoned") {
      throw new Error(
        'Only postulates with status "finished" or "abandoned" can be deleted.'
      );
    }

    await postulate.update(
      { deletedAt: new Date() },
      { where: { postulateId } }
    );
    // ESTO da error en el front
    // await postulate.increment("vacancies");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  join,
  getJoins,
  getCompletedPostulation,
  accreditationReward,
  updateStatusById,
  deleteJoinById,
};
