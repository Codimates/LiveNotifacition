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

const getnotifacition = (io) => {
  io.on("Registernotifyget", async (socket) => {
    try {
      const notifications = await RegistationNotify.find();
      socket.emit("getNotifications", { notifications });
    } catch (error) {
      socket.emit("getNotificationsError", { message: error.message });
    }
  });
};

export { registrenotify, getnotifacition };
