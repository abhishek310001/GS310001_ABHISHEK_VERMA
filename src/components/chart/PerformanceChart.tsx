import React from 'react';
import { Box, Typography } from '@mui/material';
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import { BAR_PROPERTIES, CHART_COLORS, CHART_MARGINS, GRID_PROPERTIES, LINE_PROPERTIES } from '../../constants/chartConstants';

interface ChartData {
  weekId: string;
  weekLabel: string;
  monthLabel: string;
  salesDollars: number;
  gmDollars: number;
  gmPercentage: number;
}

interface PerformanceChartProps {
  data: ChartData[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%'
      }}>
        <Typography variant="h6" color="text.secondary">
          Please select a store with sales data to view the chart
        </Typography>
      </Box>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={CHART_MARGINS}
      >
        <CartesianGrid strokeDasharray={GRID_PROPERTIES.strokeDasharray} />
        <XAxis 
          dataKey="weekLabel" 
          height={60}
          interval={0}
          tick={(props) => (
            <text
              transform={`rotate(-45 ${props.x} ${props.y})`}
              x={props.x}
              y={props.y}
              textAnchor="end"
              dy={props.dy}
            >
              {props.payload.value}
            </text>
          )}
        />
        <YAxis 
          yAxisId="left"
          orientation="left"
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <YAxis 
          yAxisId="right"
          orientation="right"
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip 
          formatter={(value: any, name: string) => {
            if (name === 'GM %') return `${value.toFixed(1)}%`;
            return `$${value.toLocaleString()}`;
          }}
        />
        <Legend />
        <Bar 
          yAxisId="left"
          dataKey="gmDollars" 
          name="GM $" 
          fill={CHART_COLORS.gmDollars}
          barSize={BAR_PROPERTIES.barSize}
        />
        <Line
          yAxisId="right"
          type={LINE_PROPERTIES.type}
          dataKey="gmPercentage"
          name="GM %"
          stroke={CHART_COLORS.gmPercentage}
          strokeWidth={LINE_PROPERTIES.strokeWidth}
          dot={{ fill: CHART_COLORS.gmPercentage }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default React.memo(PerformanceChart); 
