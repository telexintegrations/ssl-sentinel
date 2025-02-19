import * as tls from "tls";
import { formatSSLDetails } from "./formtatSSLDetails";
import { validHttpsUrl } from "./validHttpsUrl";

export const checkSSL = (site: string): Promise<string | null> => {
	const url = validHttpsUrl(site);

	if (!url) {
		return Promise.resolve(`Error: Invalid or non-HTTPS URL (${site})`);
	}

	const options = {
		host: url.hostname,
		port: 443,
		servername: url.hostname,
	};

	return new Promise((resolve) => {
		const socket = tls.connect(options, () => {
			const cert = socket.getCertificate();

			if (!cert || Object.keys(cert).length === 0) {
				resolve(`Error: No valid SSL certificate found for "${site}"`);
				socket.end();
				return;
			}

			const peerCert = cert as tls.PeerCertificate;

			const result = formatSSLDetails(
				site,
				peerCert.issuer?.O || "Unknown",
				peerCert.valid_from,
				peerCert.valid_to,
				peerCert.serialNumber,
			);

			resolve(result);
			socket.end();
		});

		socket.on("error", () => {
			resolve(`Error: SSL check failed for "${site}"`);
		});
	});
};
