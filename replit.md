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
**2025-01-27**: 
- **Legal Disclaimers Multi-Select Implementation Completed**:
  - Replaced single dropdown with two-column multi-select system for legal disclaimers in product modal
  - Left column: Available legal disclaimers with search functionality
  - Right column: Selected disclaimers with removal capability
  - Visual count display showing number of selected disclaimers
  - Multi-select system identical to ingredients design for consistency
  - Updated Product interface to use `additionalInfo` as array instead of string
- **AdditionalInfo Component Refactored to Match Brand Design (1:1)**:
  - Completely restructured layout to match Brand component exactly
  - Updated header section with title, description, and action button
  - Converted table layout to match Brand component styling and structure
  - Modified modals to use 75vw width and consistent X close button positioning
  - Changed product badges to yellow theme (vs orange for Brand) for differentiation
  - Maintained exact same UI/UX patterns for design uniformity across all subpages
- **Enhanced Product Preview Display**:
  - Legal disclaimers now display as bulleted list in preview modal
  - Proper array handling for additionalInfo field throughout application
  - Fixed all TypeScript compilation errors related to interface changes
- **Form Layout Reorganization Completed**:
  - Legal disclaimers section moved to full-width standalone section (separate row)
  - "Sposób użycia", "Przechowywanie", and "Producent" fields moved from "Dodatkowe Informacje" to "Ogólne Informacje" section
  - Swapped positions of "Sposób użycia" and "Producent" fields per user request
  - Legal disclaimers converted to modal box style matching ingredients system
  - Added dual search functionality for both available and selected legal disclaimers
  - Enhanced styling with search icons, hover effects, and proper remove buttons
  - Maintained proper field functionality and validation
  - Improved form organization and user experience
- **Font Size Standardization Completed**:
  - Standardized first column font sizes across all subpages to match AdditionalInfo component
  - Updated "Standaryzacja", "Nazwa Składnika", "Kategorie", "Marka", "Postać", "Zastosowanie", and "ActiveComponents" components
  - Fixed remaining Components that still had `text-lg font-medium` in Products Brand, Categories, and Materials ActiveComponents
  - Changed from `text-lg font-medium` to `text-sm font-medium` for design consistency
  - Standardized date columns (creation and update dates) to use `text-sm` sizing across all components
  - All table first columns and date columns now use uniform `text-sm` styling for visual consistency across entire application
- **Equal Width Columns Implementation Completed**:
  - Added `table-fixed` class to all specified subpage tables for equal column distribution
  - Applied equal width classes (`w-1/5` for 5-column tables, `w-1/8` for 8-column Components table)
  - Updated Standaryzacja, Nazwa Składnika (Components), Kategorie (Materials), Dodatkowe Informacje, Marka, Postać, Kategorie (Products), Zastosowanie, and ActiveComponents
  - **Enhanced "Użyte w" Column Width**: Made "Użyte w" column 100% wider (double width) across all pages
  - Updated column distributions: 5-column tables use `w-1/6` for other columns and `w-2/6` for "Użyte w", Components table (now 7 columns) uses `w-1/7` for other columns and `w-2/7` for "Użyte w"
  - **Components Table Restructuring**: Removed "Nazwa Składnika" column and moved active names as subtitles under "Tytuł" column (similar to Products page design)
  - Components table now has 7 columns instead of 8, with improved title-subtitle display pattern for better readability
  - All columns now have proportional width distribution with enhanced "Użyte w" visibility across all subpages

**Previous Features (2025-01-27)**:
- Added support for multiple separate tables in different variations:
  - Each product can now have multiple tables instead of just one
  - Tables list management with add/edit/delete functionality  
  - Individual table editor with preview for each table
  - Table counter showing number of existing tables
- Enhanced table functionality with intelligent dropdown integration:
  - First column uses dropdown from Materials database when "Składniki aktywne" is selected
  - Shows "Nazwa Składnika" (activeName) from Materials database
  - Regular input fields for "Wartości odżywcze" and all other columns
- Added three new product information fields positioned after tables section:
  - "Sposób użycia" (3-line textarea for usage instructions)
  - "Przechowywanie" (input field for storage instructions)
  - "Producent" (dropdown with "Aura Herbals" option)
- Increased all popup/modal widths to 75% of screen width (75vw)
- Added X close buttons in top-right corner of all modals:
  - Create Product Modal, Preview Modal, and Sync Modal
  - Consistent positioning with hover effects
- Updated Product interface to use `tables` array instead of single table fields
- Enhanced table preview in product modal to display multiple tables with individual headers
- Organized new fields under "Dodatkowe Informacje" section with responsive grid layout

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
- Enhanced preview modal to display "Cechy Ogólne" as green badges, "Dla Kogo" as blue badges, "Badania" as detailed cards, "Opis Produktu" as formatted content sections, "Składniki" as comma-separated text with proper capitalization, and "Tabele" as formatted multiple tables
- Added multiple table creation functionality with 3-column and 4-column options, first column header choices ("Składniki aktywne", "Wartości odżywcze"), editable headers and cells, add/remove rows functionality
- Updated Product interface with all new boolean fields supporting 3-state logic (undefined, false, true), research studies array, product description fields, ingredients array, and multiple tables structure

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