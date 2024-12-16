FROM postgres:latest

ENV POSTGRES_PASSWORD=yourpassword
ENV POSTGRES_USER=yourusername
ENV POSTGRES_DB=yourdb

COPY ./supabase/* /docker-entrypoint-initdb.d/

