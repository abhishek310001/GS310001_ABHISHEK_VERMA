// Define types for our application

// Store type
export interface Store {
    id: string;
    seqNo: number;
    label: string;
    city: string;
    state: string;
  }

// SKU type
export interface SKU {
    id: string;
    label: string;
    class: string;
    department: string;
    price: number;
    cost: number;
  }
