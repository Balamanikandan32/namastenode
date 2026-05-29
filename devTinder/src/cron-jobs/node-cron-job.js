const cron = require("node-cron");
const ConnectionRequestModel = require("../model/connectionRequest");

const { subDays, startOfDay, endOfDay } = require("date-fns");

// Sample use case
// Send email to every user on 8 am in the morning who get connection request for previous day
cron.schedule("0 8 * * *", async () => {
  //   console.log("This will run for every minute", new Date());

  const previousDay = subDays(new Date(), 0);

  const previousDayStart = startOfDay(previousDay);
  const previousDayEnd = endOfDay(previousDay);

  //If the user of the application is less it is perfect , what if e have more user and this query return 10,000 above data the application struck
  // so use pagaination and any other optmization technique
  const pendingRequest = await ConnectionRequestModel.find({
    status: "interested",
    createdAt: {
      $gte: previousDayStart,
      $lt: previousDayEnd,
    },
  }).populate("toUserId");

  const listofUsers = [
    ...new Set(pendingRequest.map((request) => request.toUserId.email)),
  ];

  // This process is also cause app to struck, as it is synchronous task, what if there are about 20,000 + user
  // use optimization technique like queeuing, and also when sending emial, use amazon ses bulk email aand other technique to improve performance
  for (let user of listofUsers) {
    // send email using amazon ses
    // console.log("Email send sucessfully");
  }
});
