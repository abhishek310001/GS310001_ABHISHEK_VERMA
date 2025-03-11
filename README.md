# Data Viewer App

A Progressive Web App for manipulating and analyzing data. This application allows users to manage store and SKU dimensions, enter measure data, calculate expressions, and visualize data through charts.

## Live Demo

The application is deployed and can be accessed for live testing at:
[https://gs-310001-abhishek-verma.vercel.app/](https://gs-310001-abhishek-verma.vercel.app/)

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

# Project Reflection

## Elements Done Well

1. **Responsive UI Design**: The application is fully responsive across different device sizes. The implementation of a collapsible drawer navigation system using Material UI's responsive breakpoints demonstrates my proficiency in creating adaptive interfaces. The layout adjusts seamlessly between desktop and mobile views.

2. **Data Grid Implementation**: The planning grid using AG-Grid showcases my ability to handle complex data visualization. The implementation includes custom cell renderers, conditional formatting for GM percentages, and efficient data manipulation, demonstrating my proficiency in working with advanced grid libraries.

3. **State Management**: The application uses a clean and efficient state management approach. The separation of concerns between data fetching, state updates, and UI rendering shows my understanding of React best practices and application architecture.

4. **Dynamic Calculations**: The implementation of real-time calculations for Sales Dollars, GM Dollars, and GM Percentage demonstrates my proficiency in handling complex business logic and data transformations within a React application.

5. **Chart Visualization**: The dual-axis chart implementation using Recharts shows my ability to translate raw data into meaningful visualizations. The chart's interactivity and synchronization with the selected store data demonstrates my proficiency in creating cohesive user experiences.

## Potential Improvements (With 4 More Hours)

1. **Enhanced Data Persistence**: Implement a more robust data persistence solution using IndexedDB or a similar browser storage mechanism. This would improve the offline capabilities of the PWA and provide a more reliable user experience.

2. **Advanced Filtering and Sorting**: Add more sophisticated filtering and sorting capabilities to the planning grid, allowing users to quickly find and analyze specific data points across different dimensions.

3. **Unit and Integration Testing**: Develop a comprehensive test suite using Jest and React Testing Library to ensure application reliability and facilitate future development. This would include tests for critical business logic and UI components.

4. **Data Import Functionality**: Implement features to import data in various formats (CSV, Excel, PDF) to enhance the utility of the application for business users who need to view or further analyze the data.
