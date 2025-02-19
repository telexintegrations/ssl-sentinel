export const formatSSLDetails = (
  site: string,
  issuer: string,
  validityStart: string,
  validityEnd: string,
  serialNumber: string,
) => {
  return `SSL Certificate Information for ${site}:
 -----------------------------
 Issuer: ${issuer}
 Validity: ${validityStart} - ${validityEnd}
 Serial Number: ${serialNumber}
 `;
};
