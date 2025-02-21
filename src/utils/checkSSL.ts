import { formatSSLDetails } from "./formtatSSLDetails";
import { validHttpsUrl } from "./validHttpsUrl";
import { exec } from "child_process";

export const checkSSL = (site: string): Promise<string> => {
  const url = validHttpsUrl(site.trim());

  if (!url) {
    return Promise.resolve(`Error: Invalid or non-HTTPS URL (${site})`);
  }

  return new Promise((resolve) => {
    exec(
      `echo | openssl s_client -connect ${url.hostname}:443 -servername ${url.hostname} 2>/dev/null | openssl x509 -noout -issuer -startdate -enddate -serial`,
      (error, stdout) => {
        if (error) {
          resolve(`Error: SSL check failed for "${site}"`);
          return;
        }

        // Extract SSL details
        const issuerMatch = stdout.match(/issuer=.*?O=([^,\/\n]+)/);
        const validFromMatch = stdout.match(/notBefore=(.*)/);
        const validToMatch = stdout.match(/notAfter=(.*)/);
        const serialMatch = stdout.match(/serial\s*=\s*([\dA-Fa-f]+)/);

        // If no matches, return an error
        if (!issuerMatch || !validFromMatch || !validToMatch) {
          resolve(`Error: No valid SSL certificate found for "${site}"`);
          return;
        }

        // Check for expiration
        const validToDate = new Date(validToMatch[1]);
        const now = new Date();
        if (validToDate < now) {
          resolve(
            `Error: SSL certificate for "${site}" is expired (Expired on ${validToDate.toUTCString()})`
          );
          return;
        }

        // Format the result
        const formattedResult = formatSSLDetails(
          site,
          issuerMatch[1]?.trim() || "Unknown",
          validFromMatch[1]?.trim(),
          validToMatch[1]?.trim(),
          serialMatch ? serialMatch[1].trim() : "N/A"
        );

        resolve(formattedResult);
      }
    );
  });
};
