REGISTRY=reg.plagiari.sm
PROJECT=elections-mediawatch-client
TAG=`cat VERSION`

REG_PROJ=$(REGISTRY)/$(PROJECT)
REG_TAG=$(REGISTRY)/$(PROJECT):$(TAG)

CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

build:
	yarn build

docker:
	docker build -t $(REG_TAG) .

docker-latest: docker
	docker tag $(REG_TAG) $(REG_PROJ):latest

docker-push:
	docker push $(REG_TAG)

docker-push-latest:
	docker push $(REG_PROJ):latest
