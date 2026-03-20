from django.urls import path
from . import views

urlpatterns = [
    # Русская версия (основная)
    path('', views.landing_page, name='landing_page'),
    
    # Английская версия
    path('en/', views.landing_page_en, name='landing_page_en'),
    
    # Азербайджанская версия
    path('az/', views.landing_page_az, name='landing_page_az'),
]