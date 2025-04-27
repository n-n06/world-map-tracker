from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class CountryStatus(models.Model):
    STATUS_CHOICES = [
        ("visited", "Visited"),
        ("want_to_visit", "Want to Visit"),
        ("not_visited", "Not Visited"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="country_statuses")
    country_code = models.CharField(max_length=3)  # ISO 3166-1 alpha-3
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.country_code} ({self.status})"