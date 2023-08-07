import { stripHtml } from "string-strip-html";
import { nanoid } from "nanoid";
import { atualizaShort, criaeSalvaLinkEncurtado, deletaResultadoDaPesquisa, pegaTudoDoRanking, pegaUrlPorID, pegaUrlPorShort, procuraOqueVaiDeletar, selecionaTodasAsUrlsDoUser } from "../repository/urls.repository.js";

export async function postEncurtador(req, res) {

    const { url } = req.body;

    const { sessao } = res.locals;

    const sanitizedUrl = stripHtml(url).result.trim();

    const shortIdLength = 6;
    const shortUrl = nanoid(shortIdLength)

    try {

        const result = await criaeSalvaLinkEncurtado(shortUrl, sanitizedUrl, sessao);

        res.status(201).send({ id: result.rows[0].id, shortUrl: shortUrl });

    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function urlPorID(req, res) {

    const { id } = req.params;

    try {

        const getUrl = await pegaUrlPorID(id);

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

        const getUrl = await pegaUrlPorShort (shortUrl);

        console.log(getUrl.rows)

        if (getUrl.rows.length === 0) return res.status(404).send("Url não encontrada pelo short_url");

        console.log(getUrl.rows.length === 0)

        const { full_url, visitCount } = getUrl.rows[0];

        const updatedVisits = visitCount + 1;

        await atualizaShort (updatedVisits, shortUrl);

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

        const result = await procuraOqueVaiDeletar (id);

        if (result.rowCount === 0) return res.status(404).send("Essa URL não consta no sistema!");

        if (result.rows[0].user_id != sessao.rows[0].idUser) {

            res.status(401).send("A url encurtada não pertencer ao usuário.");

        } else {

            await deletaResultadoDaPesquisa (id);

        }

        res.status(204).send("URL deletada com sucesso!");

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function selecionaTudoDoUser(req, res) {
    const { sessao } = res.locals;
  
    try {
      const getUrl = await selecionaTodasAsUrlsDoUser(sessao);
  
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
      const getUrl = await pegaTudoDoRanking();

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