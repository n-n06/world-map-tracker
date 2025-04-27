from rest_framework import serializers
from .models import CountryStatus

import iso3166

class CountryStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryStatus
        fields = ["id", "country_code", "status"]

    def validate_country_code(self, value):
        if value.upper() not in list(iso3166.countries_by_alpha2.keys()):
            raise serializers.ValidationError("Invalid ISO 3166-1 alpha-2 country code.")
        return value.upper()  # Always store it uppercase (like "USA", not "usa")