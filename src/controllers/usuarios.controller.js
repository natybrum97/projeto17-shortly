import { stripHtml } from "string-strip-html";
import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

export async function postCadastro (req, res) {

    const { name, email, password } = req.body;

    const sanitizedName = stripHtml(name).result.trim();
    const sanitizedEmail = stripHtml(email).result.trim();
    const sanitizedPassword = stripHtml(password).result.trim();


    try {
       // const usuario = await db.collection("usuariosCadastrados").findOne({ email: sanitizedEmail });
      //  if (usuario) return res.status(409).send("Esse usuário já existe!");

     //   const hash = bcrypt.hashSync(sanitizedPassword, 10);

      //  await db.collection("usuariosCadastrados").insertOne({ name: sanitizedName, email: sanitizedEmail, password: hash });

      //  res.sendStatus(201);

    } catch (err) {
       // res.status(500).send(err.message);
    }

}

export async function postLogin (req, res) {

    const { email, password } = req.body;

    const sanitizedEmail = stripHtml(email).result.trim();
    const sanitizedPassword = stripHtml(password).result.trim();


    try {

     //   const usuario = await db.collection("usuariosCadastrados").findOne({ email: sanitizedEmail });
      //  if (!usuario) return res.status(404).send("Usuário não cadastrado");

       // const senhaEstaCorreta = bcrypt.compareSync(sanitizedPassword, usuario.password);
     //   if (!senhaEstaCorreta) return res.status(401).send("Senha incorreta");

      //  const token = uuid();
      //  await db.collection("login").insertOne({ token, idUsuario: usuario._id });


      //  return res.status(200).send({token: token, nome: usuario.name, _id: usuario._id});

    } catch (err) {
      //  res.status(500).send(err.message);
    }
}