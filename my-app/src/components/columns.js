export const COLUMNS = [
    
    {
        Header: "ID",
        accessor: "player_id"
    },
    {
        Header: "Name",
        accessor: row => `${row.first_name} ${row.last_name}`
    },
    {
        Header: "Rating",
        accessor: "stars"
    },
    {
        Header: "Position",
        accessor: "player_position"
    },
    {
        Header: "Grad year",
        accessor: "grad_year"
    },
    {
        Header: "State",
        accessor: "state"
    },
    {
        Header: "GPA",
        accessor: "gpa"
    },
    {
        Header: "Last game",
        accessor: "last_game"
    },
    
]