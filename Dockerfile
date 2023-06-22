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

# Install FFmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install numpy
RUN pip3 install numpy

# Install the youtube_transcript_api package, python-dotenv, and snowflake-connector-python
RUN pip3 install youtube_transcript_api python-dotenv snowflake-connector-python

# Install pandas
RUN pip3 install pandas

# Install yfinance
RUN pip3 install yfinance

# Install moviepy
RUN pip3 install moviepy

# Install PyYAML
RUN pip3 install PyYAML

# Install Selenium
RUN pip3 install selenium

# Install Beautiful Soup
RUN pip3 install beautifulsoup4

# Install Requests
RUN pip3 install requests

# Install Firefox and GeckoDriver (WebDriver for Firefox)
RUN apt-get update && \
    apt-get install -y firefox-esr wget && \
    wget -q https://github.com/mozilla/geckodriver/releases/download/v0.30.0/geckodriver-v0.30.0-linux64.tar.gz -O /tmp/geckodriver.tar.gz && \
    tar -xzf /tmp/geckodriver.tar.gz -C /usr/local/bin && \
    rm /tmp/geckodriver.tar.gz && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN ln -s /usr/bin/python3 /usr/bin/python

# Install the latest version of youtube-dl
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

# Install html2text
RUN pip3 install html2text

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

RUN pip3 install tiktoken

# Create a non-root user named 'appuser' and set ownership of the /kaguya directory
RUN useradd -m appuser && chown -R appuser /kaguya

# Switch to the 'appuser' user
USER appuser

# Set Git identity
RUN git config --global user.email "yksu@csdojo.io"
RUN git config --global user.name "ykdojo"
# Add an exception for the /app directory to resolve Git ownership issues
RUN git config --global --add safe.directory /kaguya

# Ensure the ownership of the Git repository is set to 'appuser' if the .git directory exists
RUN if [ -d "/kaguya/.git" ]; then chown -R appuser /kaguya/.git; fi

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
