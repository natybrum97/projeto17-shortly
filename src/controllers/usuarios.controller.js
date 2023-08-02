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

      const usuario = await db.query('SELECT * FROM cadastro WHERE email = $1;', [sanitizedEmail]);
      
        if (usuario.rows.length > 0) return res.status(409).send("Esse usuário já existe!");

        const hash = bcrypt.hashSync(sanitizedPassword, 10);

        await db.query('INSERT INTO cadastro (name, email, password) VALUES ($1, $2, $3)',[sanitizedName, sanitizedEmail, hash]);

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function postLogin (req, res) {

    const { email, password } = req.body;

    const sanitizedEmail = stripHtml(email).result.trim();
    const sanitizedPassword = stripHtml(password).result.trim();


    try {

      const usuario = await db.query('SELECT * FROM cadastro WHERE email = $1;', [sanitizedEmail]);
      
        if (usuario.rows.length === 0) return res.status(401).send("Usuário não cadastrado!");

       const senhaEstaCorreta = bcrypt.compareSync(sanitizedPassword, usuario.rows[0].password);
        if (!senhaEstaCorreta) return res.status(401).send("Senha incorreta!");

      const token = uuid();

      await db.query('INSERT INTO login (token, "idUser") VALUES ($1, $2)', [token, usuario.rows[0].id]);

      return res.status(200).send({token: token, nome: usuario.rows[0].name, id: usuario.rows[0].id});

    } catch (err) {
      res.status(500).send(err.message);
    }
}