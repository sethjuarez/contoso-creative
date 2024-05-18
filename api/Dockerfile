FROM  python:3.11-slim

WORKDIR /app
COPY requirements.txt .
COPY ./whl/* ./whl/
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

EXPOSE 5000

# CMD [ "python", "-m" , "flask", "run", "--host=0.0.0.0"]
CMD ["gunicorn", "app:app", "-b", "0.0.0.0:5000", "-w", "1"]