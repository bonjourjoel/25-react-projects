import { useEffect, useState } from "react";
import "./GithubProfileSolution.css";
import User from "./User";

export default function GithubProfileSolution() {
    const [userName, setUserName] = useState('sangammukherjee')
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchGithubUserData() {
        setLoading(true);
        const res = await fetch(`https://api.github.com/users/${userName}`);
    
        const data = await res.json();
        if (data) {
          setUserData(data);
          setLoading(false);
          setUserName('')
        }
      }
    
      function handleSubmit() {
        fetchGithubUserData()
      }
    
      useEffect(() => {
        fetchGithubUserData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    if (loading) {
        return <div>Loading data. Please wait</div>;
    }

    return (
        <div className="github-profile-container">
            <div className="input-wrapper">
                <input
                    name="search-by-username"
                    type="text"
                    placeholder="Search Github username..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button onClick={handleSubmit}>Search</button>
            </div>
            {
                userData != null ? <User user={userData} />
                : null
            }
        </div>
    )
}