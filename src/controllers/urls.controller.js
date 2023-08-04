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

        const remodelagem = getUrl.rows[0];

        const responseBody = {
          "id": remodelagem.id,
          "shortUrl": remodelagem.short_url,
          "url": remodelagem.full_url
        }

        return res.status(200).send(responseBody);

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

export async function selecionaTudoDoUser(req, res) {
    const { sessao } = res.locals;
  
    try {
      const getUrl = await db.query(`
        SELECT
          cadastro.id AS user_id,
          cadastro.name AS name,
          COALESCE(SUM(url."visitCount"), 0) AS visitCount,
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', url.id,
              'shortUrl', url.short_url,
              'url', url.full_url,
              'visitCount', url."visitCount"
            )
          ) AS shortenedUrls
        FROM cadastro
        JOIN url ON cadastro.id = url.user_id
        WHERE cadastro.id = $1
        GROUP BY cadastro.id, cadastro.name;`, [sessao.rows[0].idUser]);
  
      const userData = getUrl.rows[0];

      console.log(userData.visitcount)

      let visit = Number(userData.visitcount);
  
      const responseBody = {
        id: userData.user_id,
        name: userData.name,
        visitCount: visit, // Certifique-se de converter para número, se necessário
        shortenedUrls: userData.shortenedurls // Verifique se a propriedade foi retornada corretamente
      };
  
      return res.status(200).send(responseBody);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }

  export async function selecionaRanking (req, res) {
  
    try {
      const getUrl = await db.query(`
      SELECT
      cadastro.id AS id,
      cadastro.name AS name,
      COUNT(url.short_url) AS linksCount,
      COALESCE(SUM(url."visitCount"), 0) AS visitCount
    FROM cadastro
    LEFT JOIN url ON cadastro.id = url.user_id
    GROUP BY cadastro.id, cadastro.name
    ORDER BY visitCount DESC
    LIMIT 10;`);

    const formattedData = getUrl.rows.map((userData) => ({
      id: userData.id,
      name: userData.name,
      linksCount: userData.linkscount, // "linksCount" em letra minúscula conforme a consulta SQL
      visitCount: userData.visitcount, // "visitCount" em letra minúscula conforme a consulta SQL
    }));

    return res.status(200).send(formattedData);
  
  
      
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }