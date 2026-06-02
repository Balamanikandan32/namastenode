const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const paymentRouter = express.Router();
const razorpayInstance = require("../config/razorpay");
const { MEMBERSHIP_AMOUNT } = require("../constants");
const PaymentModel = require("../model/payment");
const User = require("../model/user");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

paymentRouter.post("/payment/create", authMiddleware, async (req, res) => {
  const { firstName, lastName, _id, email } = req.user;
  const { membershipType } = req.body;

  // For amount never rely on frontend, as frontend may chnage the amount, always calculate total price in server
  try {
    const options = {
      amount: MEMBERSHIP_AMOUNT[membershipType] * 100, // Amount is in currency subunits.
      currency: "INR",
      receipt: "order_rcptid_11",
      notes: {
        firstName,
        lastName,
        email,
        membershipType,
      },
    };

    const order = await razorpayInstance.orders.create(options);

    const { amount, currency, id, notes, status, receipt } = order;

    const payment = new PaymentModel({
      userId: _id,
      amount,
      currency,
      orderId: id,
      notes: { ...notes },
      status,
      receipt,
    });

    // save the order in the database
    const savedPayment = await payment.save();

    res.send({
      ...savedPayment.toJSON(),
      rzp_keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// WEBHOOK - In Razorpay dashbord webhook url is required it must be a public url,
// since we are using ec2 instance without domain, we are setting up url as ngrok URL.
paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookBody = req.body;
    const webhookSignature = req.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    // validateWebhookSignature(JSON.stringify(webhookBody), webhookSignature, webhookSecret)

    const isValid = validateWebhookSignature(
      JSON.stringify(webhookBody),
      webhookSignature,
      webhookSecret,
    );

    if (!isValid) {
      return res.status(403).send("Invalid webhook signature");
    }

    const paymentDetails = webhookBody.payload.payment.entity;

    const order = await PaymentModel.findOne({
      orderId: paymentDetails.order_id,
    });

    if (req.body.event === "payment.captured") {
      // Update the order status to PAID and save the paymentId
      order.paymentId = paymentDetails.id;
      order.status = "PAID";
      await order.save();

      //   Update the user's membership status to premium
      const user = await User.findById(order.userId);
      user.isPremium = true;
      user.membershipType = order.notes.membershipType;
      await user.save();
    }

    if (req.body.event === "payment.failed") {
      order.status = "FAILED";
      await order.save();
    }

    // webhook endpoint must always return a 200 OK response to Razorpay.
    // otherwise Razorpay will consider the webhook delivery as failed and will keep retrying to deliver the webhook.
    return res.status(200).send("Webhook received successfully");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

paymentRouter.get("/payment/verify", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (user.isPremium) {
      res.send({
        success: true,
        message: "User is a premium member",
        membershipType: user.membershipType,
      });
    } else {
      res.send({
        success: false,
        message: "User is not a premium member",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = paymentRouter;

// why webhook when you have frontend callback.
// Relying only on the frontend handler has risks:
// 1) User closes the tab -- Money was received, but your database still shows PENDING status.
// 2) Network failure -- payment succeeded but your database isn't updated.

// A Razorpay webhook is sent from Razorpay’s servers directly to your backend, not from the user’s browser.
// So even if:

// The user closes the tab, Internet disconnects... Your backend will still receive the webhook and can update the payment status accordingly.

// Frontend → show success/failure to user immediately
// Webhook → update database permanently (PAID / FAILED)
