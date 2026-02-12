import Student from "../models/Student.js";
import cloudinary from "../cloudinary.js";

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
      interestedSubjects,
    } = req.body;

    const parsedSubjects = interestedSubjects
      ? JSON.parse(interestedSubjects)
      : [];

    if (!firstName || !lastName || !email || !mobile || !gender || !course) {
      return res.status(400).json({
        success: false,
        message: "Please fill all mandatory fields",
      });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ✅ Cloudinary Upload
    let photo = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "student_profiles",
      });

      photo = result.secure_url;
    }

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
      interestedSubjects: parsedSubjects,
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

// ✅ Get Student By ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Student
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "student_profiles",
      });

      student.photo = result.secure_url;
    }

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

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    await student.deleteOne();

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
