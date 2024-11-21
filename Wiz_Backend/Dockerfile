FROM python:3.9-slim

WORKDIR /Wiz_Backend

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

#RUN python -m unittest unit_tests.py

CMD ["python", "run.py"]
