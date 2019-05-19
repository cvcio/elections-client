FROM golang:1.9

RUN apt-get update \
    && apt-get install -y \
    wget \
    tar

RUN mkdir -p /usr/src/app \
    && curl -SL https://github.com/plagiari-sm/svc-serve-static/releases/download/v0.2.2/serve-static_0.2.2_linux_amd64.tar.gz \
    | tar xz -C /usr/src/app

COPY ./servestatic.yaml /usr/src/app/conf/default.yaml
COPY ./dist /usr/src/app/dist

WORKDIR /usr/src/app
EXPOSE 8000

CMD ["/usr/src/app/serve-static"]
