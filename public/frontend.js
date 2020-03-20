var stripe = Stripe('pk_test_ujFBz6I1wsopFEeY1VpAaF5e00WfBEbX7N');
const loginform = document.querySelector("#loginform");
const logoutbutton = document.querySelector(".logout");
const updatebutton = document.querySelector(".user-view__content");
const resetpass = document.querySelector(".resetpass");
const forget = document.querySelector(".forgot");
const signup = document.querySelector(".signed");
const changepass = document.querySelector(".change_pass");
const bookbtn = document.querySelectorAll(".bookPlan");

const login = async (email, password) => {
    // alert("Email : " + email + " & " + "Password : " + password);
    try {
        const data = { email, password };
        const res = await axios.post("/api/user/login", data);
        // console.log(res);
        if (res.data.token != undefined) {
            alert("User Logged In");
            window.setTimeout(() => {
                location.assign("/")
            }, 1000)
        }
        else
            alert(res.data);
    } catch (err) {
        console.log(err);
    }
}
const logout = async () => {
    try {
        const res = await axios.get("/api/user/logout");

        if (res.data.status === "User Logged Out") {
            alert("User Logged Out");
            window.setTimeout(() => {
                location.assign("/");
            }, 1000)
        }
    } catch (err) {
        console.log(err);
    }
}
const update = async (name, role, username, email) => {
    try {
        const data = { name, role, username, email };
        const res = await axios.patch("/api/user/updateuser", data);
        // console.log(res)
        if (res.data.status === "Update is succesful") {
            alert("Update is succesful")
            window.setTimeout(() => {
                location.reload(true);
            }, 1000)
        }
        else {
            alert("Error")
            window.setTimeout(() => {
                location.reload(true);
            }, 1000)
        }
    } catch (err) {
        console.log(err);
    }
}
const reset = async (token, password) => {
    try {
        const data = { token, password };
        const res = await axios.patch("/api/user/resetpassword", data);
        console.log(res)
        if (res.data === "Password changes succesfully") {
            alert("Password changes succesfully")
            window.setTimeout(() => {
                location.assign("/login");
            }, 1000)
        }
        else {
            alert("Error");
        }
    } catch (err) {
        console.log(err);
    }
}
const forgetpass = async (email) => {
    try {
        const data = { email };
        const res = await axios.post("/api/user/forgetpassword", data);
        console.log(res)
        if (res.data === "Token was sent successfully to you email address") {
            alert("Token was sent successfully to you email address")
            window.setTimeout(() => {
                location.assign("/resetpassword");
            }, 1000)
        }
        else {
            alert("Error");
        }
    } catch (err) {
        console.log(err);
    }
}
const sign = async (name, role, username, email, password, confirm_pass) => {
    try {
        const data = { name, role, username, email, password, confirm_pass };
        const res = await axios.post("/api/user/signup", data);
        // console.log(res)
        if (res.data === "You Signedup Successfully") {
            alert("You Signedup Successfully")
            window.setTimeout(() => {
                location.assign("/");
            }, 1000)
        }
        else {
            alert("Error");
        }
    } catch (err) {
        console.log(err);
    }
}
const change = async (oldpass, newpass, confirm_pass) => {
    try {
        const data = { oldpass, newpass, confirm_pass };
        const res = await axios.patch("/api/user/changepass", data);
        console.log(res);
        if (res.data === "Password changes succesfully") {
            alert("Password changes succesfully")
            window.setTimeout(() => {
                location.assign("/");
            }, 1000)
        }
        else {
            alert(res.data);
        }

    } catch (err) {
        console.log(err);
    }

}

const bookPlan = async planId => {
    try{
        const session = await axios(`http://localhost:3000/api/bookings/checkout-session/${planId}`);
        console.log(session);
        await stripe.redirectToCheckout({
            sessionId : session.data.session.id
        });
    } catch(err){
        console.log(err);
    }
};

if (logoutbutton) {
    logoutbutton.addEventListener("click", logout);
}
if (loginform) {
    loginform.addEventListener("submit", e => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        login(email, password);
    })
}
if (updatebutton) {
    updatebutton.addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const role = document.getElementById("role").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        update(name, role, username, email);
    })
}
if (resetpass) {
    resetpass.addEventListener("submit", e => {
        e.preventDefault();
        const token = document.getElementById("token").value;
        const password = document.getElementById("password").value;
        reset(token, password);
    })
}
if (forget) {
    forget.addEventListener("submit", e => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        forgetpass(email);
    })
}
if (signup) {
    signup.addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const role = document.getElementById("role").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirm_pass = document.getElementById("confirm_pass").value;
        sign(name, role, username, email, password, confirm_pass);
    })
}
if (changepass) {
    changepass.addEventListener("submit", e => {
        e.preventDefault();
        const oldpass = document.getElementById("old password").value;
        const newpass = document.getElementById("new password").value;
        const confirm_pass = document.getElementById("confirm_pass").value;

        change(oldpass, newpass, confirm_pass);
    })
}

if(bookbtn){
    // console.log(bookbtn);
    for(let i=0;i<bookbtn.length;i++)
    {
        bookbtn[i].addEventListener("click" , e => {
            let planId = e.target.dataset.planId;
            bookPlan(planId);
        })
    }
}