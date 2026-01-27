import Student from "../models/Student.js";

// ✅ Create Student
export const createStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      gender,
      course,
      dob,
      year,
      address,
    } = req.body;

    // Mandatory field check
    if (!firstName || !lastName || !email || !mobile || !gender || !course) {
      return res.status(400).json({
        success: false,
        message: "Please fill all mandatory fields",
      });
    }

    // Check duplicate email
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Optional photo
    const photo = req.file ? req.file.filename : null;

    const student = await Student.create({
      firstName,
      lastName,
      email,
      mobile,
      gender,
      course,
      photo,
      dob,
      year,
      address,
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Get All Students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Single Student
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student)
      return res.status(404).json({ success: false, message: "Student not found" });

    res.status(200).json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Student
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student)
      return res.status(404).json({ success: false, message: "Student not found" });

    // New photo
    if (req.file) student.photo = req.file.filename;

    Object.assign(student, req.body);
    await student.save();

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Student
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student)
      return res.status(404).json({ success: false, message: "Student not found" });

    await student.deleteOne();
    res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
