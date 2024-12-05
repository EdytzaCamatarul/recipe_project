import { useState, useEffect } from "react"
import axios from "axios";


const Users = () => {
    const [ users, setUsers ] = useState();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8081/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(respnse.data);

            } catch(err) {
                console.error(err);
            }
        }
        getUsers();

        return () => {
            isMounted = false;
            controller.abort();

        }
    }, [])


  return (
    <article>
        <h2>
            Users list
        </h2>
        {users?.lenght
            ? (
                <ul>
                    { users.map((user,i) => <li key = {i} > {user?.username}</li>)}
                </ul>
            ) : <p> no users to display </p>

        }
    </article>
  )
}

export default Users