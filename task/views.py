from django.shortcuts import render,redirect
from database.models import Course, Lesson, Activity,Task, Answer
from django.http import JsonResponse


# Create your views here.
def courses(request, id):
    lessons = Lesson.objects.all().filter(course=id)

    teacher = Course.object.get(id=id).tutor

    return render(request, 'frontApp/lessonsPage.html', {'lessons': lessons, 'id': id, 'teacher': teacher})


def update(request,id):
    if request.method == 'POST':
        lesson_name = request.POST['lesson_name']
    obj = Lesson(title = lesson_name,course = Course.objects.get(id=id))
    obj.save()
    return JsonResponse({"id": obj.id})

def lesson(request, id_course, id_lesson):
    lessons = Activity.objects.all().filter(lesson=id_lesson)

    return render(request, 'task/tasks.html', {'lessons': lessons, 'id_course': id_course, 'id_lesson': id_lesson})

def present(request,id_course, id_lesson):
    if request.method == 'POST':
        present_name = request.POST['present_name']
        present_url = request.POST['present_url']
    obj_act = Activity(title = present_name, lesson = Lesson.objects.get(id=id_lesson))
    obj_act.save()
    obj_url = Task(type = 1,  activity= Activity.objects.get(id=obj_act.id), content =  present_url)
    obj_url.save()

    return redirect('/courses/{}/{}/'.format(id_course,id_lesson))

    # return JsonResponse({"id": obj.id})

def task(request,id_course, id_lesson):
    if request.method == 'POST':
        task_name = request.POST['task_name']
        task_content = request.POST['task_content']
        task_answer = request.POST['task_answer']
        task_correct_answer = request.POST['task_correct_answer']
    obj_act = Activity(title = task_name,lesson = Lesson.objects.get(id=id_lesson))
    obj_act.save()
    obj_content = Task(type = 2,  activity= Activity.objects.get(id=obj_act.id), content =  task_content)
    obj_content.save()
    for i in task_answer.split(','):
        obj_answer = Answer(text= i, correct = False, task = Task.objects.get(id=obj_content.id))
    obj_answer = Answer(text= task_correct_answer , correct = True, task = Task.objects.get(id=obj_content.id))
    obj_answer.save()
    return redirect('/courses/{}/{}/'.format(id_course, id_lesson))