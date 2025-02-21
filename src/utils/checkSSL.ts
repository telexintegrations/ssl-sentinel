import { exec } from "child_process";

export const checkSSL = (site: string): Promise<string> => {
  return new Promise((resolve) => {
    if (!site || typeof site !== "string") {
      resolve(`Error: Invalid or non-HTTPS URL (${site})`);
      return;
    }

    // Normalize URL
    let normalizedSite = site.trim();
    if (!normalizedSite.startsWith("https://")) {
      normalizedSite = `https://${normalizedSite}`;
    }

    const url = new URL(normalizedSite);

    // Run OpenSSL command to get certificate details and verification status
    exec(
      `echo | openssl s_client -connect ${url.hostname}:443 -servername ${url.hostname} 2>/dev/null | openssl x509 -noout -dates -issuer -serial -subject; echo | openssl s_client -connect ${url.hostname}:443 -servername ${url.hostname} 2>/dev/null | grep "Verify return code"`,
      (error, stdout, stderr) => {
        if (error || stderr) {
          resolve(`Error: SSL check failed for "${site}"`);
          return;
        }

        // Check for SSL verification failures
        if (stdout.includes("Verify return code: 0 (ok)")) {
          resolve(
            `SSL Certificate Details for "${site}":\n${stdout
              .trim()
              .replace(/issuer=/g, "Issuer:")}`
          );
        } else {
          resolve(`Error: SSL certificate is invalid or expired for "${site}"`);
        }
      }
    );
  });
};
