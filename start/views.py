from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib.auth import authenticate, logout, login
from django.http import HttpResponse
from django.contrib.auth.models import User
from database.models import Teacher, Course, Student, StudentCourse


def home(request):
    if '_auth_user_id' not in request.session.keys():
        return redirect('/log')

    user = User.objects.get(id=request.session['_auth_user_id'])

    if 'st' in user.username:
        student = Student.objects.get(user=user)
        courses = StudentCourse.objects.all().filter(student=student)
        return render(request, 'start/student.html', {'courses': courses})
    else:
        teacher = Teacher.objects.get(user=user)
        course = Course.objects.all().filter(tutor=teacher)
        return render(request, 'frontApp/teacherProfile.html', {'teacher': teacher, 'courses': course})



def log(request):
    if request.method == 'POST':
        user = authenticate(username=request.POST['user'], password=request.POST['pass'])
        if user and user.is_active == True:
            login(request, user)
            return redirect('/')
        else:
            return render(request, 'start/log.html', {'message': 'Неверный логин или пароль'})

    return render(request, 'start/log.html')
