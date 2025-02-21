export const formatSSLDetails = (
  site: string,
  issuer: string,
  validityEnd: string,
  serialNumber: string
) =>
  `🔒 SSL Certificate for ${site}\n` +
  `Issuer: ${issuer}\n` +
  `Valid Until: ${validityEnd}\n` +
  `Serial: ${serialNumber}`;
