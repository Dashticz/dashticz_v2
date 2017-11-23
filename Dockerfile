# Dockerfile for Dashticz
FROM nginx

USER root

RUN apt-get update
RUN apt-get install -y nginx --no-install-recommends

# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/nginx.conf

# Copy a configuration file from the current directory
COPY nginx.conf /etc/nginx/

RUN rm -rf /usr/share/nginx/html/

# Append "daemon off;" to the beginning of the configuration
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Expose ports
EXPOSE 90

# Set the default command to execute
# when creating a new container
CMD service nginx start