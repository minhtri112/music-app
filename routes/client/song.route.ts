import { Request, Response, Router } from "express";

const router : Router = Router();

import Topic from "../../models/topic.model";

import * as controller from "../../controllers/client/song.controller";

router.get("/:slugTopic", controller.list);

router.get("/detail/:slugSong", controller.detail);

router.patch("/listen/:songId", controller.listen);

router.patch("/like/:typeLike/:idSong", controller.like);

router.patch("/favorite/:typeFavorite/:idSong", controller.favorite);

export const songRoutes : Router = router;