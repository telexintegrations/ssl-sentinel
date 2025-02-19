import { Router } from "express";

const router = Router();

router.get("/integration.json", (req, res) => {
	const baseUrl = `${req.protocol}://${req.get("host")}`;

	const jsonSpec = {
		data: {
			date: {
				created_at: "YYYY-MM-DD",
				updated_at: "YYYY-MM-DD",
			},
			descriptions: {
				app_description:
					"SSL-Sentinel periodically check the SSL certificates of provided websites, and reports the SSL expiration date for the website",
				app_logo: "",
				app_name: "SSL-Sentinel",
				app_url: `${baseUrl}/tick`,
				background_color: "#50C878",
			},
			integration_category: "Monitoring & Logging",
			integration_type: "interval",
			is_active: true,
			key_features: [
				"Periodically checks SSL/TLS certificates for expiration.",
				"Sends periodics updates.",
				"Retrieves issuer, validity and encryption details.",
			],
			settings: [
				{ label: "site-1", type: "text", required: true, default: "" },
				{ label: "site-2", type: "text", required: true, default: "" },
				{
					label: "interval",
					type: "text",
					required: true,
					default: "* * * * *",
				},
			],
			tick_url: `${baseUrl}/tick`,
		},
	};

	res.json(jsonSpec);
});
