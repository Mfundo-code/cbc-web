from rest_framework.permissions import SAFE_METHODS, BasePermission


class AllowPublicCreateAdminReadWrite(BasePermission):
    """
    For things the public submits but only admins should read back, e.g.
    counseling requests and enrollment submissions:

      - POST (create)            -> anyone (the public submitting a form)
      - GET/PUT/PATCH/DELETE      -> authenticated admins only
    """

    def has_permission(self, request, view):
        if request.method == "POST":
            return True
        if request.method in SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated)
        return bool(request.user and request.user.is_authenticated)
