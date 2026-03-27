# SMC Web-Assist
Project's Main Concept: Provide a user-friendly platform for students who wish to submit an inquiry or concern related to the school. The web app generally revolves around the **Ticketing System** where user-submitted inquiries/concerns are treated as tickets which are easily stored, tracked, and reviewed by school admins or the web app operators.

## Key Features
- Accessibility
    - Web app is accessible via online (if deployed to the internet, otherwise only in local network).
- Viewport Responsiveness
    - Utilizes bootstrap framework for a responsive UI both in desktop and mobile viewport.
- User Management
    - To keep track of user data and privacy.
- User Input Validation
    - Inputs are strict with patterns and disregard empty fields.
- Authentication & Authorization
    - Using Express frameworks, routing protocols are implemented to restrict users who are not authorized in accessing certain pages, routes, and/or endpoints of the app.
- Ticketing System
    - Inquiries and Concerns are treated as tickets which are easily stored, tracked, and reviewed by school admins.
- Ticket Conversation
    - To resolve issues/concerns, students and admins communicate via ticket conversation where parties involved can formulate resolutions.
- Ticket Management
    - For regular users, they can view their tickets in the profile dashboard. For admins, they can view certain tickets in a centralized page based on their department.
- Email Notification
    - Users or the author of the ticket is notified via email whenever a reply is sent to their ticket.
- Password Reset Request
    - Users can request password reset via an email link sent by the app when requesting a password reset.
*Note: Emailing features requires a password. Provide your own email credentials for the app to use. App still works if the email helper is not configured, but expect disabled features.*

## Tech Stack
- Node.js (Runtime)
- Express Framework
- MySQL (Database)
- JavaScript
- HTML
- CSS
- Bootstrap

## Installation
`Note: Make sure you have Node.js(LTS) and MySQL installed.`
1. Clone the repo
2. Open a terminal in the project's root folder and execute `npm install`
3. Create the SQL database by executing the SQL Script file `root/sql-script.sql` into your choice of MySQL software.
4. Set up environment variables by creating a `.env` file, inside it are:
```Dotenv
MYSQL_HOST=''        # Your MySQL credentials
MYSQL_USER=''        #
MYSQL_PASSWORD=''    #
MYSQL_DATABASE=''    #

USER_TOKEN_SECRET=''
USER_RESET_PASS=''
ACCESS_TOKEN_SECRET=''

GOOGLE_APP_PASSWORD='' # your email account credential
```
