import User from "./MemberComponent";
import PropTypes from "prop-types";
import { useState, useRef } from "react";
import styles from "./MemberList.module.css";
import { TrashFill, PencilSquare, Safe2Fill } from "react-bootstrap-icons";
// import Search from "../Search/Search";
function MemberList(props) {
  const {
    users,
    editUser,
    saveUser,
    deleteUser,
    selectAll,
    selectOne,
    selectAllRef,
  } = props;
  const roleRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const [filteredResult, setFilteredResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (SearchValue) => {
    setSearchInput(SearchValue);
    if (searchInput !== "") {
      const filteredData = users.filter((item) => {
        return Object.values(item).join("").toLowerCase().includes(searchInput);
      });
      setFilteredResult(filteredData);
    } else {
      setFilteredResult(users);
    }
  };

  return (
    <>
      {/* <Search /> */}

      <input
        className="search"
        type="text"
        placeholder="Search by name, email or role"
        onChange={(e) => searchItems(e.target.value)}
      ></input>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: 20 }}>
              <input
                ref={selectAllRef}
                onChange={(e) => {
                  selectAll(e);
                }}
                type="checkbox"
              ></input>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchInput.length > 1
            ? filteredResult.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <input
                        id={`check-${item.id}`}
                        type="checkbox"
                        data={`${item.selected}`}
                        onChange={() => selectOne(item.id)}
                        checked={item.selected}
                      ></input>
                    </td>
                    <td>
                      <input
                        type="text"
                        ref={nameRef}
                        readOnly={!item.edit}
                        defaultValue={item.name}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        ref={emailRef}
                        readOnly={!item.edit}
                        defaultValue={item.email}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        readOnly={!item.edit}
                        ref={roleRef}
                        defaultValue={item.role}
                      />
                    </td>
                    <td>
                      {item.edit ? (
                        <Safe2Fill
                          className="bi bi-save2-fill"
                          onClick={() =>
                            saveUser(item.id, nameRef, emailRef, roleRef)
                          }
                        />
                      ) : (
                        <PencilSquare
                          className="bi bi-pencil-square"
                          onClick={() => editUser(item.id)}
                        />
                      )}
                      <TrashFill
                        onClick={() => deleteUser(item.id)}
                        className="bi bi-trash-fill"
                      />
                    </td>
                  </tr>
                );
              })
            : users.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <input type="checkbox"></input>
                    </td>
                    <td>
                      <input
                        type="text"
                        readOnly={!item.edit}
                        defaultValue={item.name}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        readOnly={!item.edit}
                        defaultValue={item.email}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        readOnly={!item.edit}
                        defaultValue={item.role}
                      />
                    </td>
                    <td>
                      {item.edit ? (
                        <Safe2Fill
                          className="bi bi-save2-fill"
                          onClick={() =>
                            saveUser(item.id, nameRef, emailRef, roleRef)
                          }
                        />
                      ) : (
                        <PencilSquare
                          className="bi bi-pencil-square"
                          onClick={() => editUser(item.id)}
                        />
                      )}

                      <TrashFill
                        onClick={() => deleteUser(item.id)}
                        className="bi bi-trash-fill"
                      />
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </>
  );
}
MemberList.protoType = {
  users: PropTypes.object,
  editUser: PropTypes.func,
  saveUser: PropTypes.func,
};
export default MemberList;
