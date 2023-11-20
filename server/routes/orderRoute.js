const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51ODr06SHHmaLSqnpADiOLMwzYnDIXR85d9pR5Fddkrs1qyGzlfS5nbtyJUZQslEgHOMZMIAoOhcSG26N1I61oNPe001PbYraK4"
);
const { v4: uuidv4 } = require("uuid");

const Order = require("../model/Order");

router.post("/placeorder", async (req, res, next) => {
  const { token, subtotal, currentUser, cartItems } = req.body;

  const customer = {
    email: token.email,
    source: token.id,
  };

  try {
    const session = stripe.checkout.sessions.create({
      mode: "payment",
      success_url: "http://localhost:3000/?success=true",
      cancel_url: "http://localhost:3000/success=false",
      line_items: [
        {
          amount: subtotal * 100,
          currency: "INR",
          customer: customer.source,
          receipt_email: token.email,
        },
        {
          idempotencyKey: uuidv4(),
        },
      ],
    });

    if (session) {
      const newOrder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userId: currentUser._id,
        orderItems: cartItems,
        orderAmount: subtotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip,
        },
        transactionId: session.source,
      });

      await newOrder.save().end;

      res.status(200).json("order placed succesfully", session);
    } else {
      res.send("payment fails");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/getuserorders", async (req, res, next) => {
  const { userId } = req.body;
  try {
    const orders = await Order.find({
      userId: userId,
    });
    res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json({ messege: "something went wrong" });
  }
});

module.exports = router;
