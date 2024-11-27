FROM --platform=linux/amd64 node:22 AS node
FROM --platform=linux/amd64 python:3.10

ARG ODSA_ENV="DEV"
ENV ODSA_ENV=${ODSA_ENV}

ARG FLASK_ENV="development"
ENV FLASK_ENV=${FLASK_ENV}
ARG FLASK_APP='app.py'
ENV FLASK_APP=${FLASK_APP}

ENV PYTHONUNBUFFERED=1
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# RUN apk update
# RUN apk add --no-cache bash git curl make

RUN apt-get update
RUN apt-get install -y bash git curl make

COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/share /usr/local/share
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

WORKDIR /opendsa

RUN npm install -g corepack
COPY .yarnrc.yml ./
COPY package.json yarn.lock ./
RUN yarn install

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

CMD ["make", "help", "webserver"]
