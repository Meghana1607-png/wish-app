// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const { createClient } = require("@supabase/supabase-js");

// const app = express();
// const PORT = 3000;

// app.use(cors({}));
// app.use(bodyParser.json());

// const supabase = createClient(
//   "https://esuzqpwibfnycwmeirtg.supabase.co",
//   "your-supabase-api-key"
// );

// // Existing signup route
// app.post("/signup", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   try {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (error) {
//       console.error("Supabase error:", error);
//       throw error;
//     }

//     res.status(200).json({
//       message: "Account created successfully!",
//       data,
//     });
//   } catch (error) {
//     console.error("Error during signup:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Updated Sign-In Route for Organization
// app.post("/orgSignIn", async (req, res) => {
//   console.log("Request Body:", req.body);

//   const { email, password } = req.body;

//   try {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       console.error("Sign in failed:", error);
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     res.status(200).json({ message: "Welcome!", data });
//   } catch (error) {
//     console.error("Sign in error:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Other existing routes...

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = 3000;

app.use(cors({}));
app.use(bodyParser.json());

const supabase = createClient(
  "https://esuzqpwibfnycwmeirtg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdXpxcHdpYmZueWN3bWVpcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjA1MTQsImV4cCI6MjA1MDUzNjUxNH0.FUL9viBXkN2Q44hhdFKPj8uKBT0SkJqcSfbjPV2oExc"
);

// app.post("/signup", async (req, res) => {
// const { email, password } = req.body;
// console.log("Received email:", email);
// console.log("Received password:", password);

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }
// Sign-Up Route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log("Received email:", email);
  console.log("Received password:", password);
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    res.status(200).json({
      message: "Account created successfully!",
      data,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: error.message });
  }
});

// Sign-In Route
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log("received email:", email);
  console.log("received password:", password);
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    res.status(200).json({ message: "Welcome!", data });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: error.message });
  }
});
app.post("/donorforminsert", async (req, res) => {
  console.log("request body", req.body);

  const {
    gender,
    ph_no,
    address,
    name,
    email,
    bloodgroup,
    health_issues,
    last_donated,
  } = req.body;

  try {
    console.log("xcvbnm", name);

    const { data, error } = await supabase.from("donors").insert({
      // gender: gender,
      // ph_no: ph_no,
      // bloodgroup: bloodgroup,
      health_issues: health_issues,
      last_donated: last_donated,
      // address: address,
      // name: name,
      // email: email,
      bloodgroup: bloodgroup,
    });

    if (error) {
      console.log("supabase error", error.message);
      throw error;
    } else {
      res.status(200).json({
        message: "donorform submitted ",
        data,
      });
    }
  } catch (error) {
    console.error("error during donor form submission", error);
    res.status(500).json({ message: error.message });
  }
});
app.post("/profileinsert", async (req, res) => {
  console.log("request body", req.body);
  const { age, phone, address, name, email } = req.body.profile;
  try {
    console.log("njmknfkj", name);
    const { data, error } = await supabase.from("users").insert({
      age: age,
      name: name,
      email: email,
      phno: phone,
      address: address,
    });
    if (error) {
      console.log("supabase error", error.message);
      throw error;
    } else {
      res.sendStatus(200).json({
        message: "profile submitted",
        data,
      });
    }
  } catch (error) {
    console.error("eroor during profile submission ", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/receiverforminsert", async (req, res) => {
  console.log("request body", req.body);

  const {
    gender,
    ph_no,
    name,
    location,
    blood_quantity,
    date,
    purpose,
    email,
    blood_group,
    health_issues,
    last_donated,
    emergency,
  } = req.body;
  console.log("body", req.body);
  try {
    console.log("xcvbnm", name);
    const { data, error } = await supabase.from("receivers").insert({
      purpose: purpose,
      blood_group: blood_group,
      date: date,
      emergency: emergency,
    });
    if (error) {
      console.log("supabase error", error.message);
      throw error;
    } else {
      res.status(200).json({
        message: "receiverform submitted ",
        data,
      });
    }
  } catch (error) {
    console.error("error during receiver form submission", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/orgSignIn", async (req, res) => {
  console.log("Request Body:", req.body);

  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data.user) {
      console.log("sign in successfully");
      res.send({ data: data });
    } else {
      console.log("sign in failed");
      res.send({ error: error });
    }
  } catch (error) {
    console.error("sign in failed", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/orgforminsert", async (req, res) => {
  console.log("Request Body:", req.body);

  const { orgName, email, phone, bloodGroups, address, password } = req.body;

  if (
    !orgName ||
    !email ||
    !phone ||
    !bloodGroups ||
    !address ||
    bloodGroups.length === 0
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const blood_group = bloodGroups[0]?.bloodGroup;
    const blood_quantity = bloodGroups[0]?.quantity;

    console.log("Inserting data into orgnization table:", {
      orgName,
      email,
      phone,
      blood_group,
      blood_quantity,
      address,
      password,
    });

    const data1 = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    console.log("data 1:", data1);

    if (data1.error) {
      console.error("Error during sign in:", data1.error);
      return res.send({ error: "user already exists with this email" });
    } else {
      const { data, error } = await supabase.from("organization").insert([
        {
          name: orgName,
          email: email,
          phone: phone,
          blood_group: bloodGroups[0]?.bloodGroup,
          blood_quantity: bloodGroups[0]?.quantity,
          address: address,
        },
      ]);

      if (error) {
        console.error("Supabase Error Details:", error);
        throw new Error(error.message || "Unknown Supabase Error");
      }

      res.status(200).json({
        message: "Organization submitted successfully",
        data1,
      });
    }
  } catch (error) {
    console.error("Error during organization form submission:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error: " + error.message });
  }
});

app.post("/userforminsert", async (req, res) => {
  console.log("API called with body:", req.body);

  const {
    gender,
    phno,
    name,
    address,
    blood_quantity,
    password,
    date,
    purpose,
    email,
  } = req.body;
  try {
    console.log("Inserting into Supabase...");
    const { data, error } = await supabase.from("users").insert({
      gender,
      phno,
      name,
      address,
      date,
      purpose,
      email,
      password,
    });

    if (error) {
      console.error("Supabase Error:", error.message);
      throw error;
    }

    console.log("Data inserted successfully:", data);
    res.status(200).json({ message: "User form submitted", data });
  } catch (error) {
    console.error("Error during insertion:", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/orgformfetch", async (req, res) => {
  const { orgId } = req.body;

  try {
    const { data, error } = await supabase
      .from("organization")
      .select("*")
      .eq("id", orgId);
    console.log(data);

    if (error) {
      console.error("Error fetching organization:", error.message);
      return res.status(400).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json(data[0]);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
