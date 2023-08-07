import { db } from "../database/database.connection.js";

export function criaeSalvaLinkEncurtado (shortUrl, sanitizedUrl, sessao) {

    const result = db.query('INSERT INTO url ("short_url", "full_url" , "visitCount", "user_id") VALUES ($1, $2, $3, $4) RETURNING id', [shortUrl, sanitizedUrl, 0, sessao.rows[0].idUser]);

    return result;

}

export function pegaUrlPorID (id) {

    const getUrl = db.query('SELECT * FROM url WHERE id = $1;', [id]);

    return getUrl;

}

export function pegaUrlPorShort (shortUrl) {

    const getUrl = db.query('SELECT * FROM url WHERE "short_url" = $1;', [shortUrl]);

    return getUrl;

    
}

export function atualizaShort (updatedVisits, shortUrl) {

    const result = db.query('UPDATE url SET "visitCount" = $1 WHERE short_url = $2;', [updatedVisits, shortUrl]);

    return result;
    
}

export function procuraOqueVaiDeletar (id) {

    const resultado = db.query('SELECT * FROM url WHERE id = $1;', [id]);

    return resultado;
    
}

export function deletaResultadoDaPesquisa (id) {

    const resultado = db.query('DELETE FROM url WHERE id = $1;', [id]);

    return resultado;
    
}

export function selecionaTodasAsUrlsDoUser (sessao) {

    const resultado = db.query(`
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

        return resultado;
    
}

export function pegaTudoDoRanking() {

    const resultado = db.query(`
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

    return resultado;
    
}