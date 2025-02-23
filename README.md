# Telex SSL-Sentinel

## Overview

This project integrates with the Telex platform to periodically check the SSL certificates of provided websites, and reports the SSL expiration date for the website

## Features

- Periodically checks SSL/TLS certificates for expiration.
- Sends periodics updates
- Retrieves issuer, validity and encryption details.

---

## Installation

## Prerequisites

- Node.js v18.0.0 or higher
- pnpm v8.0.0 or higher

To install Node.js, visit [the official Node.js website](https://nodejs.org/).

To install pnpm, run:

```bash
npm install -g pnpm
```

You can verify your installations by running:

```bash
node --version
pnpm --version
```

### 1️. Clone the Repository

```bash
git clone https://github.com/your-username/ssl-sentinel.git
cd ssl-sentinel
```

### 2. Install Dependencies

```bash
pnpm install
```

---

## Testing the application

```bash
pnpm test
```

---

## Running the Application

To start the application in developemnt mode

```bash
pnpm run dev
```

---

## API Endpoints

### **Trigger SSL-Sentinel**

**Endpoint:** `/tick`

- **Method:** `POST`
- **Description:** Performs the SSL checks for the provided websites and sends updates to Telex.
- **Example Payload:**
  ```json
  {
    "channel_id": "ssl-sentinel-checker",
    "return_url": "https://ping.telex.im/v1/webhooks/YOUR-WEBHOOK-ID",
    "settings": [
      { "label": "site-1", "type": "text", "required": true, "default": "" },
      { "label": "site-1", "type": "text", "required": true, "default": "" }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "status": "SSL-Sentinel started"
  }
  ```

### **Integration JSON**

**Endpoint:** `/integration.json`

- **Method:** `GET`
- **Description:** Returns Telex integration metadata.

---

## Testing SSL-Sentinel on Telex

### Configuration Steps

1. **Go to the App Settings**
   - Add up to two URLs that you want to monitor for periodic SSL certificate checks.
   - Specify the interval period using a cron scheduler format (`* * * * *`).
   - The default interval is every 5 minutes: `*/5 * * * *`.

**Save Settings**

- Click **Save** to apply changes.
- Optionally, set a specific channel for output under the **Output Settings** section.
- If no specific channel is set, click **Save Settings** to apply to all channels.

---

## Screenshots

### Adding urls through settings

![adding urls through settings](https://private-user-images.githubusercontent.com/144457161/414908663-838e2f88-8b04-4cb1-a503-e5678e9eb1d7.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDAwMDA2NzEsIm5iZiI6MTc0MDAwMDM3MSwicGF0aCI6Ii8xNDQ0NTcxNjEvNDE0OTA4NjYzLTgzOGUyZjg4LThiMDQtNGNiMS1hNTAzLWU1Njc4ZTllYjFkNy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMjE5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDIxOVQyMTI2MTFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1jMTc5NmI0YzVlZDExNGExYzJkODVlNjQ2YTY0OWRiMTI2NmRjZGU1MmE1YTU3ZGE2ZTc3YzUxMzM3ZTliODI2JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.gxou4Tq4Yf-WY2vot1jvEnS-QYq_v68f45LUTXlMWPA)

### Sample SSL-Sentinel messages in the channel

![SSL-Sentinel Success message](https://private-user-images.githubusercontent.com/144457161/414908660-d1743f0e-a04c-4082-bc68-32138627ce0d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDAwMDA5NjIsIm5iZiI6MTc0MDAwMDY2MiwicGF0aCI6Ii8xNDQ0NTcxNjEvNDE0OTA4NjYwLWQxNzQzZjBlLWEwNGMtNDA4Mi1iYzY4LTMyMTM4NjI3Y2UwZC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMjE5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDIxOVQyMTMxMDJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hY2Y1NmRjMWQxODZhNjNlYTE2ZTJjYWY3OTM2YTZlMDQ4NDkzMzEzYzMwYWM0MDc2Yjk4MDE1MGYwMzU5MjdkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.rOfFPywp7h6WEbKNGgg4YuxHdRwhJZu_2ZEfix1smQ0)

![SSL-Sentinel sample error status](https://private-user-images.githubusercontent.com/144457161/414908661-4204895f-f6ea-409d-9646-2c9841be36f9.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDAwMDA5NjIsIm5iZiI6MTc0MDAwMDY2MiwicGF0aCI6Ii8xNDQ0NTcxNjEvNDE0OTA4NjYxLTQyMDQ4OTVmLWY2ZWEtNDA5ZC05NjQ2LTJjOTg0MWJlMzZmOS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMjE5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDIxOVQyMTMxMDJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hZGNlYzZjNGQxNTFlMTRlMjA5MjAxYzE1MTBmY2Q1M2Y3YmZlODlmYjUxMWQwMDlkZDM1OWMxYzYyNjUzYTg5JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.FG9_cSNFQVnJcwMpSReohl4UosQFPj7EvNtPv4gAUjs)

---

## License

This project is licensed under the MIT License.

---

## Additional Resources

- [Cron schedule expression](https://crontab.guru/every-5-minutes)
- [Telex API Reference](https://telex.im/docs/)

---

## Contributing

1. Fork the repository
2. Create a new branch (`feature-xyz`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

Feel free to reach out for any improvements or issues! 🚀
