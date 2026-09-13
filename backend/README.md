# Church & College Website — Backend (single app)

Django + Django REST Framework backend, built as **one app** (`core`)
instead of splitting into several — everything lives in `core/models.py`,
`core/admin.py`, `core/serializers.py`, `core/views.py`, `core/urls.py`,
organized into commented sections (Church, College, Missions, About,
Updates, Gallery).

## Project layout

```
website_backend/
├── manage.py
├── requirements.txt
├── website/            # project settings, root urls, permissions
└── core/                # the one app — everything lives here
    ├── models.py         # all models, grouped by section
    ├── admin.py           # all admin registrations
    ├── serializers.py     # all DRF serializers
    ├── views.py           # all DRF viewsets
    └── urls.py            # all API routes
```

## Setup

```bash
cd website_backend

python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate

python manage.py createsuperuser

python manage.py runserver
```

Then visit:
- `http://127.0.0.1:8000/admin/` — sign-in panel + content management
- `http://127.0.0.1:8000/api/` — browsable API root

## Public vs Admin

Public visitors can only **read** (GET). Only signed-in Admins can
create/edit/delete. `counseling-requests` and `enrollment-submissions`
are the exception — the public can **submit** (POST) those, but only
admins can view/manage them, since they're inbound forms.

## API endpoints

All under `/api/`:

| Endpoint | Notes |
|---|---|
| `sermons/` | title, description, youtube_link, pdf |
| `biblical-resources/` | devotionals & revelations PDFs |
| `counseling-requests/` | public POST only; admin-only read |
| `faqs/` | "Got Questions" |
| `programs/` | College programs offered — each can have an optional `document` (curriculum/brochure PDF) alongside its image |
| `enrollment-forms/` | downloadable templates |
| `enrollment-submissions/` | public POST only; admin-only read |
| `partners/` | mission partners |
| `mission-documents/` | history / philosophy |
| `active-missions/` | active missions |
| `beliefs/` | title, description, PDF |
| `leadership/` | `?category=church` or `?category=college` |
| `announcements/` | |
| `events/` | `?when=upcoming` or `?when=past` |
| `gallery/` | `?event=<id>` or `?year=<yyyy>` |
| `auth/` (at `/api/auth/`) | DRF login/logout (browsable API) |

### Example: fetch upcoming events from `app.js`

```javascript
fetch("http://127.0.0.1:8000/api/events/?when=upcoming")
  .then((res) => res.json())
  .then((data) => console.log(data.results));
```

### Optional: token-based admin login for a JS admin dashboard

Add to `website/urls.py`:

```python
from rest_framework.authtoken.views import obtain_auth_token
urlpatterns += [path("api/token-auth/", obtain_auth_token)]
```

From `app.js`:

```javascript
const res = await fetch("http://127.0.0.1:8000/api/token-auth/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password }),
});
const { token } = await res.json();
// then send: headers: { Authorization: `Token ${token}` }
```

## Environment variables (optional, for production)

```
DJANGO_SECRET_KEY=replace-with-a-long-random-string
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DJANGO_CORS_ORIGINS=https://yourdomain.com
```
