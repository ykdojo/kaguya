# Use the official Node.js 14 Debian-based image as the base image
FROM node:14-bullseye-slim

# Set the working directory
WORKDIR /kaguya

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Install Python, Git, Curl, and build dependencies
RUN apt-get update && \
    apt-get install -y python3 python3-pip git curl build-essential gfortran && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN pip3 install numpy pandas python-dotenv yfinance moviepy PyYAML selenium beautifulsoup4 requests html2text tiktoken

# Install Firefox and GeckoDriver (WebDriver for Firefox)
RUN apt-get update && \
    apt-get install -y firefox-esr wget && \
    wget -q https://github.com/mozilla/geckodriver/releases/download/v0.30.0/geckodriver-v0.30.0-linux64.tar.gz -O /tmp/geckodriver.tar.gz && \
    tar -xzf /tmp/geckodriver.tar.gz -C /usr/local/bin && \
    rm /tmp/geckodriver.tar.gz && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN ln -s /usr/bin/python3 /usr/bin/python

# Install Chrome and ChromeDriver (WebDriver for Chrome)
RUN apt-get update && \
    apt-get install -y wget unzip && \
    wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    dpkg -i google-chrome-stable_current_amd64.deb || apt-get install -yf && \
    rm google-chrome-stable_current_amd64.deb && \
    wget -q https://chromedriver.storage.googleapis.com/$(wget -qO- https://chromedriver.storage.googleapis.com/LATEST_RELEASE)/chromedriver_linux64.zip && \
    unzip chromedriver_linux64.zip -d /usr/local/bin && \
    rm chromedriver_linux64.zip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user named 'appuser' and set ownership of the /kaguya directory
RUN useradd -m appuser && chown -R appuser /kaguya

# Switch to the 'appuser' user
USER appuser

# Set Git identity
ARG GIT_NAME
ARG GIT_EMAIL
RUN git config --global user.name "$GIT_NAME"
RUN git config --global user.email "$GIT_EMAIL"
# Add an exception for the /app directory to resolve Git ownership issues
RUN git config --global --add safe.directory /kaguya

# Ensure the ownership of the Git repository is set to 'appuser' if the .git directory exists
RUN if [ -d "/kaguya/.git" ]; then chown -R appuser /kaguya/.git; fi

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
