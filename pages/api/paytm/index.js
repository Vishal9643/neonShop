import {
  addCategory,
  getAllCategories,
} from "../../../server/handlers/category";
import authenticate from "../../../server/middleware/authenticate";
import restrictto from "../../../server/middleware/restrictTo";
import {createToken} from "../../../server/handlers/paytm/createToken";
import nc from "next-connect";
import dbConnection from "../../../server/middleware/dbConnection";
import ncConfig from "../../../server/utils/ncConfig";

const handler = nc(ncConfig).use(dbConnection).post(createToken);

export default handler;
