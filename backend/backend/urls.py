from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.api.urls')),
    path('', TemplateView.as_view(template_name="index.html")),
    path('anime/<int>/', TemplateView.as_view(template_name="index.html")),
    path('search/<string>/', TemplateView.as_view(template_name="index.html")),
    path('profile/', TemplateView.as_view(template_name="index.html")),

]
