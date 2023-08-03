import { stripHtml } from "string-strip-html";
import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function postEncurtador(req, res) {

    const { url } = req.body;

    const { sessao } = res.locals;

    const sanitizedUrl = stripHtml(url).result.trim();

    const shortIdLength = 6;
    const shortUrl = nanoid(shortIdLength)

    try {

        const result = await db.query('INSERT INTO url ("short_url", "full_url" , "visitCount", "user_id") VALUES ($1, $2, $3, $4) RETURNING id', [shortUrl, sanitizedUrl, 0, sessao.rows[0].idUser]);

        res.status(201).send({ id: result.rows[0].id, shortUrl: shortUrl });

    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function urlPorID(req, res) {

    const { id } = req.params;

    try {

        const getUrl = await db.query('SELECT * FROM url WHERE id = $1;', [id]);

        if (getUrl.rows.length === 0) return res.status(404).send({ message: "Url não encontrada pelo id", id });

        return res.status(200).send(getUrl.rows[0]);

    } catch (err) {

        return res.status(500).send(err.message);

    }
}

export async function getPorShortUrl(req, res) {

    const { shortUrl } = req.params;

    try {

        const getUrl = await db.query('SELECT * FROM url WHERE "short_url" = $1;', [shortUrl]);

        console.log(getUrl.rows)

        if (getUrl.rows.length === 0) return res.status(404).send("Url não encontrada pelo short_url");

        console.log(getUrl.rows.length === 0)

        const { full_url, visitCount } = getUrl.rows[0];

        const updatedVisits = visitCount + 1;

        await db.query('UPDATE url SET "visitCount" = $1 WHERE short_url = $2;', [updatedVisits, shortUrl]);

        // Redireciona o usuário para a URL completa
        return res.redirect(full_url);

    } catch (err) {

        return res.status(500).send(err.message);

    }
}

export async function deletaUrlPorId(req, res) {

    const { id } = req.params;

    const { sessao } = res.locals;

    try {

        const result = await db.query('SELECT * FROM url WHERE id = $1;', [id]);

        if (result.rowCount === 0) return res.status(404).send("Essa URL não consta no sistema!");

        if (result.rows[0].user_id != sessao.rows[0].idUser) {

            res.status(401).send("A url encurtada não pertencer ao usuário.");

        } else {

            await db.query('DELETE FROM url WHERE id = $1;', [id]);

        }

        res.status(204).send("URL deletada com sucesso!");

    } catch (err) {
        res.status(500).send(err.message);
    }
}