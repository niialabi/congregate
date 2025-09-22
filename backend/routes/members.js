import express from "express";
import { Op } from "sequelize";
import db from "../models/index.js";
import { protect } from "./auth.js";

const router = express.Router();

// Protect all routes in this file
router.use(protect);

// GET /members - Get all members with filtering, searching, and sorting
router.get("/members", async (req, res) => {
  try {
    const { gender, demographic, search, sort } = req.query;
    const where = {};
    const order = [];

    if (gender) {
      where.gender = gender;
    }

    if (demographic) {
      where.demographic = demographic;
    }

    if (search) {
      where[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (
      sort &&
      (sort.toUpperCase() === "ASC" || sort.toUpperCase() === "DESC")
    ) {
      order.push(["lastName", sort.toUpperCase()]);
    } else {
      order.push(["lastName", "ASC"]); // Default sort
    }

    const members = await db.Members.findAll({
      where,
      include: [
        {
          model: db.Attendance,
          as: "attendances",
        },
      ],
      order,
    });

    res.json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ message: "Error fetching members" });
  }
});

// POST /attendance - Record attendance for a member
router.post("/attendance", async (req, res) => {
  try {
    const { memberId, date, present } = req.body;

    if (!memberId || !date) {
      return res
        .status(400)
        .json({ message: "memberId and date are required" });
    }

    // Check for duplicate entry
    const existingAttendance = await db.Attendance.findOne({
      where: {
        memberId,
        date: new Date(date),
      },
    });

    if (existingAttendance) {
      return res
        .status(409)
        .json({
          message: "Attendance for this member on this date already exists",
        });
    }

    const newAttendance = await db.Attendance.create({
      memberId,
      date,
      present: present || false,
    });

    res.status(201).json(newAttendance);
  } catch (error) {
    console.error("Error creating attendance:", error);
    res.status(500).json({ message: "Error creating attendance" });
  }
});

// GET /attendance/:memberId - Get all attendance records for a specific member
router.get("/attendance/:memberId", async (req, res) => {
  try {
    const { memberId } = req.params;
    const attendanceRecords = await db.Attendance.findAll({
      where: { memberId },
      order: [["date", "DESC"]],
    });

    if (!attendanceRecords) {
      return res
        .status(404)
        .json({ message: "No attendance records found for this member" });
    }

    res.json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ message: "Error fetching attendance records" });
  }
});

export default router;
