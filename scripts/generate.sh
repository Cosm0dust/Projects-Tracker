#!/bin/bash

MODULE_NAME=$1

if [ -z "$MODULE_NAME" ]; then
  echo "Please provide a module name."
  exit 1
fi

# Generate the module, controller, and service
nest g module $MODULE_NAME --no-spec
nest g controller $MODULE_NAME --no-spec
nest g service $MODULE_NAME --no-spec
nest g class $MODULE_NAME/$MODULE_NAME.entity --no-spec --flat
