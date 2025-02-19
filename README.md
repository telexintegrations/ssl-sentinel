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
