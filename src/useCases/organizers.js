const Organizer = require("../models/organizer");
const bcrypt = require("../lib/bcrypt");
const jwt = require("../lib/jwt");

function getAllOrganizer() {
  return Organizer.find({});
}
function createOrganizer(dataOrganizer) {
  const { name, lastName, email, password, city, country, telephone } =
    dataOrganizer;
  return Organizer.create({
    name,
    lastName,
    email,
    password,
    city,
    country,
    telephone,
  });
}
function getById(idOrganizer) {
  return Organizer.findById(idOrganizer);
}
function patchById(idOrganizer, dataToUpdate) {
  return Organizer.findByIdAndUpdate(idOrganizer, dataToUpdate, { new: true });
}
function deleteById(idOrganizer) {
  return Organizer.findByIdAndDelete(idOrganizer);
}

async function signUp(dataOrganizer) {
  const { name, lastName, email, password, city, country, telephone } =
    dataOrganizer;
  const organizerFound = await Organizer.findOne({ email });

  if (organizerFound) throw new Error("Organizer already exists");
  const passwordEncrypted = await bcrypt.hash(password);

  return Organizer.create({
    name,
    lastName,
    email,
    password: passwordEncrypted,
    city,
    country,
    telephone,
  });
}

async function login(email, password) {
  const organizerFound = await Organizer.findOne({ email });
  if (!organizerFound) throw new Error("Invalid credentials");

  const isValidPassword = await bcrypt.compare(
    password,
    organizerFound.password
  );
  if (!isValidPassword) throw new Error("Invalid credentials");

  // regresar
  //return jwt.sign({ id: organizerFound._id });
  return {
    id: organizerFound._id,
    token: jwt.sign({ id: organizerFound._id }),
  };
}

module.exports = {
  getAllOrganizer,
  createOrganizer,
  getById,
  patchById,
  deleteById,
  signUp,
  login,
};
