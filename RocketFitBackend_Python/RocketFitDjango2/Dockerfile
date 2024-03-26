#--Django Backend

#Base Image
FROM python:3.12

#Working Directory of the Application
WORKDIR /RocketFitDjango2

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV PYTHONPATH /RocketFitDjango2

#Copy and run requirements file containing dependencies into container
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

#Copy project
COPY . .

#Collecting Static Files
RUN python manage.py collectstatic --noinput

#Backend Port Number
EXPOSE 8000

#commands when starting backend
# CMD ["gunicorn", "RocketFitDjango2.wsgi:application", "--bind", "0.0.0.0:8000"
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
