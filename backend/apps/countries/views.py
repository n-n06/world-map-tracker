from rest_framework import generics, permissions
from .models import CountryStatus
from .serializers import CountryStatusSerializer

class CountryStatusListCreateView(generics.ListCreateAPIView):
    serializer_class = CountryStatusSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CountryStatus.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CountryStatusDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CountryStatusSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CountryStatus.objects.filter(user=self.request.user)