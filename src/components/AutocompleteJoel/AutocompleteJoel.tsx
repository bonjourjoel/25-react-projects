import { useEffect, useMemo, useState } from "react";
import classes from "./AutocompleteJoel.module.css";

type user = {
    id: number;
    firstName: string;
}

export default function AutocompleteJoel() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [firstNamesList, setFirstNamesList] = useState<user[]>([]);
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const response : Response = await fetch("https://dummyjson.com/users");
                const data: any = await response.json();
                setFirstNamesList(data.users.map((jsonUser: any): user => ({
                    id: jsonUser.id,
                    firstName: jsonUser.firstName,
                })));
            } catch (error: any) {
                setErrorMessage(error.message);
            }
        })();
    }, []);

    function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(e.target.value);
    }

    const firstNamesListFiltered : user[] = useMemo(
        () => firstName.length == 0
            ? []
            : firstNamesList.filter(curUser =>
                curUser.firstName.toLowerCase().startsWith(firstName.toLowerCase()) && curUser.firstName.toLowerCase() != firstName.toLowerCase()),
    [firstNamesList, firstName]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setFirstName('');
        alert(`Thank you ${firstName} :)`)
    }

    if (errorMessage) {
        return <div>Error: {errorMessage}</div>
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <span>First name:</span>
            <div className={classes.combo}>
                <div>
                    <input type="text" name="firstName" autoComplete="off" value={firstName} onChange={handleFirstNameChange} />
                </div>
                <div className={classes.itemsContainerRelative}>
                    <div className={classes.itemsContainer}>
                        {firstNamesListFiltered.length > 0 && firstNamesListFiltered.map(curUser => (
                            <div
                                key={curUser.id}
                                className={classes.item}
                                onClick={() => setFirstName(curUser.firstName)}
                            >
                                {curUser.firstName}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <input type="submit" value="submit"/>
                </div>
            </div>
        </form>
    );
}