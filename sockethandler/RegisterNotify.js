const registrenotify = (socket) => {
  socket.on("register", async (data) => {
    console.log("Registration data received:", data);
    try {
      console.log("Saving user data to database...");

      socket.emit("registerSuccess", {
        message: "User registered successfully!",
      });
    } catch (error) {
      socket.emit("registerError", { message: error.message });
    }
  });
};

export default registrenotify;
