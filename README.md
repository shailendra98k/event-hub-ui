# EventHub UI

## Features
- User authentication (login/signup modal)
- Dashboard for buyers to view RFPs (Request for Proposals)
- RFP list view with venue, date, guest count, budget, notes, and status
- Responsive UI with dark-themed list items
- Navigation bar with app name, user greeting, login button, and files link (visible when logged in)
- Venue details and reviews


## Project Structure
```
public/           # Static assets
src/
  app/
    dashboard/    # Buyer dashboard and RFPs
    venues/       # Venue listing and details
      [id]/       # Venue details by ID
    api/
      [...proxy]/ # API proxy routes
    globals.css   # Global styles
    layout.tsx    # App layout
    page.tsx      # Home page
  components/
    navbar/       # Top navigation bar
    footer/       # Footer
    modals/
      signInModal.tsx # Login modal
      signupModal.tsx # Signup modal
  context/
    UserContext.tsx # User authentication context
  constant.ts     # App constants
Dockerfile        # Docker configuration for containerized deployment
eslint.config.mjs # ESLint configuration
next.config.ts    # Next.js configuration
package.json      # Project metadata and dependencies
tsconfig.json     # TypeScript configuration
postcss.config.mjs# PostCSS configuration
next-env.d.ts     # Next.js TypeScript environment
```
## Hosting
The application is currently hosted on AWS and can be accessed at:
http://ec2-13-235-73-50.ap-south-1.compute.amazonaws.com/

## CI/CD
A GitHub Action is configured to automatically trigger deployment to AWS whenever code is merged into the `main` branch. This ensures the latest changes are always live on the hosted environment.


# Local Development


## Backend (Pre-requisite)
This UI app is designed to work with the EventHub backend. API requests are proxied to the backend via `/api/proxy/v1/*` routes. Make sure the EventHub backend is running and accessible for full functionality before starting the UI.

The EventHub backend repository is available at: [https://github.com/shailendra98k/event-hub](https://github.com/shailendra98k/event-hub)


## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running with Docker
You can also run the application using Docker:

1. Build the Docker image:
   ```bash
   docker build -t eventhub-ui .
   ```
2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 eventhub-ui
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

Alternatively, you can use the pre-built Docker image deployed on AWS ECS:

```bash
docker pull shailendra98k/eventhubui:main
```

Then run it as usual:
```bash
docker run -p 3000:3000 shailendra98k/eventhubui:main
```

## Customization
- Update styles in `src/app/globals.css` or component files.
- API endpoints are proxied via `/api/proxy/v1/*`.

## License
MIT
