import RegistationNotify from "../Models/RegistationNotifyModel.js";

const registrenotify = (socket) => {
  socket.on("register", async (data) => {
    const { fname, email } = data;

    try {
      const message = ` ${fname}, User have successfully registered ${email}! `;
      const registrationData = new RegistationNotify({
        email,
        name: fname,
        message,
      });

      await registrationData.save();

      socket.emit("registerSuccess", {
        message: `${fname} registered successfully!`,
      });
    } catch (error) {
      socket.emit("registerError", { message: error.message });
    }
  });
};

export default registrenotify;
