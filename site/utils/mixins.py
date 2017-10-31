from django.shortcuts import get_object_or_404


class MultipleFieldLookupMixin(object):
    """
    Apply this mixin to any view or viewset to get multiple field filtering
    based on a `lookup_fields` attribute, instead of the default single field filtering.
    Source: Django REST Framework Documentation
    """

    def get_object(self):
        queryset = self.get_queryset()             # Get the base queryset
        queryset = self.filter_queryset(queryset)  # Apply any filter backends
        filter = {}
        if self.lookup_url_kwargs: # If there are specific URL kwargs
            fields = zip(self.lookup_fields, self.lookup_url_kwargs)
        else:
            fields = zip(self.lookup_fields, self.lookup_fields)
        for field, url_kwarg in fields:
            if self.kwargs[url_kwarg]:  # Ignore empty fields.
                filter[field] = self.kwargs[url_kwarg]
        obj = get_object_or_404(queryset, **filter)  # Lookup the object
        self.check_object_permissions(self.request, obj)
        return obj
