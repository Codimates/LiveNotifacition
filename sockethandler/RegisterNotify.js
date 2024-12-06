// import RegistationNotify from "../Models/RegistationNotifyModel.js";

// const registrenotify = (socket) => {
//   socket.on("register", async (data) => {
//     const { fname, email, date, time } = data;

//     try {
//       const message = ` ${fname}, User have successfully registered ${email} on ${date} at ${time}! `;
//       const registrationData = new RegistationNotify({
//         email,
//         name: fname,
//         message,
//         date,
//         time,
//       });

//       console.log("registrationData", registrationData);

//       await registrationData.save();

//       socket.emit("registerSuccess", {
//         message: `${fname} registered successfully!`,
//       });
//     } catch (error) {
//       socket.emit("registerError", { message: error.message });
//     }
//   });
// };

// const getviewedsignal = (socket) => {
//   socket.on("viewed", async (data) => {
//     const { id, email } = data; // Notification ID and user email
//     try {
//       // Update the notification document by adding the email to the viewed array
//       const updatedNotification = await RegistationNotify.findByIdAndUpdate(
//         id,
//         { $addToSet: { viewed: email } }, // $addToSet ensures no duplicate emails are added
//         { new: true } // Return the updated document
//       );

//       if (updatedNotification) {
//         console.log(`Notification ID ${id} marked as viewed by ${email}`);
//         socket.emit("viewedSuccess", {
//           message: "Notification marked as viewed successfully!",
//           notification: updatedNotification,
//         });
//       } else {
//         socket.emit("viewedError", {
//           message: "Notification not found.",
//         });
//       }
//     } catch (error) {
//       console.error("Error marking notification as viewed:", error.message);
//       socket.emit("viewedError", { message: error.message });
//     }
//   });
// };

// const getnotifacition = (io) => {
//   io.on("connection", (socket) => {
//     socket.on("Registernotifyget", async (data) => {
//       try {
//         const { email } = data; // Extract email from client payload

//         // const notifications = await RegistationNotify.find();

//         const notifications = await RegistationNotify.find({
//           viewed: { $ne: email }, // Exclude notifications where the email exists in the 'viewed' array
//         });

//         socket.emit("getNotifications", { notifications });
//       } catch (error) {
//         console.error("Error fetching notifications:", error.message); // Debugging: Log errors
//         socket.emit("getNotificationsError", { message: error.message });
//       }
//     });
//   });
// };

// export { registrenotify, getnotifacition, getviewedsignal };
import RegistationNotify from "../Models/RegistationNotifyModel.js";

const registrenotify = (socket) => {
  socket.on("register", async (data) => {
    const { fname, email, date, time } = data;

    try {
      const message = ` ${fname}, User have successfully registered ${email} on ${date} at ${time}! `;
      const registrationData = new RegistationNotify({
        email,
        name: fname,
        message,
        date,
        time,
      });

      console.log("registrationData", registrationData);

      await registrationData.save();

      socket.emit("registerSuccess", {
        message: `${fname} registered successfully!`,
      });
    } catch (error) {
      socket.emit("registerError", { message: error.message });
    }
  });
};

const getviewedsignal = (socket) => {
  socket.on("viewed", async (data) => {
    const { id, email } = data; // Notification ID and user email
    try {
      // Update the notification document by adding the email to the viewed array
      const updatedNotification = await RegistationNotify.findByIdAndUpdate(
        id,
        { $addToSet: { viewed: email } }, // $addToSet ensures no duplicate emails are added
        { new: true } // Return the updated document
      );

      if (updatedNotification) {
        console.log(`Notification ID ${id} marked as viewed by ${email}`);
        socket.emit("viewedSuccess", {
          message: "Notification marked as viewed successfully!",
          notification: updatedNotification,
        });
      } else {
        socket.emit("viewedError", {
          message: "Notification not found.",
        });
      }
    } catch (error) {
      console.error("Error marking notification as viewed:", error.message);
      socket.emit("viewedError", { message: error.message });
    }
  });
};

const getnotifacition = (io) => {
  io.on("connection", (socket) => {
    socket.on("Registernotifyget", async (data) => {
      try {
        const { email } = data; // Extract email from client payload

        const notifications = await RegistationNotify.find({
          viewed: { $ne: email }, // Exclude notifications where the email exists in the 'viewed' array
        });

        socket.emit("getNotifications", { notifications });
      } catch (error) {
        console.error("Error fetching notifications:", error.message); // Debugging: Log errors
        socket.emit("getNotificationsError", { message: error.message });
      }
    });
  });
};

const buyprodeucts = (socket) => {
  socket.on("buyproduct", async (data) => {
    const {
      fname,
      email,
      date,
      time,
      brand_name,
      model_name,
      price,
      special_offer,
    } = data;

    try {
      const message = ` ${fname}, User have successfully buy 
        ${brand_name}
        ${model_name}
        ${price}
        ${special_offer}
        ${email} on ${date} at ${time}! `;
      const registrationData = new RegistationNotify({
        email,
        name: fname,
        message,
        date,
        time,
      });

      console.log("buyproduct", registrationData);

      await registrationData.save();

      socket.emit("buyproductSuccess", {
        message: `${fname} Payment verified successfully!`,
      });
    } catch (error) {
      socket.emit("buyproductError", { message: error.message });
    }
  });
};

export { registrenotify, getnotifacition, getviewedsignal, buyprodeucts };
