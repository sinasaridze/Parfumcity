from django.shortcuts import render

def landing_page(request):
    """Русская версия лендинга"""
    return render(request, 'landing/ru/index.html')

def landing_page_en(request):
    """Английская версия лендинга"""
    return render(request, 'landing/en/index.html')

def landing_page_az(request):
    """Азербайджанская версия лендинга"""
    return render(request, 'landing/az/index.html')

def handler404(request, exception):
    """Обработчик 404 ошибки"""
    return render(request, 'landing/404.html', status=404)

def handler500(request):
    """Обработчик 500 ошибки"""
    return render(request, 'landing/500.html', status=500)