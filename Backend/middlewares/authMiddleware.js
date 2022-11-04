import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const protect = expressAsyncHandler(async (req, res, next) => {
  const tokenReq = req.headers.authorization;
  console.log(tokenReq);

  if (tokenReq && tokenReq.startsWith("Bearer")) {
    try {
      let token = tokenReq.split(" ")[1];
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SCERET);

      req.user = await User.findById(decoded.id).select("-password"); // 将user 传递给req
      console.log(req.user);
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!tokenReq) {
    res.status(401);
    throw new Error("no token");
  }
  next();
});


const admin=(req,res,next)=>{
  if(req.user&&req.user.isAdmin){
    next()
  }else{
    res.status(401)
    throw new Error('you are not the admin')
  }
}

export { protect,admin };
