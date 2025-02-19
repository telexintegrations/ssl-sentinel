import { MonitorPayload } from "../types";
import { checkSSL } from "./checkSSL";

export const monitorTask = async (payload: MonitorPayload) => {
  const sites = payload.settings
    .filter((setting) => setting.label.startsWith("site"))
    .map((setting) => setting.default);

  const results = await Promise.all(sites.map((site) => checkSSL(site)));

  const hasError = results.some((re) => re?.startsWith("Error"));

  const message = results.join("\n\n");

  const data = {
    message: message,
    username: "SSL-Sentinel",
    event_name: "SSL check",
    status: hasError ? "error" : "success",
  };

  await fetch(payload.return_url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
