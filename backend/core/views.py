from django.utils import timezone
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from website.permissions import AllowPublicCreateAdminReadWrite

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
from .serializers import (
    ActiveMissionSerializer,
    AnnouncementSerializer,
    BiblicalResourceSerializer,
    BeliefSerializer,
    CounselingRequestSerializer,
    EnrollmentFormSerializer,
    EnrollmentSubmissionSerializer,
    EventSerializer,
    FAQSerializer,
    GalleryImageSerializer,
    JobApplicationSerializer,
    JobPostingSerializer,
    LeadershipMemberSerializer,
    MissionDocumentSerializer,
    PartnerSerializer,
    ProgramSerializer,
    QuestionSerializer,
    SermonSerializer,
    VisitRequestSerializer,
)


# ---- Church ----

class SermonViewSet(viewsets.ModelViewSet):
    serializer_class = SermonSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.user and self.request.user.is_authenticated:
            return Sermon.objects.all()
        return Sermon.objects.filter(is_published=True)


class BiblicalResourceViewSet(viewsets.ModelViewSet):
    queryset = BiblicalResource.objects.all()
    serializer_class = BiblicalResourceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CounselingRequestViewSet(viewsets.ModelViewSet):
    """Public can submit (POST). Only admins can view/manage."""

    queryset = CounselingRequest.objects.all()
    serializer_class = CounselingRequestSerializer
    permission_classes = [AllowPublicCreateAdminReadWrite]


class FAQViewSet(viewsets.ModelViewSet):
    serializer_class = FAQSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.user and self.request.user.is_authenticated:
            return FAQ.objects.all()
        return FAQ.objects.filter(is_published=True)


class QuestionViewSet(viewsets.ModelViewSet):
    """Public can submit a question (POST). Only admins can view/answer them."""

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [AllowPublicCreateAdminReadWrite]


# ---- College ----

class ProgramViewSet(viewsets.ModelViewSet):
    serializer_class = ProgramSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.user and self.request.user.is_authenticated:
            return Program.objects.all()
        return Program.objects.filter(is_active=True)


class EnrollmentFormViewSet(viewsets.ModelViewSet):
    queryset = EnrollmentForm.objects.all()
    serializer_class = EnrollmentFormSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class EnrollmentSubmissionViewSet(viewsets.ModelViewSet):
    """Public can submit (POST). Only admins can view/manage."""

    queryset = EnrollmentSubmission.objects.all()
    serializer_class = EnrollmentSubmissionSerializer
    permission_classes = [AllowPublicCreateAdminReadWrite]


# ---- Missions ----

class PartnerViewSet(viewsets.ModelViewSet):
    serializer_class = PartnerSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.user and self.request.user.is_authenticated:
            return Partner.objects.all()
        return Partner.objects.filter(is_active=True)


class MissionDocumentViewSet(viewsets.ModelViewSet):
    queryset = MissionDocument.objects.all()
    serializer_class = MissionDocumentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ActiveMissionViewSet(viewsets.ModelViewSet):
    queryset = ActiveMission.objects.all()
    serializer_class = ActiveMissionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


# ---- About ----

class BeliefViewSet(viewsets.ModelViewSet):
    queryset = Belief.objects.all()
    serializer_class = BeliefSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class LeadershipMemberViewSet(viewsets.ModelViewSet):
    """Supports ?category=church or ?category=college."""

    serializer_class = LeadershipMemberSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = LeadershipMember.objects.all() if (self.request.user and self.request.user.is_authenticated) \
            else LeadershipMember.objects.filter(is_active=True)
        category = self.request.query_params.get("category")
        if category:
            qs = qs.filter(category=category)
        return qs


# ---- Updates ----

class AnnouncementViewSet(viewsets.ModelViewSet):
    serializer_class = AnnouncementSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.user and self.request.user.is_authenticated:
            return Announcement.objects.all()
        return Announcement.objects.filter(is_active=True)


class EventViewSet(viewsets.ModelViewSet):
    """Supports ?when=upcoming or ?when=past."""

    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = Event.objects.all()
        when = self.request.query_params.get("when")
        now = timezone.now()
        if when == "upcoming":
            qs = qs.filter(event_date__gte=now)
        elif when == "past":
            qs = qs.filter(event_date__lt=now)
        return qs


# ---- Gallery ----

class GalleryImageViewSet(viewsets.ModelViewSet):
    """Supports ?event=<id> or ?year=<yyyy>."""

    serializer_class = GalleryImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = GalleryImage.objects.all()
        event_id = self.request.query_params.get("event")
        year = self.request.query_params.get("year")
        if event_id:
            qs = qs.filter(event_id=event_id)
        if year:
            qs = qs.filter(year=year)
        return qs


# ---- Plan Your Visit ----

class VisitRequestViewSet(viewsets.ModelViewSet):
    """Public can submit (POST) the 'I'm Visiting' form. Only admins can view/manage."""

    queryset = VisitRequest.objects.all()
    serializer_class = VisitRequestSerializer
    permission_classes = [AllowPublicCreateAdminReadWrite]


# ---- Careers ----

class JobPostingViewSet(viewsets.ModelViewSet):
    """Public sees only open (is_active) postings. Admins see and manage all of them."""

    serializer_class = JobPostingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.user and self.request.user.is_authenticated:
            return JobPosting.objects.all()
        return JobPosting.objects.filter(is_active=True)


class JobApplicationViewSet(viewsets.ModelViewSet):
    """Public can submit (POST) an application. Only admins can view/manage them."""

    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    permission_classes = [AllowPublicCreateAdminReadWrite]