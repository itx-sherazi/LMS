import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
  title: { type: String,  },
  videoUrl: { type: String,  },
  public_id: { type: String,  },
  freePreview: { type: Boolean, default: false },
});

const CourseSchema = new mongoose.Schema({
  instructorId: { type: String, },
  instructorName: { type: String, },
  date: { type: Date, default: Date.now },
  title: { type: String,  },
  category: { type: String,  },
  rating:{ type: Number, default: 2},
  isNew:{ type: Boolean, default: true},
  level: { type: String,   },
  primaryLanguage: { type: String,  },
  subtitle: { type: String },
  description: { type: String,  },
  image: { type: String  },
  welcomeMessage: { type: String },
  pricing: { type: Number  },
  objectives: { type: String },

  students: [
    {
      studentId: { type: String,  },
      studentName: { type: String,  },
      studentEmail: { type: String,  },
      paidAmount: { type: Number, default: 0 },
    },
  ],
 
  curriculum: [LectureSchema],

  isPublished: { type: Boolean, default: false },
});

const Courses = mongoose.model("Courses", CourseSchema);
export default Courses;
