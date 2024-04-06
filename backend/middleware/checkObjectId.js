import { isValidObjectId } from "mongoose";

function checkObjectId(req, res, next) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(404);
    throw new Error(`Invalid ObjectID of: ${id}`);
  }
  next();
}

export default checkObjectId;
