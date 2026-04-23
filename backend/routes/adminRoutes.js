// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import User from "../models/User.js";

// const router = express.Router();

// // 👑 DELETE USER (ADMIN ONLY)
// router.delete("/user/:id", protect, async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);

//     res.json({ msg: "User deleted by admin" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// export default router;



import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/role.js";

import {
  getAllUsers,
  deleteUserByAdmin
} from "../controllers/adminController.js";

const router = express.Router();

// 👤 users list
router.get("/users", protect, isAdmin, getAllUsers);

// ❌ delete user
router.delete("/user/:id", protect, isAdmin, deleteUserByAdmin);

export default router;