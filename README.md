# Data Viewer App

A Progressive Web App for manipulating and analyzing data. This application allows users to manage store and SKU dimensions, enter measure data, calculate expressions, and visualize data through charts.

## Features

- **Store Management**: Add, edit, delete, and reorder stores
- **SKU Management**: Add, edit, and delete with their prices and costs
- **Planning Grid**: Cross join of Stores and SKUs along the rows, and Calendar along the columns
  - Editable Sales Units
  - Calculated Sales Dollars (Sales Units * Price)
  - Calculated GM Dollars (Sales Dollars - Sales Units * Cost)
  - Calculated GM Percentage (GM Dollars / Sales Dollars) with conditional formatting
- **Chart Visualization**: Dual axis bar chart showing GM Dollars and GM Percentage for a selected store

## Technologies Used

- React
- TypeScript
- Vite
- Material UI
- AG-Grid
- Recharts
- React Router

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/abhishek310001/GS310001_ABHISHEK_VERMA
cd GS310001_ABHISHEK_VERMA
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

5. Preview the production build
```bash
npm run preview
```

## Usage

1. **Stores Page**: Manage your stores
2. **SKUs Page**: Manage your SKUs with their prices and costs
3. **Planning Page**: Enter sales units data and view calculated fields
4. **Chart Page**: Visualize GM Dollars and GM Percentage for a selected store
