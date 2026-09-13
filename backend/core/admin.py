from django.contrib import admin

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
    LeadershipMember,
    MissionDocument,
    Partner,
    Program,
    Question,
    Sermon,
    VisitRequest,
)


# ====================================================================
# CHURCH
# ====================================================================

@admin.register(Sermon)
class SermonAdmin(admin.ModelAdmin):
    list_display = ("title", "speaker", "date_preached", "is_published")
    list_filter = ("is_published", "date_preached")
    search_fields = ("title", "speaker", "description")
    date_hierarchy = "date_preached"


@admin.register(BiblicalResource)
class BiblicalResourceAdmin(admin.ModelAdmin):
    list_display = ("title", "resource_type", "created_at")
    list_filter = ("resource_type",)
    search_fields = ("title", "description")


@admin.register(CounselingRequest)
class CounselingRequestAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "status", "submitted_at")
    list_filter = ("status",)
    search_fields = ("full_name", "email", "message")
    readonly_fields = ("submitted_at",)


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("question", "order", "is_published")
    list_editable = ("order", "is_published")
    search_fields = ("question", "answer")


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("short_question", "email", "status", "submitted_at")
    list_filter = ("status",)
    search_fields = ("question", "email", "answer")
    readonly_fields = ("submitted_at",)

    @admin.display(description="Question")
    def short_question(self, obj):
        return obj.question[:60]


# ====================================================================
# COLLEGE
# ====================================================================

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ("title", "duration", "has_document", "is_active")
    list_filter = ("is_active",)
    search_fields = ("title", "description")

    @admin.display(boolean=True, description="Document")
    def has_document(self, obj):
        return bool(obj.document)


@admin.register(EnrollmentForm)
class EnrollmentFormAdmin(admin.ModelAdmin):
    list_display = ("title", "program", "uploaded_at")
    list_filter = ("program",)


@admin.register(EnrollmentSubmission)
class EnrollmentSubmissionAdmin(admin.ModelAdmin):
    list_display = ("applicant_name", "email", "program", "status", "submitted_at")
    list_filter = ("status", "program")
    search_fields = ("applicant_name", "email")


# ====================================================================
# MISSIONS
# ====================================================================

@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ("name", "website_url", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name", "description")


@admin.register(MissionDocument)
class MissionDocumentAdmin(admin.ModelAdmin):
    list_display = ("title", "doc_type", "uploaded_at")
    list_filter = ("doc_type",)


@admin.register(ActiveMission)
class ActiveMissionAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "status", "start_date")
    list_filter = ("status",)
    search_fields = ("name", "location", "description")


# ====================================================================
# ABOUT
# ====================================================================

@admin.register(Belief)
class BeliefAdmin(admin.ModelAdmin):
    list_display = ("title", "order")
    list_editable = ("order",)
    search_fields = ("title", "description")


@admin.register(LeadershipMember)
class LeadershipMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "position", "category", "order", "is_active")
    list_filter = ("category", "is_active")
    list_editable = ("order",)
    search_fields = ("name", "position", "bio")


# ====================================================================
# UPDATES
# ====================================================================

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active", "published_at")
    list_filter = ("is_active",)
    search_fields = ("title", "description")


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "location", "event_date", "is_upcoming")
    search_fields = ("title", "description", "location")
    date_hierarchy = "event_date"


# ====================================================================
# GALLERY
# ====================================================================

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ("caption", "event", "year", "uploaded_at")
    list_filter = ("year", "event")
    search_fields = ("caption",)


# ====================================================================
# PLAN YOUR VISIT
# ====================================================================

@admin.register(VisitRequest)
class VisitRequestAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "visit_date", "submitted_at")
    search_fields = ("full_name", "email")
    readonly_fields = ("submitted_at",)