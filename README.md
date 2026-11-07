# Swachh Sevak

A modular, responsive community cleanliness portal built with HTML, CSS, and vanilla JavaScript. No build step or package installation is required.

## Run it
1. Open the `Swachh-Sevak` folder in VS Code.
2. Run `index.html` with the Live Server extension or another local HTTP server.
3. Use a local HTTP server if your browser blocks JavaScript modules opened through `file://`.

## Sample sign-in accounts
The opening page is the sign-in screen. Choose an account from the dropdown and enter the shared one-time code `123456`.

| Account | Mobile number | Dashboard access |
|---|---:|---|
| Aarav Sharma | `9999999999` | Citizen: personal requests |
| Meera Patel | `9000000001` | Ward member: assign and update requests |
| Rohan Iyer | `9000000002` | Municipal admin: view all requests and escalations |

## Included
- Login-first flow with a role-specific dashboard for each sample account.
- Issue reports, tracking, notifications, contacts, and role-specific request management.
- Two sample complaints, including an open report and an in-progress ward assignment.
- Local browser persistence using `localStorage`.
- A +24-hour clock control for exploring complaint escalation behavior.

## Limitations
This is a frontend-only site for trying the interface. The one-time code is shown on the login page and is not sent by SMS. Data stays in the current browser. Real authentication and role permissions require a secure backend; sample account roles are for interface preview only. Contacts are examples and do not reach real services.

## Project structure
- `index.html` — app shell
- `css/` — global, component, responsive, and interaction styles
- `js/` — app entry point and modules for authentication, storage, complaints, roles, and notifications
- `assets/` — reserved for future local assets
