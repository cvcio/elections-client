protocols:
	protoc \
			-I=$$GOPATH/src/github.com/cvcio/elections-api/proto twitter.proto \
			--js_out=import_style=commonjs:./src/proto \
			--grpc_out=import_style=commonjs,mode=grpcwebtext:./src/proto \
			--plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`
