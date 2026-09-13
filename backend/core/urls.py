from rest_framework.routers import DefaultRouter

from .views import (
    ActiveMissionViewSet,
    AnnouncementViewSet,
    BiblicalResourceViewSet,
    BeliefViewSet,
    CounselingRequestViewSet,
    EnrollmentFormViewSet,
    EnrollmentSubmissionViewSet,
    EventViewSet,
    FAQViewSet,
    GalleryImageViewSet,
    LeadershipMemberViewSet,
    MissionDocumentViewSet,
    PartnerViewSet,
    ProgramViewSet,
    QuestionViewSet,
    SermonViewSet,
    VisitRequestViewSet,
)

router = DefaultRouter()

# Church
router.register("sermons", SermonViewSet, basename="sermon")
router.register("biblical-resources", BiblicalResourceViewSet, basename="biblical-resource")
router.register("counseling-requests", CounselingRequestViewSet, basename="counseling-request")
router.register("faqs", FAQViewSet, basename="faq")
router.register("questions", QuestionViewSet, basename="question")

# College
router.register("programs", ProgramViewSet, basename="program")
router.register("enrollment-forms", EnrollmentFormViewSet, basename="enrollment-form")
router.register("enrollment-submissions", EnrollmentSubmissionViewSet, basename="enrollment-submission")

# Missions
router.register("partners", PartnerViewSet, basename="partner")
router.register("mission-documents", MissionDocumentViewSet, basename="mission-document")
router.register("active-missions", ActiveMissionViewSet, basename="active-mission")

# About
router.register("beliefs", BeliefViewSet, basename="belief")
router.register("leadership", LeadershipMemberViewSet, basename="leadership")

# Updates
router.register("announcements", AnnouncementViewSet, basename="announcement")
router.register("events", EventViewSet, basename="event")

# Gallery
router.register("gallery", GalleryImageViewSet, basename="gallery-image")

# Plan Your Visit
router.register("visits", VisitRequestViewSet, basename="visit")

urlpatterns = router.urls