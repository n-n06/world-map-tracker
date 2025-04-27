from django.urls import path
from .views import CountryStatusListCreateView, CountryStatusDetailView

urlpatterns = [
    path("", CountryStatusListCreateView.as_view(), name="country_status_list_create"),
    path("<int:pk>/", CountryStatusDetailView.as_view(), name="country_status_detail"),
]