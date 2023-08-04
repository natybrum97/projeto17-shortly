import { Router } from "express";
import { deletaUrlPorId, getPorShortUrl, postEncurtador, selecionaRanking, selecionaTudoDoUser, urlPorID } from "../controllers/urls.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateAuth } from "../middlewares/validateAuth.js";
import { schemaUrl } from "../schemas/urls.schemas.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateAuth, validateSchema(schemaUrl), postEncurtador );
urlsRouter.get("/urls/:id", urlPorID );
urlsRouter.get("/urls/open/:shortUrl", getPorShortUrl );
urlsRouter.delete("/urls/:id", validateAuth , deletaUrlPorId);
urlsRouter.get("/users/me", validateAuth , selecionaTudoDoUser );
urlsRouter.get("/ranking", selecionaRanking );

export default urlsRouter;