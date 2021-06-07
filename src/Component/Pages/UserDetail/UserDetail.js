import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";

const UserDetail = () => {
  const [userData, setUserData] = useState([]);
  const [pageSize, setPageSize] = useState([]);
  const [sortModel, setSortModel] = useState([]);
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const api = "http://jsonplaceholder.typicode.com/users";
  //   const searchApi = `http://jsonplaceholder.typicode.com/users?q=${search}`;
  //    fetch(searchApi)
  //      .then((res) => res.json())
  //      .then((data) => setUserData(data));
  // }, [search])
  
  useEffect(() => {
    // getting data from session storage
    setPageSize(getSessionStorageOrDefault("pageSize", 3));
    setSortModel(getSessionStorageOrDefault("sortBy", [
      { field: "name", sort: "asc" },
    ]))
  }, []);
  
  function getSessionStorageOrDefault(key, defaultValue) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
      return defaultValue;
    }
    return JSON.parse(stored);
  }

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 240,
      renderCell: (params) => (
        <a href={`/profilePage/${params.id}`}>{params.value}</a>
      ),
    },
    { field: "email", headerName: "Email", width: 300 },
    { field: "website", headerName: "Website", width: 250 },
  ];
    
  const handlePageSizeChange = (params) => {
     if (params.pageSize !== sortModel) {
       Number.isNaN(params.pageSize)
         ? setPageSize(userData.length)
         : setPageSize(params.pageSize);
       sessionStorage.setItem("pageSize", params.pageSize);
     }
  };

  const handleSortModelChange = (params) => {
    if (params.sortModel !== sortModel) {
      setSortModel(params.sortModel);
      sessionStorage.setItem("sortBy", JSON.stringify(params.sortModel));
    }
  };

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);

      await  fetch(`http://jsonplaceholder.typicode.com/users?q=${search}`)
       .then((res) => res.json())
       .then((data) => setUserData(data));;

      if (!active) {
        return;
      }
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [search]);

    return (
      <div style={{ width: "100%", marginTop: "50px" }}>
        <div class="input-group flex-nowrap">
          <input
            type="text"
            class="form-control"
            placeholder="Search by name, email or website..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <DataGrid
          rows={userData}
          columns={columns}
          pageSize={pageSize}
          autoHeight={true}
          pagination={"pagination"}
          onPageSizeChange={handlePageSizeChange}
          rowsPerPageOptions={[3, 5, "All"]}
          sortingOrder={["desc", "asc"]}
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
          loading={loading}
        />
      </div>
    );
};

export default UserDetail;