import { connect } from "tls";
import { URL } from "url";
import { formatSSLDetails } from "./formatSSLDetails";

export const checkSSL = async (site: string): Promise<string> => {
  try {
    // Basic URL format validation before attempting to create URL object
    if (!site || typeof site !== "string") {
      return `Error: Invalid or non-HTTPS URL (${site})`;
    }

    // Normalize the URL by adding https:// if not present
    let normalizedSite = site.trim();
    if (!normalizedSite.startsWith("https://")) {
      normalizedSite = `https://${normalizedSite}`;
    }

    // Try to create URL object
    let url: URL;
    try {
      url = new URL(normalizedSite);
      if (url.protocol !== "https:") {
        return `Error: Invalid or non-HTTPS URL (${site})`;
      }
    } catch (e) {
      return `Error: Invalid or non-HTTPS URL (${site})`;
    }

    return new Promise((resolve) => {
      const socket = connect({
        host: url.hostname,
        port: 443,
        servername: url.hostname,
        timeout: 10000,
        rejectUnauthorized: false, // Allow connection to invalid/expired certs for checking
      });

      socket.on("secureConnect", () => {
        const cert = socket.getPeerCertificate(true);
        if (!cert) {
          socket.destroy();
          resolve(`Error: No valid SSL certificate found for "${site}"`);
          return;
        }

        const now = new Date();
        const validTo = new Date(cert.valid_to);
        if (validTo < now) {
          socket.destroy();
          resolve(
            `Error: SSL certificate for "${site}" is expired (Expired on ${validTo.toUTCString()})`
          );
          return;
        }

        const result = formatSSLDetails(
          site,
          cert.issuer.O || "Unknown",
          cert.valid_to,
          cert.serialNumber || "N/A"
        );
        socket.destroy();
        resolve(result);
      });

      socket.on("timeout", () => {
        socket.destroy();
        resolve(`Error: Connection timeout while checking "${site}"`);
      });

      socket.on("error", (error) => {
        socket.destroy();
        if (error.message.includes("certificate has expired")) {
          resolve(`Error: SSL certificate for "${site}" has expired`);
        } else {
          resolve(`Error: SSL check failed for "${site}"`);
        }
      });
    });
  } catch (error) {
    return `Error: SSL check failed for "${site}"`;
  }
};
