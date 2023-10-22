import { db } from "../dbconfig";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'; // Importing uuidv4 to generate UUIDs
import { auth } from "../firebase";
import Navbar from "./Navbar";
// import ResetPW from "./ResetPW"; 
import DeleteAccount from "./Delete";

function Settings() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  //const [consoleMessage, //////setConsoleMessage] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
  }, []);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setTodos(Object.values(data));
        const userTodo = Object.values(data).find((item) => item.email === userEmail);
        if (userTodo) {
          setUsername(userTodo.username);
        }
      }
    });
  }, [userEmail]);

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
    const userTodo = todos.find((item) => item.email === userEmail);
    if (userTodo) {
      update(ref(db), {
        [userTodo.uuid]: { ...userTodo, username: e.target.value },
      })
        .then(() => {
          setUsername(e.target.value);
        })
        .catch((error) => {
          //////setConsoleMessage("Error updating username: " + error);
        });
    }
  };
 

  const writeUsernameToDatabase = () => {
    if (!isEdit) {
      // Logic for when not in edit mode
      const duplicateUser = todos.find((item) => item.username === todo);
      const duplicateEmail = todos.find((item) => item.email === userEmail);
  
      if (duplicateUser && duplicateEmail) {
        //////setConsoleMessage("Duplicate username and email found!");
        return;
      } else if (duplicateEmail && !duplicateUser) {
        const userTodo = todos.find((item) => item.email === userEmail);
        update(ref(db), {
          [userTodo.uuid]: { ...userTodo, username: todo },
        })
          .then(() => {
            setUsername(todo);
            setIsEdit(false);
          })
          .catch((error) => {
            //////setConsoleMessage("Error updating username: " + error);
          });
      } else if (!duplicateEmail && !duplicateUser) {
        const newUuid = uuidv4(); // Generating a new UUID
        set(ref(db), {
          [newUuid]: { username: todo, email: userEmail, uuid: newUuid },
        })
          .then(() => {
            setUsername(todo);
            setIsEdit(false);
          })
          .catch((error) => {
            ////setConsoleMessage("Error adding new username: " + error);
          });
      } else if (duplicateUser && !duplicateEmail) {
        ////setConsoleMessage("Assigned to another e-mail address.");
      }
    } else {
      // Logic for when in edit mode
      setIsEdit(false); 
    }
  };
  


 const handleDelete = () => {
  const userTodo = todos.find((item) => item.email === userEmail);
  if (userTodo) {
    remove(ref(db, userTodo.uuid))
      .then(() => {
        ////setConsoleMessage("Entry successfully removed from the database.");
        setUsername("");
        setIsEdit(true);
        setTodo(""); // Reset the todo state to an empty string
      })
      .catch((error) => {
        //////setConsoleMessage("Error removing entry from the database: " + error);
      });
  }
};

    return (
        <>
          <h1>
            <Navbar />
          </h1>
          <div className="settings" align="center">
            <h1 align="center">User Settings</h1>
            {!isEdit && username && userEmail ? (
              <div>
                <p>
                  Leetcode Username: {username} <br></br><button onClick={() => setIsEdit(true)}>Edit</button>
                  <button onClick={handleDelete}>Delete</button>
                </p>
              </div>
            ) : (
              <div>
                <p align="center">
                  Enter Leetcode Username here: <input type="text" value={todo} onChange={handleTodoChange} />{" "}
                  <br></br><button onClick={writeUsernameToDatabase}>Submit</button>
                 <button onClick={() => setIsEdit(false)}>Cancel</button>
                </p>
              </div>
            )}
          </div>
          {/* <ResetPW></ResetPW> */}
          <DeleteAccount></DeleteAccount>
        </>
      );
  };

  export default Settings; 