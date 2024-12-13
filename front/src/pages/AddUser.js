import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        company: "",
        username: "",
        email: "",
        address: "",
        zip: "",
        state: "",
        country: "",
        phone: "",
        photo: "",
    });

    const handleChange = (name) => (e) => {
        const value = name === "photo"?e.target.file[0]:e.target.value;
        setData({...data, [name]: value});
    }

    const handleSumbit = async () => {
        try {
            let formData = new FormData
            formData.append("photo", data.photo);
            formData.append("name", data.name);
            formData.append("company", data.company);
            formData.append("username", data.username);
            formData.append("email", data.email);
            formData.append("address", data.address);
            formData.append("zip", data.zip);
            formData.append("state", data.state);
            formData.append("country", data.country);
            formData.append("phone", data.phone);

            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {method:"POST", body:FormData,});
            if(res.ok) {
                setData({name: "", photo: "", company: "", username: "", email: "", address: "", zip: "", state: "", country: "", phone: "",});
                navigate("/", {replace: true});
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <div style={{maxWidth:500, margin:"auto"}}>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter Your Name" onChange={handleChange("name")} type="text" name="name" value={data.name}/>
            </div>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter Your Company" onChange={handleChange("company")} type="text" name="company" value={data.company}/>
            </div>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter Your Username" onChange={handleChange("username")} type="text" name="username" value={data.username}/>
            </div>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter Your Email" onChange={handleChange("email")} type="email" name="email" value={data.email}/>
            </div>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter Your Address" onChange={handleChange("address")} type="text" name="address" value={data.address}/>
            </div>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter Your Zip" onChange={handleChange("zip")} type="text" name="zip" value={data.zip}/>
            </div>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter Your State" onChange={handleChange("state")} type="text" name="state" value={data.state}/>
            </div>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter Your Country" onChange={handleChange("country")} type="text" name="country" value={data.country}/>
            </div>
            <div className="mb-3">
                <input className="form-control" placeholder="Enter Your Phone" onChange={handleChange("country")} type="text" name="phone" value={data.phone}/>
            </div>
            <div className="mb-3">
                <input className="form-control" type="file" name="photo" accept="photo/*"/>
            </div>
            <div className="mb-3">
                <button className="btn btn-outline-secondary" onClick={handleSumbit}>Submit</button>
            </div>
        </div>
    );
};

export default AddUser();