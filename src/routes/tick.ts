import { Router } from "express";
import { monitorTask } from "../utils/monitorTask";
import { MonitorPayload } from "../types";

const router = Router();

router.post("/tick", (req, res) => {
	const body: MonitorPayload = req.body;

	if (!body) {
		res.status(400).json({ error: "missing content" });
		return;
	}

	res.json({ status: "accepted" });

	setTimeout(async () => {
		await monitorTask(body);
	}, 0);
});
