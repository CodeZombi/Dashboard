import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetProductDetailsQuery} from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { IconButton,Button } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Buy from "scenes/Buy";




const Details = ({displayText}) => {
  const theme = useTheme();

  const getRowSpacing = React.useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 10,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, [])
  

  
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  
  const itemName = displayText;
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetProductDetailsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
    itemName,
  });
  console.log(data);

  const columns = [
    {
      field: "name",
      headerName: "Products",
      flex: 1,
    },
    {
      field: "brand",
      headerName: "Brand",
      flex: 0.5,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 0.5,

    },
    {
      field: "price",
      headerName: "Prices",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.7,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 30,fontSize: '0.8rem'}}
            onClick={() => window.open(<Buy />)}
          >
            Buy
          </Button>
          <IconButton
            color="primary"
            aria-label="WhatsApp"
            onClick={() => window.open("https://api.whatsapp.com/send/?phone=919818287365&text&type=phone_number&app_absent=0")}
          >
            <WhatsAppIcon sx={{ color: '#25D366', fontSize: 30 }} />
          </IconButton>
        </div>
      )
    },
    
  ]; 

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={displayText} />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
            fontSize:'1.25rem',
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
          '& .MuiDataGrid-row': {
              fontSize: '1rem', 
              
            },
        }}
      >
        <DataGrid
          getRowSpacing={getRowSpacing} 
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.productDetails) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[1,2,3]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Details;