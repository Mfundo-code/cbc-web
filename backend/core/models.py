from django.db import models
from django.utils import timezone


# ====================================================================
# CHURCH — Sermons, Personal Growth (Biblical, Counseling), FAQs
# ====================================================================

class Sermon(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    speaker = models.CharField(max_length=150, blank=True)
    date_preached = models.DateField(blank=True, null=True)
    youtube_link = models.URLField(blank=True, help_text="Optional YouTube link")
    pdf = models.FileField(upload_to="sermons/pdfs/", blank=True, null=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-date_preached", "-created_at"]

    def __str__(self):
        return self.title


class BiblicalResource(models.Model):
    """Personal Growth > Biblical: Devotionals & Revelations PDFs."""

    class ResourceType(models.TextChoices):
        DEVOTIONAL = "devotional", "Devotional"
        REVELATION = "revelation", "Revelations"

    title = models.CharField(max_length=255)
    resource_type = models.CharField(max_length=20, choices=ResourceType.choices)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to="personal_growth/biblical/")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.get_resource_type_display()}: {self.title}"


class CounselingRequest(models.Model):
    """Personal Growth > Counseling: a request submitted by a member of the public."""

    class Status(models.TextChoices):
        NEW = "new", "New"
        IN_PROGRESS = "in_progress", "In progress"
        RESOLVED = "resolved", "Resolved"

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-submitted_at"]
        verbose_name = "Counseling request"
        verbose_name_plural = "Counseling requests"

    def __str__(self):
        return f"{self.full_name} ({self.submitted_at:%Y-%m-%d})"


class FAQ(models.Model):
    """Personal Growth > 'Got Questions' — published Q&A pairs."""

    question = models.CharField(max_length=255)
    answer = models.TextField()
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"

    def __str__(self):
        return self.question


class Question(models.Model):
    """
    Personal Growth > 'Got Questions' — a question submitted by a member of
    the public via the "Ask a question" form. An admin answers it here and
    can then optionally publish it as a FAQ.
    """

    class Status(models.TextChoices):
        NEW = "new", "New"
        ANSWERED = "answered", "Answered"

    question = models.TextField()
    email = models.EmailField(blank=True, help_text="Optional, if they want a personal reply")
    answer = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-submitted_at"]
        verbose_name = "Submitted question"
        verbose_name_plural = "Submitted questions"

    def __str__(self):
        return self.question[:60]


# ====================================================================
# COLLEGE — Programs Offered (each with an optional document), Enrollment
# ====================================================================

class Program(models.Model):
    """A program offered by the college."""

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    duration = models.CharField(max_length=100, blank=True, help_text="e.g. '2 years', '6 months'")
    image = models.ImageField(upload_to="college/programs/images/", blank=True, null=True)
    document = models.FileField(
        upload_to="college/programs/documents/",
        blank=True,
        null=True,
        help_text="Optional supporting document for this program (e.g. curriculum, brochure, syllabus PDF)",
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title


class EnrollmentForm(models.Model):
    """A downloadable enrollment form template that admins upload for the public to download."""

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to="college/enrollment_forms/")
    program = models.ForeignKey(
        Program, on_delete=models.SET_NULL, null=True, blank=True, related_name="enrollment_forms"
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]

    def __str__(self):
        return self.title


class EnrollmentSubmission(models.Model):
    """A filled-in enrollment form received from a member of the public."""

    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        REVIEWED = "reviewed", "Reviewed"
        ACCEPTED = "accepted", "Accepted"
        REJECTED = "rejected", "Rejected"

    applicant_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    program = models.ForeignKey(
        Program, on_delete=models.SET_NULL, null=True, blank=True, related_name="submissions"
    )
    uploaded_form = models.FileField(upload_to="college/enrollment_submissions/")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-submitted_at"]

    def __str__(self):
        return f"{self.applicant_name} - {self.get_status_display()}"


# ====================================================================
# MISSIONS — Partners, Documents (History/Philosophy), Active missions
# ====================================================================

class Partner(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    logo = models.ImageField(upload_to="missions/partners/", blank=True, null=True)
    website_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class MissionDocument(models.Model):
    """'Our document': History or Philosophy of missions."""

    class DocType(models.TextChoices):
        HISTORY = "history", "History"
        PHILOSOPHY = "philosophy", "Philosophy"

    title = models.CharField(max_length=255)
    doc_type = models.CharField(max_length=20, choices=DocType.choices)
    file = models.FileField(upload_to="missions/documents/")
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["doc_type"]

    def __str__(self):
        return f"{self.get_doc_type_display()}: {self.title}"


class ActiveMission(models.Model):
    class Status(models.TextChoices):
        ACTIVE = "active", "Active"
        COMPLETED = "completed", "Completed"

    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="missions/active/", blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)
    start_date = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ["-start_date"]

    def __str__(self):
        return self.name


# ====================================================================
# ABOUT — Beliefs, Leadership (Church & College)
# ====================================================================

class Belief(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    pdf = models.FileField(upload_to="about/beliefs/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name_plural = "Beliefs"

    def __str__(self):
        return self.title


class LeadershipMember(models.Model):
    class Category(models.TextChoices):
        CHURCH = "church", "Church"
        COLLEGE = "college", "College"

    name = models.CharField(max_length=150)
    position = models.CharField(max_length=150, help_text="e.g. 'Senior Pastor', 'Dean of Students'")
    category = models.CharField(max_length=20, choices=Category.choices)
    bio = models.TextField(blank=True)
    image = models.ImageField(upload_to="about/leadership/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["category", "order", "name"]

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


# ====================================================================
# UPDATES — Announcements, Events
# ====================================================================

class Announcement(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to="updates/announcements/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    published_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ["-published_at"]

    def __str__(self):
        return self.title


class Event(models.Model):
    """'is_upcoming' is derived from event_date, so it never needs manual updating."""

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    event_date = models.DateTimeField()
    cover_photo = models.ImageField(upload_to="updates/events/covers/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-event_date"]

    def __str__(self):
        return self.title

    @property
    def is_upcoming(self):
        return self.event_date >= timezone.now()


# ====================================================================
# GALLERY — Photos, browsable by event or by year
# ====================================================================

class GalleryImage(models.Model):
    image = models.ImageField(upload_to="gallery/")
    caption = models.CharField(max_length=255, blank=True)
    event = models.ForeignKey(
        Event, on_delete=models.SET_NULL, null=True, blank=True, related_name="gallery_images"
    )
    year = models.PositiveIntegerField(help_text="Used for the 'By Year' gallery view")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-year", "-uploaded_at"]

    def __str__(self):
        return self.caption or f"Photo #{self.pk}"


# ====================================================================
# PLAN YOUR VISIT — "I'm Visiting" form submissions
# ====================================================================

class VisitRequest(models.Model):
    """A submission from the 'I'm Visiting' form on the Plan Your Visit page."""

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    visit_date = models.DateField(blank=True, null=True)
    notes = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-submitted_at"]
        verbose_name = "Visit request"
        verbose_name_plural = "Visit requests"

    def __str__(self):
        return f"{self.full_name} ({self.submitted_at:%Y-%m-%d})"