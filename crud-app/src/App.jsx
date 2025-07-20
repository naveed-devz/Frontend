import logo from "./logo.svg";
import "./App.css";
import StudentList from "./components/StudentList";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFomrData] = useState({
    name: "",
    email: "",
    phone: "",
    age: 0,
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const baseURL = "http://localhost:3001";

  const fetchUsers = async () => {
    const res = await axios.get(`${baseURL}/user`);
    setUsers(res.data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFomrData({
      ...formData,
      [name]:name === "age" ? Number(value):value
    })
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(editId){
      console.log(editId, "editId");
      await axios.put(`${baseURL}/user/${editId}`, formData)
    }else{
      await axios.post(`${baseURL}/user`,formData)
    }
    setFomrData({name:"",email:"",phone:"",age:""})
  };

  const handleEdit = (id) =>{
    const user = users.find(u => u.id === id)
    setFomrData({
      name:user.name,
      email:user.email,
      phone:user.phone,
      age:user.age
    })
    setEditId(id);
  }
  const handleDelete = async(id) =>{
    await axios.delete(`${baseURL}/user/${id}`)
    fetchUsers();
  }
  return (
    <div className="App" style={{display:"flex", alignContent:"center", justifyContent:"center"}}>
      <div style={{display:"flex", alignContent:"center", alignItems:"center"}}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            value={formData.name}
            name="name"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="phone"
            value={formData.phone}
            name="phone"
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            placeholder="age"
            value={formData.age}
            name="age"
            onChange={handleChange}
          />
          <br />
          <button disabled={!formData.name || !formData.email || !formData.phone || !formData.age}>Submit</button>
        </form>
      </div>
      {users &&
        users.map((obj) => {
          return (
            <div key={obj.id} style={{display:"flex", alignContent:"center", padding:"10px", margin:"5px", border:"2px solid red", flexDirection:'column'}}>
              <h3>{obj.name}</h3>
              <h3>{obj.email}</h3>
              <h3>{obj.phone}</h3>
              <h3>{obj.age}</h3>
              <button onClick={()=>handleEdit(obj.id)}>Edit</button>
              <button onClick={()=>handleDelete(obj.id)}>Delete</button>
            </div>
          );
        })}
    </div>
  );
}

export default App;
