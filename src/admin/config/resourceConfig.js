import * as api from "../../global/api";



const yesNo = (value) => (value ? "Yes" : "No");

export const resourceGroups = [
  {
    label: "Church",
    resources: ["sermons", "biblical-resources", "faqs", "questions", "counseling-requests"],
  },
  {
    label: "College",
    resources: ["programs", "enrollment-forms", "enrollment-submissions"],
  },
  {
    label: "Missions",
    resources: ["partners", "mission-documents", "active-missions"],
  },
  {
    label: "About",
    resources: ["beliefs", "leadership"],
  },
  {
    label: "Updates",
    resources: ["announcements", "events"],
  },
  {
    label: "Gallery",
    resources: ["gallery"],
  },
  {
    label: "Plan Your Visit",
    resources: ["visits"],
  },
  {
    label: "Careers",
    resources: ["careers", "career-applications"],
  },
  {
    label: "Admins",
    resources: ["admin-users"],
  },
];

export const resourceConfig = {
  sermons: {
    label: "Sermons",
    singular: "Sermon",
    api: {
      list: api.getSermons,
      create: api.createSermon,
      update: api.updateSermon,
      remove: api.deleteSermon,
    },
    columns: [
      { key: "title", label: "Title" },
      { key: "speaker", label: "Speaker" },
      { key: "date_preached", label: "Date" },
      { key: "is_published", label: "Published", render: (r) => yesNo(r.is_published) },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "speaker", label: "Speaker", type: "text" },
      { name: "date_preached", label: "Date preached", type: "date" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "youtube_link", label: "YouTube link", type: "url" },
      { name: "pdf", label: "Sermon notes (PDF)", type: "file" },
      { name: "is_published", label: "Published", type: "checkbox", default: true },
    ],
    emptyMessage: "No sermons yet. Add one and it'll appear on the Sermons page.",
  },

  "biblical-resources": {
    label: "Biblical Resources",
    singular: "Resource",
    api: {
      list: api.getBiblicalResources,
      create: api.createBiblicalResource,
      update: api.updateBiblicalResource,
      remove: api.deleteBiblicalResource,
    },
    columns: [
      { key: "title", label: "Title" },
      { key: "resource_type", label: "Type", render: (r) => (r.resource_type === "devotional" ? "Devotional" : "Revelation") },
      { key: "created_at", label: "Added", render: (r) => new Date(r.created_at).toLocaleDateString() },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "resource_type",
        label: "Type",
        type: "select",
        required: true,
        options: [
          { value: "devotional", label: "Devotional" },
          { value: "revelation", label: "Revelation" },
        ],
      },
      { name: "description", label: "Description", type: "textarea" },
      { name: "file", label: "File (PDF)", type: "file" },
    ],
    emptyMessage: "No devotionals or revelations uploaded yet.",
  },

  faqs: {
    label: "FAQs",
    singular: "FAQ",
    api: {
      list: api.getFAQs,
      create: api.createFAQ,
      update: api.updateFAQ,
      remove: api.deleteFAQ,
    },
    columns: [
      { key: "question", label: "Question" },
      { key: "order", label: "Order" },
      { key: "is_published", label: "Published", render: (r) => yesNo(r.is_published) },
    ],
    fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
      { name: "order", label: "Display order", type: "number", default: 0 },
      { name: "is_published", label: "Published", type: "checkbox", default: true },
    ],
    emptyMessage: "No FAQs yet. Add one to show it under Got Questions.",
  },

  questions: {
    label: "Submitted Questions",
    singular: "Question",
    allowCreate: false,
    api: {
      list: api.getQuestions,
      update: api.updateQuestion,
      remove: api.deleteQuestion,
    },
    columns: [
      { key: "question", label: "Question", render: (r) => (r.question || "").slice(0, 70) },
      { key: "email", label: "From" },
      { key: "status", label: "Status", render: (r) => (r.status === "answered" ? "Answered" : "New") },
      { key: "submitted_at", label: "Submitted", render: (r) => new Date(r.submitted_at).toLocaleDateString() },
    ],
    fields: [
      { name: "question", label: "Question", type: "textarea", readOnly: true },
      { name: "email", label: "Email", type: "email", readOnly: true },
      { name: "answer", label: "Your answer", type: "textarea" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "new", label: "New" },
          { value: "answered", label: "Answered" },
        ],
      },
    ],
    emptyMessage: "No questions have been submitted yet.",
  },

  "counseling-requests": {
    label: "Counseling Requests",
    singular: "Request",
    allowCreate: false,
    api: {
      list: api.getCounselingRequests,
      update: api.updateCounselingRequest,
      remove: api.deleteCounselingRequest,
    },
    columns: [
      { key: "full_name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "status", label: "Status", render: (r) => statusLabel(r.status) },
      { key: "submitted_at", label: "Submitted", render: (r) => new Date(r.submitted_at).toLocaleDateString() },
    ],
    fields: [
      { name: "full_name", label: "Full name", type: "text", readOnly: true },
      { name: "email", label: "Email", type: "email", readOnly: true },
      { name: "phone", label: "Phone", type: "tel", readOnly: true },
      { name: "message", label: "Message", type: "textarea", readOnly: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "new", label: "New" },
          { value: "in_progress", label: "In progress" },
          { value: "resolved", label: "Resolved" },
        ],
      },
    ],
    emptyMessage: "No counseling requests have come in yet.",
  },

  programs: {
    label: "Programs",
    singular: "Program",
    api: {
      list: api.getPrograms,
      create: api.createProgram,
      update: api.updateProgram,
      remove: api.deleteProgram,
    },
    columns: [
      { key: "title", label: "Title" },
      { key: "duration", label: "Duration" },
      { key: "is_active", label: "Active", render: (r) => yesNo(r.is_active) },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "duration", label: "Duration", type: "text", placeholder: "e.g. 2 years" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image", label: "Image", type: "image" },
      { name: "document", label: "Curriculum / brochure (optional)", type: "file" },
      { name: "is_active", label: "Active", type: "checkbox", default: true },
    ],
    emptyMessage: "No programs listed yet. Add one to show it under Programs Offered.",
  },

  "enrollment-forms": {
    label: "Application Forms",
    singular: "Application Form",
    api: {
      list: api.getEnrollmentForms,
      create: api.createEnrollmentForm,
      update: api.updateEnrollmentForm,
      remove: api.deleteEnrollmentForm,
    },
    columns: [
      { key: "title", label: "Title" },
      { key: "program_title", label: "Program" },
      { key: "uploaded_at", label: "Uploaded", render: (r) => new Date(r.uploaded_at).toLocaleDateString() },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "file", label: "Application form file", type: "file", required: true },
      { name: "program", label: "Related program (optional)", type: "select", relatedResource: "programs" },
    ],
    emptyMessage: "No application forms uploaded yet. Add one to show it on Seminary and Home.",
  },

  "enrollment-submissions": {
    label: "Enrollment Submissions",
    singular: "Submission",
    allowCreate: false,
    api: {
      list: api.getEnrollmentSubmissions,
      update: api.updateEnrollmentSubmission,
      remove: api.deleteEnrollmentSubmission,
    },
    columns: [
      { key: "applicant_name", label: "Applicant" },
      { key: "email", label: "Email" },
      { key: "status", label: "Status", render: (r) => statusLabel(r.status) },
      { key: "submitted_at", label: "Submitted", render: (r) => new Date(r.submitted_at).toLocaleDateString() },
    ],
    fields: [
      { name: "applicant_name", label: "Applicant name", type: "text", readOnly: true },
      { name: "email", label: "Email", type: "email", readOnly: true },
      { name: "phone", label: "Phone", type: "tel", readOnly: true },
      { name: "uploaded_form", label: "Submitted form", type: "file", readOnly: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "pending", label: "Pending" },
          { value: "reviewed", label: "Reviewed" },
          { value: "accepted", label: "Accepted" },
          { value: "rejected", label: "Rejected" },
        ],
      },
    ],
    emptyMessage: "No enrollment applications have come in yet.",
  },

  partners: {
    label: "Partners",
    singular: "Partner",
    api: {
      list: api.getPartners,
      create: api.createPartner,
      update: api.updatePartner,
      remove: api.deletePartner,
    },
    columns: [
      { key: "name", label: "Name" },
      { key: "website_url", label: "Website" },
      { key: "is_active", label: "Active", render: (r) => yesNo(r.is_active) },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "logo", label: "Logo", type: "image" },
      { name: "website_url", label: "Website URL", type: "url" },
      { name: "is_active", label: "Active", type: "checkbox", default: true },
    ],
    emptyMessage: "No partners listed yet.",
  },

  "mission-documents": {
    label: "Mission Documents",
    singular: "Document",
    api: {
      list: api.getMissionDocuments,
      create: api.createMissionDocument,
      update: api.updateMissionDocument,
      remove: api.deleteMissionDocument,
    },
    columns: [
      { key: "title", label: "Title" },
      { key: "doc_type", label: "Type", render: (r) => (r.doc_type === "history" ? "History" : "Philosophy") },
      { key: "uploaded_at", label: "Uploaded", render: (r) => new Date(r.uploaded_at).toLocaleDateString() },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "doc_type",
        label: "Type",
        type: "select",
        required: true,
        options: [
          { value: "history", label: "History" },
          { value: "philosophy", label: "Philosophy" },
        ],
      },
      { name: "description", label: "Description", type: "textarea" },
      { name: "file", label: "Document (PDF)", type: "file", required: true },
    ],
    emptyMessage: "No mission documents uploaded yet.",
  },

  "active-missions": {
    label: "Active Missions",
    singular: "Mission",
    api: {
      list: api.getActiveMissions,
      create: api.createActiveMission,
      update: api.updateActiveMission,
      remove: api.deleteActiveMission,
    },
    columns: [
      { key: "name", label: "Name" },
      { key: "location", label: "Location" },
      { key: "status", label: "Status", render: (r) => (r.status === "active" ? "Active" : "Completed") },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "location", label: "Location", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image", label: "Image", type: "image" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "active", label: "Active" },
          { value: "completed", label: "Completed" },
        ],
      },
      { name: "start_date", label: "Start date", type: "date" },
    ],
    emptyMessage: "No active missions listed yet.",
  },

  beliefs: {
    label: "Beliefs",
    singular: "Belief",
    api: {
      list: api.getBeliefs,
      create: api.createBelief,
      update: api.updateBelief,
      remove: api.deleteBelief,
    },
    columns: [
      { key: "title", label: "Title" },
      { key: "order", label: "Order" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "pdf", label: "Supporting document (PDF, optional)", type: "file" },
      { name: "order", label: "Display order", type: "number", default: 0 },
    ],
    emptyMessage: "No beliefs listed yet.",
  },

  leadership: {
    label: "Leadership",
    singular: "Leader",
    api: {
      list: () => api.getLeadership(),
      create: api.createLeadershipMember,
      update: api.updateLeadershipMember,
      remove: api.deleteLeadershipMember,
    },
    columns: [
      { key: "name", label: "Name" },
      { key: "position", label: "Position" },
      { key: "category", label: "Category", render: (r) => (r.category === "church" ? "Church" : "College") },
      { key: "is_active", label: "Active", render: (r) => yesNo(r.is_active) },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "position", label: "Position", type: "text", required: true, hint: "Include the word \"Deacon\" for deacon listings — the public site groups by this text." },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: [
          { value: "church", label: "Church" },
          { value: "college", label: "College" },
        ],
      },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "image", label: "Photo", type: "image" },
      { name: "order", label: "Display order", type: "number", default: 0 },
      { name: "is_active", label: "Active", type: "checkbox", default: true },
    ],
    emptyMessage: "No leadership members listed yet.",
  },

  announcements: {
    label: "Announcements",
    singular: "Announcement",
    api: {
      list: api.getAnnouncements,
      create: api.createAnnouncement,
      update: api.updateAnnouncement,
      remove: api.deleteAnnouncement,
    },
    columns: [
      { key: "title", label: "Title" },
      { key: "is_active", label: "Active", render: (r) => yesNo(r.is_active) },
      { key: "published_at", label: "Published", render: (r) => new Date(r.published_at).toLocaleDateString() },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "file", label: "Attachment (optional)", type: "file" },
      { name: "is_active", label: "Active", type: "checkbox", default: true },
    ],
    emptyMessage: "No announcements yet.",
  },

  events: {
    label: "Events",
    singular: "Event",
    api: {
      list: () => api.getEvents(),
      create: api.createEvent,
      update: api.updateEvent,
      remove: api.deleteEvent,
    },
    columns: [
      { key: "title", label: "Title" },
      { key: "event_date", label: "Date", render: (r) => new Date(r.event_date).toLocaleString() },
      { key: "location", label: "Location" },
      { key: "is_upcoming", label: "Upcoming", render: (r) => yesNo(r.is_upcoming) },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "event_date", label: "Date & time", type: "datetime-local", required: true },
      { name: "location", label: "Location", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "cover_photo", label: "Cover photo", type: "image" },
    ],
    emptyMessage: "No events yet.",
  },

  gallery: {
    label: "Gallery",
    singular: "Photo",
    api: {
      list: api.getGallery,
      create: api.createGalleryImage,
      update: api.updateGalleryImage,
      remove: api.deleteGalleryImage,
    },
    columns: [
      { key: "caption", label: "Caption" },
      { key: "event_title", label: "Event" },
      { key: "year", label: "Year" },
    ],
    fields: [
      { name: "image", label: "Photo", type: "image", required: true },
      { name: "caption", label: "Caption", type: "text" },
      { name: "event", label: "Event (optional)", type: "select", relatedResource: "events" },
      { name: "year", label: "Year", type: "number", required: true, default: new Date().getFullYear() },
    ],
    emptyMessage: "No photos uploaded yet.",
  },

  visits: {
    label: "Visit Requests",
    singular: "Visit",
    allowCreate: false,
    api: {
      list: api.getVisitRequests,
      update: api.updateVisitRequest,
      remove: api.deleteVisitRequest,
    },
    columns: [
      { key: "full_name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "visit_date", label: "Visit date" },
      { key: "submitted_at", label: "Submitted", render: (r) => new Date(r.submitted_at).toLocaleDateString() },
    ],
    fields: [
      { name: "full_name", label: "Full name", type: "text", readOnly: true },
      { name: "email", label: "Email", type: "email", readOnly: true },
      { name: "visit_date", label: "Visit date", type: "date", readOnly: true },
      { name: "notes", label: "Notes", type: "textarea", readOnly: true },
    ],
    emptyMessage: "No one has planned a visit yet.",
  },

  careers: {
    label: "Job Postings",
    singular: "Job Posting",
    api: {
      list: api.getCareers,
      create: api.createCareer,
      update: api.updateCareer,
      remove: api.deleteCareer,
    },
    columns: [
      { key: "title", label: "Title" },
      { key: "department", label: "Department" },
      { key: "employment_type", label: "Type", render: (r) => statusLabel(r.employment_type) },
      { key: "is_active", label: "Open", render: (r) => (r.is_active ? "Yes" : "No") },
    ],
    fields: [
      { name: "title", label: "Job title", type: "text", required: true },
      { name: "department", label: "Department", type: "text" },
      { name: "location", label: "Location", type: "text" },
      {
        name: "employment_type",
        label: "Employment type",
        type: "select",
        options: [
          { value: "full_time", label: "Full-time" },
          { value: "part_time", label: "Part-time" },
          { value: "contract", label: "Contract" },
          { value: "volunteer", label: "Volunteer" },
        ],
        default: "full_time",
      },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "requirements", label: "Requirements (optional)", type: "textarea" },
      { name: "closing_date", label: "Closing date (optional)", type: "date" },
      { name: "is_active", label: "Open for applications", type: "checkbox", default: true },
    ],
    emptyMessage: "No open positions posted yet. Add one to show it on the Careers page.",
  },

  "career-applications": {
    label: "Job Applications",
    singular: "Application",
    allowCreate: false,
    api: {
      list: api.getCareerApplications,
      update: api.updateCareerApplication,
      remove: api.deleteCareerApplication,
    },
    columns: [
      { key: "full_name", label: "Name" },
      { key: "job_title", label: "Applied for" },
      { key: "email", label: "Email" },
      { key: "status", label: "Status", render: (r) => statusLabel(r.status) },
      { key: "submitted_at", label: "Submitted", render: (r) => new Date(r.submitted_at).toLocaleDateString() },
    ],
    fields: [
      { name: "full_name", label: "Full name", type: "text", readOnly: true },
      { name: "email", label: "Email", type: "email", readOnly: true },
      { name: "phone", label: "Phone", type: "tel", readOnly: true },
      { name: "cover_letter", label: "Cover letter", type: "textarea", readOnly: true },
      { name: "resume", label: "Resume", type: "file", readOnly: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "new", label: "New" },
          { value: "reviewed", label: "Reviewed" },
          { value: "shortlisted", label: "Shortlisted" },
          { value: "rejected", label: "Rejected" },
          { value: "hired", label: "Hired" },
        ],
      },
    ],
    emptyMessage: "No job applications have come in yet.",
  },

  "admin-users": {
    label: "Admins",
    singular: "Admin",
    api: {
      list: api.getAdminUsers,
      create: api.createAdminUser,
      update: api.updateAdminUser,
      remove: api.deleteAdminUser,
    },
    columns: [
      { key: "username", label: "Username" },
      { key: "email", label: "Email" },
      { key: "is_staff", label: "Staff", render: (r) => yesNo(r.is_staff) },
      { key: "is_superuser", label: "Superuser", render: (r) => yesNo(r.is_superuser) },
      {
        key: "date_joined",
        label: "Added",
        render: (r) => new Date(r.date_joined).toLocaleDateString(),
      },
    ],
    fields: [
      { name: "username", label: "Username", type: "text", required: true },
      { name: "email", label: "Email", type: "email" },
      {
        name: "password",
        label: "Password",
        type: "password",
        hint: "Required when adding a new admin. Leave blank when editing to keep the current password.",
      },
      {
        name: "is_staff",
        label: "Staff access (can sign in to this panel)",
        type: "checkbox",
        default: true,
      },
      {
        name: "is_superuser",
        label: "Superuser (full, unrestricted permissions)",
        type: "checkbox",
        default: false,
      },
    ],
    emptyMessage: "No other admin accounts yet.",
  },
};

function statusLabel(status) {
  return String(status || "")
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export { statusLabel };