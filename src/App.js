import "./App.css";
import { useState, useEffect, useRef } from "react";
import Pagination from "./Pagination/Pagination";

import MemberList from "./Component/Table/MemberList";
import axios from "axios";
const baseUrl =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

function App() {
  const [users, setUsers] = useState([]);
  const [upadate, setUpadate] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(users.length / recordsPerPage);
  const selectAllRef = useRef(null);

  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);
  const editUser = (id) => {
    let userTemp = users;
    const index = userTemp.findIndex((item) => item.id === id);
    userTemp[index].edit = true;
    setUsers(userTemp);
    setUpadate((prevState) => !prevState);
    console.log("click");
  };
  const saveUser = (id, nameRef, emailRef, roleRef) => {
    let userTemp = users;
    const index = userTemp.findIndex((item) => item.id === id);
    console.log(index);
    userTemp[index].name = nameRef.current.value;
    userTemp[index].email = emailRef.current.value;
    userTemp[index].role = roleRef.current.value;
    userTemp[index].edit = false;
    setUsers(userTemp);
    setUpadate((prevState) => !prevState);
    console.log("save");
  };
  const deleteUser = (id) => {
    let userTemp = users.filter((item) => item.id !== id);

    setUsers(userTemp);
    setUpadate((prevState) => !prevState);
  };
  const index = (currentPage) => {
    return (currentPage - 1) * 10;
  };
  const selectOne = (id) => {
    let userTemp = users;
    const index = userTemp.findIndex((item) => item.id === id);
    userTemp[index].selected = !userTemp[index].selected;
    setUsers(userTemp);
    setUpadate((prevState) => !prevState);
  };
  const selectAll = (e) => {
    const listUserIds = users
      .filter((item) => item.show)
      .slice(index, index + 10)
      .map((item) => item.id);
    let userTemp = users.map((item) => {
      if (listUserIds.includes(item.id)) {
        item.selected = e.target.checked;
        console.log();
        return users;
      }
      return users;
    });
    setUsers(userTemp);
    setUpadate(!upadate);
  };
  return (
    <div className="App">
      <MemberList
        users={currentRecords}
        editUser={editUser}
        saveUser={saveUser}
        deleteUser={deleteUser}
        selectAll={selectAll}
        selectOne={selectOne}
        selectAllRef={selectAllRef}
      ></MemberList>
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
