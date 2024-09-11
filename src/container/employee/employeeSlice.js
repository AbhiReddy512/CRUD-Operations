import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://66c05c6eba6f27ca9a566426.mockapi.io/users");
      
      if (response.status !== 200) {
        return rejectWithValue("Failed to fetch employees");
      }
      
      const data = await response.json();
      return data; 
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);


export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://66c05c6eba6f27ca9a566426.mockapi.io/users/${id}`,
        { method: "DELETE" }
      );
      if (response.status !== 200) {
        throw new Error("Failed to delete employee");
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    responseStatus: "pending",
    response: [],
  },
  reducers: {
    setEmployees: (state, action) => {
      state.responseStatus = action.payload.responseStatus;
      state.response = action.payload.response;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.responseStatus = 'pending';
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.responseStatus = 'resolved';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.responseStatus = 'rejected';
        state.error = action.payload;
      })

     
      .addCase(deleteEmployee.pending, (state) => {
        state.responseStatus = 'pending';
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.responseStatus = 'resolved';
        state.employees = state.employees.filter((employee) => employee.id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.responseStatus = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { setEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
