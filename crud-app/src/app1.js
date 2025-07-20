import logo from "./logo.svg";
import "./App.css";
import StudentList from "./components/StudentList";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [loading,setLoading] = useState(false)
  const [formData, setFomrData] = useState({
    name: "",
    email: "",
    phone: "",
    age: 0,
  });
  const [editId, setEditId] = useState(null);
  const baseURL = "http://localhost:3001"

  const fetchUsers = async () => {
    setLoading(true)
    const res = await axios.get(`${baseURL}/user`);
    setUsers(res.data);
    setLoading(false);
  };
  const handleDelete = async(id) => {
    console.log(id);
    setLoading(true);
   await axios.delete(`${baseURL}/user/${id}`)
   fetchUsers();
   setLoading(false)
  };
  const handleEdit = async(id) => {
    const user = users.find(u => u.id === id)
    setFomrData({
      name:user.name,
      email:user.email,
      phone:user.phone,
      age:user.age
    })
    setEditId(id)
  };

  const handleChange = (e) => {
    const {name,value}  = e.target;
    setFomrData({ ...formData, [name] : name === "age" ? Number(value) : value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData,"formData"); 
    setLoading(true)
  if(editId){
      await axios.put(`${baseURL}/user/${editId}`,formData)
  }else{
      await axios.post(`${baseURL}/user`,formData)
  }
  setFomrData({name:"",email:"",phone:"",age:""})
  fetchUsers();
  setLoading(false)
  setEditId(null)

  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="App">
      {loading && <div>Loading....</div>}
      <h1>Hello</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={formData.name}
            name="name"
            onChange={handleChange}
          />
          <br />
          <input
            placeholder="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
          <br />
          <input
            placeholder="number"
            value={formData.phone}
            name="phone"
            onChange={handleChange}
          />
          <br />
          <input
            placeholder="age"
            value={formData.age}
            name="age"
            onChange={handleChange}
            type="number"
          />
          <br />
          <button disabled={!formData.name || !formData.email || !formData.phone || !formData.age}>Submit</button>
        </form>
      </div>
      {users &&
        users.map((obj) => {
          return (
            <div
              key={obj.id}
              style={{ display: "flex", alignContent: "center" }}
            >
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  border: "2px solid red",
                  padding: "5px",
                  margin: "10px",
                }}
              >
                <h2>{obj.name}</h2>
                <h4>{obj.email}</h4>
                <h3>{obj.phone}</h3>
                <h3>{obj.age}</h3>
                <button onClick={() => handleEdit(obj.id)}>Edit</button>
                <button onClick={() => handleDelete(obj.id)}>Delete</button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
