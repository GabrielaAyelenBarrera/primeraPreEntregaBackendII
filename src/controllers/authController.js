import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

// Controlador para el registro de usuario
export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, cart } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El correo ya está registrado." });
    }

    // Encriptar la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
      cart,
    });

    await newUser.save();
    res.status(201).send("Usuario registrado");
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ error: "Error al registrar el usuario." });
  }
};

// Controlador para el login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("usuario", user);
    // Verificar el usuario
    console.log(`Usuario encontrado: ${user ? user.email : "No encontrado"}`);
    console.log(`Contraseña proporcionada: ${password}`);
    console.log(
      `Contraseña hasheada: ${user ? user.password : "No hay usuario"}`
    );
    console.log(user);
    // Validación de usuario y contraseña
    if (!user) {
      return res.status(401).send("Credenciales incorrectas");
    }
    //Hacer el proceso de hashear data tambien y luego comp
    const isValidPassword = (user, password) =>
      bcrypt.compareSync(password, user.password);
    // const isPasswordValid = bcrypt.compareSync(password, user.password);
    console.log(`¿La contraseña coincide? ${isValidPassword}`);

    if (!isValidPassword) {
      return res.status(401).send("Credenciales incorrectas");
    }

    // Generación del token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });console.log(token) // Usar una duración para el token
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .send("Login exitoso");
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ error: "Error en el inicio de sesión." });
  }
};

// Controlador para el usuario actual
export const current = (req, res) => {
  // Verificar si req.user está presente (lo cual indica que el usuario está autenticado)
  if (!req.user) {
    return res.status(401).json({ error: "Usuario no autenticado." });
  }

  // Enviar los datos relevantes del usuario
  const { _id, first_name, last_name, email, age } = req.user;
  res.json({
    id: _id,
    firstName: first_name,
    lastName: last_name,
    email,
    age,
    message: "Información del usuario actual",
  });
};
