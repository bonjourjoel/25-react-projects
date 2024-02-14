import { useState } from "react";
import classes from "./GithubProfileJoel.module.css";

export default function GithubProfileJoel() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUserName] = useState('bonjourjoel');
    const [profile, setProfile] = useState<any>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            setErrorMessage(null);
            setIsLoading(true)
            const response : Response = await fetch(`https://api.github.com/users/${username}`);
            const json = await response.json();
            if (response.status != 200) {
                setErrorMessage(json.message);
            } else {
                setProfile(json);
            }
        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    } 

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
                <input type="submit" value="Search" disabled={!username} />
            </form>
            {isLoading && <div>Loading...</div>}
            {errorMessage && <div className={classes.error}>Error: {errorMessage}</div>}
            {!errorMessage && profile && (
                <div className={classes.profileContainer}>
                    <img className={classes.profilePicture} src={profile.avatar_url} alt={username} />
                    <a target="_blank" href={profile.html_url}>{profile.name || username}</a>
                    <p>User joined on: {new Date(profile.created_at).toDateString()}</p>
                    <p>Public repos: {profile.public_repos}</p>
                    <p>Followers: {profile.followers}</p>
                    <p>Following: {profile.following}</p>
                </div>
            )}
        </div>
    )
}