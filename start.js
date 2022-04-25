require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");



mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log(`MongoDB connected ${process.env.DATABASE}`))
  .catch((err) => console.log(err));

mongoose.connection
  .on("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.log(`Connection error: ${err.message}`);
  });



require("./models/Registration");

const server = app.listen(8000, function () {
  console.log(`Express is running on port ${server.address().port}`);
});
