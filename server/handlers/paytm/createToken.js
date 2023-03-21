import https from "https";
import PaytmChecksum from "./PaytmChecksum";
import catchASync from "../../../server/utils/catchASync";

export const createToken = catchASync(async (req, res) => {
  /*
   * import checksum generation utility
   * You can get this utility from https://developer.paytm.com/docs/checksum/
   */

  console.log("This is a global state ", req.body.globalState);

  const { amount, globalState, state } = req.body;
  const orderId = Math.random();
  const { shipping } = state;

  var paytmParams = {};

  const { user = null } = req;

  console.log("This is the user ", user);

  if (user) {
    paytmParams.body = {
      requestType: "Payment",
      mid: "QSsbUJ45066050368569",
      websiteName: "neonman",
      orderId: orderId,
      // https://neonman.vercel.app/api/paytm/success
      callbackUrl:
        "http://localhost:3000/api/paytm/success?userId=" +
        req.user._id +
        "&amount=" +
        amount +
        "&cartId=" +
        globalState.cartData.cart._id +
        "&shippingAddress=" +
        state.shipping +
        "&contactEmail=" +
        state.email +
        "&zip=" +
        shipping.zip +
        "&stateOrProvince=" +
        shipping.stateOrProvince +
        "&city=" +
        shipping.city +
        "&addressLine1=" +
        shipping.addressLine1 +
        "&lastName=" +
        shipping.lastName +
        "&firstName=" +
        shipping.firstName +
        "&country=" +
        shipping.country,
      txnAmount: {
        value: amount,
        currency: "INR",
      },
      userInfo: {
        custId: req.user._id,
      },
    };
  } else {
    paytmParams.body = {
      requestType: "Payment",
      mid: "QSsbUJ45066050368569",
      websiteName: "neonman",
      orderId: orderId,
      // https://neonman.vercel.app/api/paytm/success
      callbackUrl:
        "http://localhost:3000/api/paytm/success?userId=" +
        "anonymous" +
        "&amount=" +
        amount +
        "&cartId=" +
        globalState.cartData.cart._id +
        "&shippingAddress=" +
        state.shipping +
        "&contactEmail=" +
        state.email +
        "&zip=" +
        shipping.zip +
        "&stateOrProvince=" +
        shipping.stateOrProvince +
        "&city=" +
        shipping.city +
        "&addressLine1=" +
        shipping.addressLine1 +
        "&lastName=" +
        shipping.lastName +
        "&firstName=" +
        shipping.firstName +
        "&country=" +
        shipping.country,
      txnAmount: {
        value: amount,
        currency: "INR",
      },
      userInfo: {
        custId: "anonymous",
      },
    };
  }

  /*
   * Generate checksum by parameters we have in body
   * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
   */
  PaytmChecksum.generateSignature(
    JSON.stringify(paytmParams.body),
    "82rDV2ny6N8Pi%k5"
  ).then(function (checksum) {
    paytmParams.head = {
      signature: checksum,
    };

    var post_data = JSON.stringify(paytmParams);

    var options = {
      /* for Staging */
      hostname: "securegw-stage.paytm.in" /* for Production */, // hostname: 'securegw.paytm.in',

      port: 443,
      path:
        "/theia/api/v1/initiateTransaction?mid=QSsbUJ45066050368569&orderId=" +
        orderId,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": post_data.length,
      },
    };

    var response = "";
    var post_req = https.request(options, function (post_res) {
      post_res.on("data", function (chunk) {
        response += chunk;
      });

      post_res.on("end", function () {
        console.log("Paytm Response: ", JSON.parse(response));
        res.json({
          token: JSON.parse(response).body.txnToken,
          orderId: orderId,
        });
      });
    });

    post_req.write(post_data);
    post_req.end();
  });
});
