# Changelog FEB 27

## [Unreleased]

### Added
- Created initial API routes for shoe data
  - `/api/shoes/search` endpoint for filtering shoes
  - Basic search functionality implementation
- Set up Supabase integration
  - Added environment variables for Supabase configuration
  - Created test endpoints and pages for verifying connection
- Added new components
  - `ShoeFinderResults` component for displaying search results
  - Loading state UI for search results
- Added utility functions in `lib/utils.ts`
  - Added `cn` utility for Tailwind class merging
  - Installed `clsx` and `tailwind-merge` dependencies

### Changed
- Restructured project to include API routes
- Updated component organization for better separation of concerns
- Moved search result display logic to dedicated component

### Fixed
- Fixed module resolution for `@/lib/utils`
- Corrected API route implementation to return JSON instead of JSX




# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial shoe finder form implementation
- Card component for UI elements
- Basic form stepper functionality
- Multi-step form navigation
- Shoe recommendation logic

### Changed

### Fixed

## [0.1.0] - 2024-03-20
- Initial project setup
- Basic Next.js structure
- UI component foundation
