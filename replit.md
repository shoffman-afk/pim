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
**2025-01-22**: 
- Reorganized "Dział Produktu" section with structured "Ogólne Informacje" subsection
- Changed Opakowanie and Receptura fields to URL inputs (links) instead of text
- Added "Cechy Ogólne" section with 15 3-state characteristics (-, Nie, Tak):
  - 100% naturalny, Markowy Surowiec, Wegański, Wegetariański
  - Bez Cukru, Bez Substancji Słodzących, Bez Laktozy, Bezglutenowy
  - Bezalkoholowy, Bezzapachowy, Wolne od Soi, Wolne od Alergenów
  - Non-gmo, Wolne od Sorbinianu Potasu, Clean Label
- Added "Dla Kogo" section with 10 demographic targeting options (-, Nie, Tak):
  - Dla Mężczyzn, Dla Kobiet, Dla Kobiet w Ciąży, Dla Seniorów, Dla Dzieci
  - Dla Rodziny, Dla Diabetyków, Dla Sportowców, Dla Wegan, Dla Wegetarian
- Added "Badania" section with research studies management:
  - Multiple research entries with title, date, type dropdown, and file upload
  - Research types: Składniki aktywne, Mikrobiologia, Metale cięzkie, Osmolarność
  - Dynamic add/remove functionality for research entries
- Added "Opis Produktu" section with product description fields:
  - Pełna treść frontu opakowania (10-row textarea)
  - Szczególne Właściwości - Tytuł (text input)
  - Treść oświadczenia (WYSIWYG HTML editor using ReactQuill)
  - Zalecana dzienna porcja (text input)
- Added "Składniki" section with dual-pane ingredient selector:
  - Left pane shows available ingredients from Materials database
  - Right pane shows selected ingredients for the product
  - Click-to-add functionality from available to selected
  - Displays ingredient titles (from Materials) in selection but shows activeName in product preview
  - Remove functionality for selected ingredients
- Enhanced preview modal to display "Cechy Ogólne" as green badges, "Dla Kogo" as blue badges, "Badania" as detailed cards, "Opis Produktu" as formatted content sections, "Składniki" as comma-separated text with proper capitalization, and "Tabela" as formatted table
- Added table creation functionality with 3-column and 4-column options, first column header choices ("Składniki aktywne", "Wartości odżywcze"), editable headers and cells, add/remove rows functionality
- Updated Product interface with all new boolean fields supporting 3-state logic (undefined, false, true), research studies array, product description fields, ingredients array, and table structure

**2025-01-21**: 
- Enhanced "Dział Produktu" tab in product creation/editing modal
- Added comprehensive form fields: Postać dropdown (integrated with Form.tsx data), Marka dropdown (integrated with Brand.tsx data)
- Added input fields: Daily portions, Net quantity, Net weight, Food category, Recommended age, EAN, Suggested price, VAT, BLOZ, GIS Link, GIS Number
- Added dropdowns: Country (Poland/Germany), Currency (PLN/GBP/EUR/USD)
- Moved status dropdown from "Dział Marketingu" to "Dział Produktu" tab
- Extended Product interface with all new product department fields
- Added "Informacje Działu Produktu" section to product preview modal displaying all new fields with proper formatting

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