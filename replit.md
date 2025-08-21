# Project Migration: Bolt to Replit

## Overview
This is a full-stack JavaScript application that manages materials, products, and users. It was successfully migrated from Bolt.new to Replit environment with necessary adaptations for compatibility, security, and best practices.

## Architecture
- **Frontend**: React with wouter for routing (migrated from react-router-dom)
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **Query Management**: TanStack React Query

## Key Migration Changes
- Converted from react-router-dom to wouter for Replit compatibility
- Fixed Layout and Sidebar components to work with wouter's different API
- Created missing ActivityLogs component
- Maintained separation between client and server for security
- Preserved existing component structure and functionality

## Project Structure
```
client/
  src/
    components/
      Auth/           - Authentication forms
      Dashboard/      - Main dashboard
      Layout/         - Layout and navigation components
      Logs/           - Activity logs (newly created)
      Materials/      - Materials management components
      Products/       - Products management components
      Users/          - User management components
    context/          - React context providers
    types/            - TypeScript type definitions
server/
  index.ts          - Main server entry point
  routes.ts         - API routes (placeholder)
  storage.ts        - Storage interface and in-memory implementation
shared/
  schema.ts         - Database schema definitions
```

## Current Status
- ✅ Migration from Bolt to Replit completed
- ✅ Router migration from react-router-dom to wouter
- ✅ Component structure preserved and fixed
- ✅ Server running successfully on port 5000
- ⚠️ Minor TypeScript warning in server/vite.ts (protected file)
- 🔲 Backend API routes need implementation
- 🔲 Authentication system needs backend integration
- 🔲 Database connection needs setup

## User Preferences
- Language: English (inferred from existing code comments in Polish)
- Framework: React with TypeScript
- Styling: Tailwind CSS with shadcn/ui components
- Database: PostgreSQL with Drizzle ORM

## Recent Changes
**2025-01-21**: 
- Enhanced "Dział Produktu" tab in product creation/editing modal
- Added comprehensive form fields: Postać dropdown (integrated with Form.tsx data), Marka dropdown (integrated with Brand.tsx data)
- Added input fields: Daily portions, Net quantity, Net weight, Food category, Recommended age, EAN, Suggested price, VAT, BLOZ, GIS Link, GIS Number
- Added dropdowns: Country (Poland/Germany), Currency (PLN/GBP/EUR/USD)
- Moved status dropdown from "Dział Marketingu" to "Dział Produktu" tab
- Extended Product interface with all new product department fields

**2024-12-31**: 
- Migrated project from Bolt to Replit
- Converted routing from react-router-dom to wouter
- Fixed Layout and Sidebar components for wouter compatibility
- Created missing ActivityLogs component
- Verified application startup and basic functionality

## Next Steps
1. Implement backend API routes for authentication and data management
2. Set up database connection and run initial migrations
3. Test all navigation and component functionality
4. Deploy to production when ready