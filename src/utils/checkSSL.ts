import { formatSSLDetails } from "./formtatSSLDetails";
import { validHttpsUrl } from "./validHttpsUrl";
import { exec } from "child_process";

export const checkSSL = (site: string): Promise<string> => {
  const url = validHttpsUrl(site);

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

        const issuerMatch = stdout.match(/issuer=.*?O=(.*?)(,|\/)/);
        const validFromMatch = stdout.match(/notBefore=(.*)/);
        const validToMatch = stdout.match(/notAfter=(.*)/);
        const serialMatch = stdout.match(/serial=(.*)/);

        if (!issuerMatch || !validFromMatch || !validToMatch || !serialMatch) {
          resolve(`Error: No valid SSL certificate found for "${site}"`);
          return;
        }

        const validToDate = new Date(validToMatch[1]);
        const now = new Date();
        if (validToDate < now) {
          resolve(
            `Error: SSL certificate for "${site}" is expired (Expired on ${validToDate.toUTCString()})`,
          );
          return;
        }

        const formattedResult = formatSSLDetails(
          site,
          issuerMatch[1] || "Unknown",
          validFromMatch[1],
          validToMatch[1],
          serialMatch[1],
        );

        resolve(formattedResult);
      },
    );
  });
};
