import { useEffect, useState } from "react";
import "./AutocompleteSolution.css";
import Suggestions from "./Suggestions";

export default function AutocompleteSolution() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [users, setUsers] = useState([]);
    const [searchParam, setSearchParam] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);

    async function fetchListOfUsers() {
        try {
             const response = await fetch("https://dummyjson.com/users");
             const data = await response.json();
             if (data && data.users && data.users.length > 0) {
                setUsers(data.users.map(userItem => userItem.firstName));
                setLoading(false);
                setError(null);
             }
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    } 

    useEffect(() => {
        fetchListOfUsers();
    }, []);

    function handleChange(event) {
        const query = event.target.value.toLowerCase();
        setSearchParam(query);
        if (query.length > 0) {
            const filteredData = users && users.length
                ? users.filter(items => items.toLowerCase().indexOf(query) > -1)
                : [];
            setFilteredUsers(filteredData);
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    }

    function handleClick(event) {
        setShowDropdown(false);
        setSearchParam(event.target.innerText);
        setFilteredUsers([]);
    }

    return (
        <div className="search-autocomplete-container">
            {
                loading ? <h1>Loading data. Please wait</h1> :
                <input
                    name="search-users"
                    placeholder="Search users here..."
                    value={searchParam}
                    onChange={handleChange}
                />
            }
            {
                showDropdown && <Suggestions onClick={handleClick} data={filteredUsers}/>
            }
        </div>
    );
}