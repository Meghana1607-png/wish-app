const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.use(cors({}));
app.use(bodyParser.json());

// Specify the view engine
app.set("view engine", "ejs");

// Specify the views directory
app.set("views", "./views");

const supabase = createClient(
  "https://esuzqpwibfnycwmeirtg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdXpxcHdpYmZueWN3bWVpcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjA1MTQsImV4cCI6MjA1MDUzNjUxNH0.FUL9viBXkN2Q44hhdFKPj8uKBT0SkJqcSfbjPV2oExc"
);

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

function sendingMail(
  organisation,
  donorReceiverEmail,
  donorReceiverId,
  message,
  subject
) {
  console.log("emain", organisation);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: organisation.email,
      pass: organisation.password,
    },
  });

  const mailOptions = {
    from: `"${organisation.email}"`,
    to: donorReceiverEmail,
    subject: `${subject}.Here is the reason...
    ${message}`,
    text: `Please provide feedback to our organisation: http://localhost:3000/org/giveFeedback/${donorReceiverId}?orgId=${organisation.id}&donorReceiverEmail=${donorReceiverEmail}`,
  };

  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent successfully!");
      }
    });
  } catch (error) {
    console.log("Error sending email:", error);
  }
}

app.post("/donorforminsert", async (req, res) => {
  console.log("Received request body:", req.body);
  const { Name, Age, BloodGroup, HealthIssues } = req.body;

  if (!Name || !Age || !BloodGroup || !HealthIssues) {
    console.log("Missing fields:", { Name, Age, BloodGroup, HealthIssues });
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    console.log("Submitting donor form for:", Name);

    const { data, error } = await supabase.from("donors").insert([
      {
        Name,
        Age,
        BloodGroup,
        HealthIssues,
      },
    ]);
    if (error) {
      console.error("Supabase Insert Error:", error);
      return res.status(500).json({ message: error.message });
    }

    res.status(200).json({ message: "Donor form submitted", data });
  } catch (error) {
    console.error("Unexpected Error during donor form submission:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/receiverforminsert", async (req, res) => {
  console.log(" Received Request Body:", req.body);

  if (!req.body || Object.keys(req.body).length === 0) {
    console.log(" req.body is EMPTY!");
    return res.status(400).json({ message: "No data received" });
  }

  const { date, purpose, blood_group, blood_quatity, emergency } = req.body;

  if (!date || !purpose || !blood_group || !blood_quatity || !emergency) {
    console.log(" Missing fields:", {
      date,
      purpose,
      blood_group,
      blood_quatity,
      emergency,
    });
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const { data, error } = await supabase.from("receivers").insert([
      {
        purpose,
        blood_group: blood_group,
        blood_quatity: blood_quatity,
        date: date,
        emergency: emergency,
      },
    ]);

    if (error) throw error;

    res.status(200).json({ message: "Receiver form submitted", data });
  } catch (error) {
    console.error(" Supabase Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/org/requestDonor/:id", async (req, res) => {
  console.log("request body in donor request", req.body);
  const { message, data } = req.body;
  console.log("data in requestDonor", req.body);
  try {
    const { data1, error } = await supabase.from("org_request").insert([
      {
        email: data.email,
        org_id: data.org_id,
        status: data.status,
        donor_id: data.donor_id,
        message: message,
      },
    ]);
    if (error) {
      console.log("supabase error", error.message);
      throw error;
    } else {
      console.log("req.body.organisation", req.body.organistaion);
      sendingMail(
        req.body.organistaion,
        req.body.donorEmail,
        req.body.data.donor_id,
        message,
        "We request you to donate blood"
      );
      res.status(200).json({
        message: "request submitted successfully",
        data1,
      });
    }
  } catch (error) {
    console.error("error during submission of request to donor", error);
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

app.post("/orgSignUp", async (req, res) => {
  console.log("Request Body:", req.body);

  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (data.user) {
      console.log("sign up successfully");
      res.send({ data: data });
    } else {
      console.log("sign up failed");
      res.send({ error: error });
    }
  } catch (error) {
    console.error("sign up failed", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/orgforminsert", async (req, res) => {
  console.log("Request Body:", req.body);

  const { orgName, email, phone, bloodGroups, address, password, userId } =
    req.body;

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
    const bloodGroupsJson = JSON.stringify(bloodGroups);

    console.log("Inserting data into orgnization table:", {
      orgName,
      email,
      phone,
      bloodGroupsJson,
      address,
      password,
      userId,
    });

    const { data, error } = await supabase.from("organization").insert([
      {
        name: orgName,
        email: email,
        phone: phone,
        blood_groups: bloodGroupsJson,
        address: address,
        userId: userId,
        password: password,
      },
    ]);

    console.log("data afetrghfh ", data);
    console.log("data error ", error);

    if (error) {
      console.error("Supabase Error Details:", error);
      throw new Error(error.message || "Unknown Supabase Error");
    }

    res.status(200).json({
      message: "Organization submitted successfully",
      data,
    });
  } catch (error) {
    console.error("Error during sign in:", data.error);
    console.error("Error during organization form submission:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error: " + error.message });
  }
});

app.post("/userforminsert", async (req, res) => {
  console.log("API called with body:", JSON.stringify(req.body, null, 2));

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    const { userid, name, email, phno, address, gender } = req.body;

    if (!userid) {
      console.error(" User ID is missing in request body:", req.body);
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if the user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("userid")
      .eq("userid", userid);

    if (fetchError) {
      console.error("Error checking user existence:", fetchError);
      return res
        .status(500)
        .json({ message: "Database error", error: fetchError });
    }

    if (!existingUser || existingUser.length === 0) {
      // User does not exist, insert them
      console.log("User does not exist, inserting into Supabase...");
      const { data: insertData, error: insertError } = await supabase
        .from("users")
        .insert([{ userid, name, email, phno, address, gender }])
        .select();

      if (insertError) {
        console.error("Supabase Insert Error:", insertError);
        return res
          .status(500)
          .json({ message: "Failed to insert user", error: insertError });
      }

      console.log("User inserted successfully:", insertData);
      return res
        .status(201)
        .json({ message: "User inserted successfully", data: insertData });
    }

    // If user exists, update their data
    console.log("User exists, updating details...");
    const { data, error } = await supabase
      .from("users")
      .update({ name, email, phno, address, gender })
      .eq("userid", userid)
      .select();
    if (error) {
      console.error(" Supabase Update Error:", error.message, error);
      return res.status(500).json({ message: "Database error", error });
    }

    return res.status(200).json({ message: "User updated successfully", data });
  } catch (error) {
    console.error(" Error during insertion:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

app.get("/org/receivers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id in all receivers - ", id);
    const { data, error } = await supabase
      .from("request")
      .select("*")
      .eq("org_id", id);

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/org/receivers/approved/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id in approved receivers - ", id);
    const { data, error } = await supabase
      .from("request")
      .select("*")
      .eq("org_id", id)
      .eq("status", "approved");

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/org/receivers/rejected/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id in rejected receivers - ", id);
    const { data, error } = await supabase
      .from("request")
      .select("*")
      .eq("org_id", id)
      .eq("status", "rejected");

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/org/receivers/pending/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id in pending receivers - ", id);
    const { data, error } = await supabase
      .from("request")
      .select("*")
      .eq("org_id", id)
      .eq("status", "pending");

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/org/donors/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id in all donors - ", id);
    const { data, error } = await supabase
      .from("donorRequests")
      .select("*")
      .eq("org_id", id);

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/org/donors/approved/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id in approved donors - ", id);
    const { data, error } = await supabase
      .from("donorRequests")
      .select("*")
      .eq("org_id", id)
      .eq("status", "approved");

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/org/donors/rejected/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id in rejected donors - ", id);
    const { data, error } = await supabase
      .from("donorRequests")
      .select("*")
      .eq("org_id", id)
      .eq("status", "rejected");

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/org/donors/pending/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id in pending donors - ", id);
    const { data, error } = await supabase
      .from("donorRequests")
      .select("*")
      .eq("org_id", id)
      .eq("status", "pending");

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
    res.json(data);
    console.log("data in pending donors - ", data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/organization/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id in organisation profile fetch ", id);
    const { data, error } = await supabase
      .from("organization")
      .select("*")
      .eq("userId", id);

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
    res.json(data);
    console.log("id", data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/org/DonorDetails/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id donor details fetch", id);
    const { data, error } = await supabase
      .from("donors")
      .select("*")
      .eq("user_id", id);

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
    res.json(data);
    console.log("id", data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/org/ReceiverDetails/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id", id);
    const { data, error } = await supabase
      .from("receivers")
      .select("*")
      .eq("userid", id);

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
    res.json(data);
    console.log("id", data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/blood-groups/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id in update blood group quantity - ", id);
    const { data, error } = await supabase
      .from("organization")
      .select("*")
      .eq("userId", id);

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }

    console.log("data in updating blood", req.body);

    const bloodGroupData = JSON.parse(data[0].blood_groups);

    const index = bloodGroupData.findIndex(
      (group) =>
        group.bloodGroup.toLowerCase() === req.body.bloodGroup.toLowerCase()
    );

    if (index === -1) {
      return res.status(404).json({ error: "Blood group not found" });
    }

    bloodGroupData[index].quantity = req.body.quantity;

    const updatedBloodGroupData = JSON.stringify(bloodGroupData);

    const { data: updatedData, error: updateError } = await supabase
      .from("organization")
      .update({ blood_groups: updatedBloodGroupData })
      .eq("userId", id);

    if (updateError) {
      console.log(updateError);
      return res.status(400).json({ error: updateError.message });
    }

    res.json(updatedData);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/blood-groups/addBloodGroup/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id in add blood group - ", id);
    const { data, error } = await supabase
      .from("organization")
      .select("*")
      .eq("userId", id);

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }

    const bloodGroupData = JSON.parse(data[0].blood_groups);
    const newBloodGroup = {
      blood_group: req.body.blood_group,
      quantity: req.body.quantity,
    };

    bloodGroupData.push(newBloodGroup);

    const updatedBloodGroupData = JSON.stringify(bloodGroupData);
    console.log("updatedBloodGroups", updatedBloodGroupData);

    const { data: updatedData, error: updateError } = await supabase
      .from("organization")
      .update({ blood_groups: updatedBloodGroupData })
      .eq("userId", id);

    if (updateError) {
      console.log(updateError);
      return res.status(400).json({ error: updateError.message });
    }
    res.json(updatedData);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/org/rejectReceiver/:id", async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    console.log("id in update rejecting status - ", id);
    const { data, error } = await supabase
      .from("request")
      .select("*")
      .eq("userid", id);

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }

    const { data: updatedData, error: updateError } = await supabase
      .from("request")
      .update({ status: "rejected", messageToReject: message })
      .eq("userid", id);

    if (updateError) {
      console.log(updateError);
      return res.status(400).json({ error: updateError.message });
    }

    res.json(updatedData);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/org/rejectDonor/:id", async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const { donorEmail } = req.body;
  const { organisation } = req.body;

  console.log("message", message);
  console.log("organisation", organisation);
  console.log("donoremail", donorEmail);

  try {
    console.log("id in update rejecting status - ", id);
    const { data, error } = await supabase
      .from("donorRequests")
      .select("*")
      .eq("userid", id);

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: organisation.email,
        pass: organisation.password,
      },
    });

    const mailOptions = {
      from: `"${organisation.email}"`,
      to: donorEmail,
      subject: "Donation Request Rejected",
      text: `Please provide feedback to our organisation: http://localhost:3000/org/giveFeedback/${id}?orgId=${organisation.id}&donorReceiverEmail=${donorEmail}`,
    };

    try {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
        } else {
          console.log("Email sent successfully!");
        }
      });
    } catch (error) {
      console.log("Error sending email:", error);
    }

    const { data: updatedData, error: updateError } = await supabase
      .from("donorRequests")
      .update({ status: "rejected", messageToReject: message })
      .eq("userid", id);

    if (updateError) {
      console.log(updateError);
      return res.status(400).json({ error: updateError.message });
    }

    res.json(updatedData);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/org/giveFeedback/:id", async (req, res) => {
  const { id } = req.params;
  const { orgId } = req.query;
  const { donorReceiverEmail } = req.query;

  res.render("feedback", { id, orgId, donorReceiverEmail });
});

app.post("/org/giveFeedback/:id", async (req, res) => {
  const { id } = req.params;
  const { orgId } = req.query;
  const { feedback } = req.body;
  const { donorReceiverEmail } = req.body;

  try {
    const { data, error } = await supabase.from("feedback").insert([
      {
        orgId: orgId,
        feedbackMessage: feedback,
        userId: id,
        donorReceiverEmail: donorReceiverEmail,
      },
    ]);

    if (error) {
      console.error("Supabase Error Details:", error);
      return res.status(500).json({ message: "Failed to submit feedback" });
    }

    // Render the feedback success page
    res.render("feedback-success", { message: "Thank you for your feedback!" });
  } catch (error) {
    console.error("Error during giving feedback", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/org/acceptReceiver/:id", async (req, res) => {
  const { id } = req.params;
  message =
    "Dear receiver, Your request has been approved. Now, you can collect blood !!";
  try {
    console.log("id in update accepting status - ", id);
    const { data, error } = await supabase
      .from("request")
      .select("*")
      .eq("userid", id);

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }

    const { data: updatedData, error: updateError } = await supabase
      .from("request")
      .update({ status: "approved", messageToReject: message })
      .eq("userid", id);

    if (updateError) {
      console.log(updateError);
      return res.status(400).json({ error: updateError.message });
    }

    res.json(updatedData);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/org/acceptDonor/:id", async (req, res) => {
  console.log("appect donor req.body", req.body);
  const { id } = req.params;
  message =
    "Dear receiver, Your request has been approved. Now, you can collect blood !!";
  try {
    console.log("id in update accepting status - ", id);
    const { data, error } = await supabase
      .from("donorRequests")
      .select("*")
      .eq("userid", id);

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }

    sendingMail(
      req.body.organistaion,
      req.body.donorEmail,
      req.body.data.donor_id,
      message,
      "We request you to donate blood"
    );

    const { data: updatedData, error: updateError } = await supabase
      .from("donorRequests")
      .update({ status: "approved", messageToReject: message })
      .eq("userid", id);

    if (updateError) {
      console.log(updateError);
      return res.status(400).json({ error: updateError.message });
    }

    res.json(updatedData);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
