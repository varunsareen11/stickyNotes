import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./style.css";
const API = "http://54.87.14.216/api";

function SingleUser(props) {
  const getParam = useParams();
  const navigate = useNavigate();
  const profileRef = useRef();
  const [userinfo, setUserInfo] = useState([]);
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState("");
  const [accountDeleteMsg, setAccountDeleteMsg] = useState("");
  const [isActivate, setIsActivate] = useState([]);
  const [activationMsg, setActivationMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getToken = JSON.parse(localStorage.getItem("user-info"));
  const token = getToken?.token;
  const [age, setAge] = React.useState("");
  const [profile, setProfile] = useState("");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleProfileChange = (event) => {
    setProfile(event.target.files[0]);
  };
  const [updateUser, setUpdateUser] = useState({
    email: "",
    password: "",
    company_name: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    street: "",
    house_number: "",
    postal_code: "",
    city: "",
    land: "",
    sales_tax_id: "",
  });
  useEffect(() => {
    getUserInfo();
    setTimeout(() => {
      if (userinfo.status === true) {
        setAge("active");
      } else if (userinfo.status === false) {
        setAge("deactive");
      } else {
        setAge("");
      }
    }, 1000);
  }, []);
  const {
    _id,
    first_name,
    last_name,
    email,
    company_name,
    phone_number,
    street,
    house_number,
    postal_code,
    city,
    land,
    sales_tax_id,
  } = userinfo;
  const getUserInfo = (data) => {
    setLoading(true);
    return fetch(`${API}/get-user-detail/${getParam._id}`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("user info", json);
        setUserInfo(json);
        setUpdateUser(json);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const userActivate = (data) => {
    return fetch(`${API}/user-active/${getParam._id}`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        setIsActivate(json);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const userDeActivate = (data) => {
    return fetch(`${API}/user-deactive/${getParam._id}`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        setIsActivate(json);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Delete TaskBar using API
  async function handledeleteUser(id) {
    let result = await fetch(`${API}/user-delete/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    setAccountDeleteMsg("Account Deleted");
    handleClose();
    setTimeout(() => {
      navigate("/user");
    }, 3000);
  }
  const updateProfleChange = (e) => {
    console.log("onchange Working");
    const name = e.target.name;
    const value = e.target.value;
    setUpdateUser({ ...updateUser, [name]: value });
  };
  const submitUpdateUser = (event) => {
    event.preventDefault();
    setUserInfo(updateUser);
    setUpdateSuccessMessage("Update Successfully");
    setTimeout(() => {
      setUpdateSuccessMessage("");
    }, 2000);
  };
  const profileDeactive = () => {
    userDeActivate();
    getUserInfo();
  };
  const profileActive = () => {
    userActivate();
    getUserInfo();
  };
  return (
    <div className="main-body">
      {userinfo ? (
        <div>
          <div className="headingCard">
            <h2 className="dasshboard_heading">User Profile</h2>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>In Progress</em>
                </MenuItem>
                <MenuItem value={"active"} onClick={profileActive}>
                  Active
                </MenuItem>
                <MenuItem value={"deactive"} onClick={profileDeactive}>
                  Deactive
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="card profileInfoCard">
            {userinfo.profile ? (
              <div
                className="userImage"
                onClick={() => profileRef.current.click()}
              >
                <img src={userinfo.profile} alt="" />
              </div>
            ) : (
              <div
                className="userImage"
                onClick={() => profileRef.current.click()}
              >
                <input
                  ref={profileRef}
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleProfileChange}
                />
                {profile ? (
                  <img
                    src={URL.createObjectURL(profile)}
                    alt=""
                    width={190}
                    height={190}
                  />
                ) : (
                  <img src="/assets/images/userimg.png" alt="" />
                )}
              </div>
            )}

            <div className="userInfoCard">
              <h3 className="userName">
                {first_name} {last_name}
              </h3>
              <div className="userGereralInfo">
                <p>
                  {company_name ? (
                    <>
                      <svg className="icon" aria-labelledby="User Card">
                        <title id="userCard">User Card</title>
                        <use
                          xlinkHref="/assets/svg-icons/icons.svg#userCard"
                          xlinkTitle="User Card"
                        ></use>
                      </svg>
                      {company_name}
                    </>
                  ) : (
                    ""
                  )}
                </p>
                <p>
                  {city ? (
                    <>
                      <svg className="icon" aria-labelledby="User Location">
                        <title id="userLocation">User Location</title>
                        <use
                          xlinkHref="/assets/svg-icons/icons.svg#userLocation"
                          xlinkTitle="User Location"
                        ></use>
                      </svg>
                      {land}, {city}
                    </>
                  ) : (
                    ""
                  )}
                </p>
              </div>
              <p>
                {phone_number ? (
                  <>
                    <svg className="icon" aria-labelledby="User Phone">
                      <title id="userPhone">User Phone</title>
                      <use
                        xlinkHref="/assets/svg-icons/icons.svg#userPhone"
                        xlinkTitle="User Phone"
                      ></use>
                    </svg>
                    Phone: <strong>{phone_number}</strong>
                  </>
                ) : (
                  ""
                )}
              </p>
              <p>
                {email ? (
                  <>
                    <svg className="icon" aria-labelledby="User Email">
                      <title id="userEmail">User Email</title>
                      <use
                        xlinkHref="/assets/svg-icons/icons.svg#userEmail"
                        xlinkTitle="User Email"
                      ></use>
                    </svg>
                    Email: <strong>{email}</strong>
                  </>
                ) : (
                  ""
                )}
              </p>
            </div>
            <div className="userinfoButtons">
              <div className="lockuser">
                <div className="ctm-checkbox">
                  <label className="ctm-checkbox-container">
                    Sperren
                    <input type="checkbox" />
                    <span className="ctm-checkbox-checkmark"></span>
                  </label>
                </div>
              </div>
              <Button className="btn cmn_red_bg" onClick={handleOpen}>
                loschen
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style} className="confirmation_model">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Sicher loschen
                  </Typography>
                  <div className="btn-group">
                    <Button
                      className="btn cmn_yellow_bg"
                      onClick={() => handledeleteUser(_id)}
                    >
                      ja
                    </Button>
                    <Button className="btn cmn_red_bg" onClick={handleClose}>
                      nein
                    </Button>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
          <div className="card">
            <div className="profileUpdate">
              <form>
                <div className="form-group">
                  <label htmlFor="first_name">Vorname </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="form-control"
                    value={updateUser.first_name}
                    onChange={(e) => updateProfleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">Nachname </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="form-control"
                    value={updateUser.last_name}
                    onChange={(e) => updateProfleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-Mail Adresse</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    value={updateUser.email}
                    onChange={(e) => updateProfleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company_name">Firmenname </label>
                  <input
                    type="text"
                    name="company_name"
                    id="company_name"
                    className="form-control"
                    value={updateUser.company_name}
                    onChange={(e) => updateProfleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone_number">Telefon </label>
                  <input
                    type="number"
                    name="phone_number"
                    id="phone_number"
                    className="form-control"
                    value={updateUser.phone_number}
                    onChange={(e) => updateProfleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="street">Straße </label>
                  <input
                    type="text"
                    name="street"
                    id="street"
                    className="form-control"
                    value={updateUser.street}
                    onChange={(e) => updateProfleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="house_number">Hausnummer</label>
                  <input
                    type="number"
                    name="house_number"
                    id="house_number"
                    className="form-control"
                    value={updateUser.house_number}
                    onChange={(e) => updateProfleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postal_code">Postleitzahl</label>
                  <input
                    type="number"
                    name="postal_code"
                    id="postal_code"
                    className="form-control"
                    value={updateUser.postal_code}
                    onChange={(e) => updateProfleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">Ort </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="form-control"
                    value={updateUser.city}
                    onChange={(e) => updateProfleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="land">Land </label>
                  <input
                    type="text"
                    name="land"
                    id="land"
                    className="form-control"
                    value={updateUser.land}
                    onChange={(e) => updateProfleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sales_tax_id">Umsatzsteuer ID</label>
                  <input
                    type="number"
                    name="sales_tax_id"
                    id="sales_tax_id"
                    className="form-control"
                    value={updateUser.sales_tax_id}
                    onChange={(e) => updateProfleChange(e)}
                  />
                </div>
                <div className="submit-btn">
                  <button
                    type="submit"
                    className="btn cmn_yellow_bg"
                    onClick={(e) => submitUpdateUser(e)}
                  >
                    Update
                  </button>
                </div>
              </form>
              {updateSuccessMessage && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="success">
                    {updateSuccessMessage} — check it out!
                  </Alert>
                </Stack>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="accountDelete">{accountDeleteMsg}</div>
        </>
      )}
    </div>
  );
}

export default SingleUser;
