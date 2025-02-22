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

    // Run OpenSSL command to extract required SSL certificate details
    exec(
      `echo | openssl s_client -connect ${url.hostname}:443 -servername ${url.hostname} 2>/dev/null | openssl x509 -noout -issuer -startdate -enddate -serial -subject`,
      (error, stdout, stderr) => {
        if (error || stderr) {
          resolve(`Error: SSL check failed for "${site}"`);
          return;
        }

        // Extract only the "O" (Organization) from the Issuer field
        const issuerMatch = stdout.match(/O=([^,]+)/);
        const issuer = issuerMatch ? issuerMatch[1].trim() : "N/A";

        const startDate = stdout.match(/notBefore=(.+)/)?.[1]?.trim() || "N/A";
        const endDate = stdout.match(/notAfter=(.+)/)?.[1]?.trim() || "N/A";
        const serialNumber = stdout.match(/serial=(.+)/)?.[1]?.trim() || "N/A";
        const category =
          stdout.match(/subject=.*CN=([^,]+)/)?.[1]?.trim() || "N/A";
        const ssn = serialNumber; // Assuming SSN is the serial number

        // Convert end date to a Date object and check validity
        const expiryDate = new Date(endDate);
        const currentDate = new Date();
        const validity =
          expiryDate > currentDate
            ? "✅ SSL Certificate is **VALID**"
            : "❌ SSL Certificate is **EXPIRED**";

        resolve(
          `✅ SSL Certificate Details for "${site}":\n--------------------------------------\n` +
            `📌 Issuer: ${issuer}\n` +
            `📅 Start Date: ${startDate}\n` +
            `📅 End Date: ${endDate}\n` +
            `🔢 Serial Number: ${serialNumber}\n` +
            `🏷️ Category: ${category}\n` +
            `🆔 SSN: ${ssn}\n` +
            `🔍 Validity: ${validity}\n`
        );
      }
    );
  });
};
