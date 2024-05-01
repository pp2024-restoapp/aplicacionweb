from django.urls import path, include
from .views import LoginView, LogoutView, SignupView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
     # Auth views
    path('auth/login/', LoginView.as_view(), name='auth_login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),

    path('auth/signup/',SignupView.as_view(), name='auth_signup'),
]