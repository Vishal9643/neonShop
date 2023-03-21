import Axios from "../../../utils/Axios";
import nc from "next-connect";
import { createCheckoutSession } from "../../../server/handlers/stripe/createCheckoutSession";
import dbConnection from "../../../server/middleware/dbConnection";
import ncConfig from "../../../server/utils/ncConfig";

// export default async function success(req, res) {
//   // res.send(req.query);
//   if (req.body.STATUS === "TXN_SUCCESS") {
//     console.log("IT's working");
//     res.send("Success");
//     // const res = await Axios.post("stripe/checkout-session", {
//     //   cartId: req.query.cartId,
//     //   shippingAddress: req.query.shippingAddress,
//     //   contactEmail: req.query.contactEmail,
//     // });
//     // console.log(res.data);
//   }
// }

const handler = nc(ncConfig).use(dbConnection).post(createCheckoutSession);

export default handler;
