from rest_framework import serializers

from .models import (
    ActiveMission,
    Announcement,
    BiblicalResource,
    Belief,
    CounselingRequest,
    EnrollmentForm,
    EnrollmentSubmission,
    Event,
    FAQ,
    GalleryImage,
    JobApplication,
    JobPosting,
    LeadershipMember,
    MissionDocument,
    Partner,
    Program,
    Question,
    Sermon,
    VisitRequest,
)


# ---- Church ----

class SermonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sermon
        fields = [
            "id", "title", "description", "speaker", "date_preached",
            "youtube_link", "pdf", "is_published", "created_at", "updated_at",
        ]


class BiblicalResourceSerializer(serializers.ModelSerializer):
    resource_type_display = serializers.CharField(source="get_resource_type_display", read_only=True)

    class Meta:
        model = BiblicalResource
        fields = ["id", "title", "resource_type", "resource_type_display", "description", "file", "created_at"]


class CounselingRequestSerializer(serializers.ModelSerializer):
    """
    Same serializer backs both the public POST (submitting a request) and
    the admin PATCH (updating its status) via CounselingRequestViewSet.
    `status` is writable so admins can actually change it — this is safe
    because AllowPublicCreateAdminReadWrite only lets the public POST, and
    the public submission form never sends a `status` field, so a new
    request always starts at the model's default ("new") regardless.
    """

    class Meta:
        model = CounselingRequest
        fields = ["id", "full_name", "email", "phone", "message", "status", "submitted_at"]
        read_only_fields = ["submitted_at"]


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ["id", "question", "answer", "order", "is_published"]


class QuestionSerializer(serializers.ModelSerializer):
    """
    Handles both the public 'Ask a question' POST and the admin PATCH that
    answers it (via QuestionViewSet). `answer` and `status` are writable
    so admins can actually fill them in — safe because
    AllowPublicCreateAdminReadWrite only lets the public POST, and the
    public form never sends `answer`/`status`, so a new question always
    starts unanswered regardless of these being writable here.
    """

    class Meta:
        model = Question
        fields = ["id", "question", "email", "answer", "status", "submitted_at"]
        read_only_fields = ["submitted_at"]


# ---- College ----

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ["id", "title", "description", "duration", "image", "document", "is_active", "created_at"]


class EnrollmentFormSerializer(serializers.ModelSerializer):
    program_title = serializers.CharField(source="program.title", read_only=True)

    class Meta:
        model = EnrollmentForm
        fields = ["id", "title", "description", "file", "program", "program_title", "uploaded_at"]


class EnrollmentSubmissionSerializer(serializers.ModelSerializer):
    """
    Same serializer backs the public POST (submitting an application) and
    the admin PATCH (updating its status) via EnrollmentSubmissionViewSet.
    `status` is writable so admins can actually move it through
    pending/reviewed/accepted/rejected — safe because
    AllowPublicCreateAdminReadWrite only lets the public POST, and the
    public form never sends `status`, so a new submission always starts
    at the model's default ("pending") regardless.
    """

    class Meta:
        model = EnrollmentSubmission
        fields = [
            "id", "applicant_name", "email", "phone", "program",
            "uploaded_form", "status", "submitted_at",
        ]
        read_only_fields = ["submitted_at"]


# ---- Missions ----

class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = ["id", "name", "description", "logo", "website_url", "is_active"]


class MissionDocumentSerializer(serializers.ModelSerializer):
    doc_type_display = serializers.CharField(source="get_doc_type_display", read_only=True)

    class Meta:
        model = MissionDocument
        fields = ["id", "title", "doc_type", "doc_type_display", "file", "description", "uploaded_at"]


class ActiveMissionSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = ActiveMission
        fields = [
            "id", "name", "location", "description", "image",
            "status", "status_display", "start_date",
        ]


# ---- About ----

class BeliefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Belief
        fields = ["id", "title", "description", "pdf", "order"]


class LeadershipMemberSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source="get_category_display", read_only=True)

    class Meta:
        model = LeadershipMember
        fields = [
            "id", "name", "position", "category", "category_display",
            "bio", "image", "order", "is_active",
        ]


# ---- Updates ----

class GalleryImageSerializer(serializers.ModelSerializer):
    event_title = serializers.CharField(source="event.title", read_only=True)

    class Meta:
        model = GalleryImage
        fields = ["id", "image", "caption", "event", "event_title", "year", "uploaded_at"]


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = ["id", "title", "description", "file", "is_active", "published_at"]


class EventSerializer(serializers.ModelSerializer):
    is_upcoming = serializers.BooleanField(read_only=True)
    photos = GalleryImageSerializer(source="gallery_images", many=True, read_only=True)

    class Meta:
        model = Event
        fields = [
            "id", "title", "description", "location", "event_date",
            "cover_photo", "is_upcoming", "photos", "created_at",
        ]


# ---- Plan Your Visit ----

class VisitRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitRequest
        fields = ["id", "full_name", "email", "visit_date", "notes", "submitted_at"]
        read_only_fields = ["submitted_at"]


# ---- Careers ----

class JobPostingSerializer(serializers.ModelSerializer):
    employment_type_display = serializers.CharField(source="get_employment_type_display", read_only=True)

    class Meta:
        model = JobPosting
        fields = [
            "id", "title", "department", "location", "employment_type",
            "employment_type_display", "description", "requirements",
            "is_active", "closing_date", "posted_at",
        ]


class JobApplicationSerializer(serializers.ModelSerializer):
    """
    Same serializer backs the public POST (applying for a job) and the
    admin PATCH (moving the application through its status) via
    JobApplicationViewSet. `status` is writable so admins can actually
    update it — safe because AllowPublicCreateAdminReadWrite only lets the
    public POST, and the public application form never sends a `status`
    field, so a new application always starts at the model's default
    ("new") regardless.
    """

    job_title = serializers.CharField(source="job.title", read_only=True)

    class Meta:
        model = JobApplication
        fields = [
            "id", "job", "job_title", "full_name", "email", "phone",
            "cover_letter", "resume", "status", "submitted_at",
        ]
        read_only_fields = ["submitted_at"]