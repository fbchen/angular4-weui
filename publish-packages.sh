#!/usr/bin/env bash

set -ex

# 切换到根目录
ROOT=`pwd`

PACKAGE="angular4-weui"
OUTDIR="${ROOT}/dist/${PACKAGE}"
PACKAGE_NAME="angular-weui"


N="
"
TSC=${ROOT}/node_modules/.bin/tsc
NGC=${ROOT}/node_modules/.bin/ngc
UGLIFYJS=${ROOT}/node_modules/.bin/uglifyjs
ROLLUP=${ROOT}/node_modules/.bin/rollup
LICENSE_BANNER=${ROOT}/license-banner.txt

# 检查版本号是否已设置
VERSION=$(node -p "require('./package.json').version")

if [[ "${VERSION}" == "" ]]
then
  echo "Version number required"
  exit 1
fi

# clean output
rm -rf ${OUTDIR}

# ngc编译
TSCONFIG="${ROOT}/src/app/weui/tsconfig.json"
echo "====== ngc begin to compile typescript files.....\n"
  $TSC -p ${TSCONFIG}
  echo "======           Create ${PACKAGE_NAME}.d.ts re-export file for Closure"
  echo "$(cat ${LICENSE_BANNER})${N}export * from './index'" > ${OUTDIR}/${PACKAGE_NAME}.d.ts
  echo "{\"__symbolic\":\"module\",\"version\":3,\"metadata\":{},\"exports\":[{\"from\":\"./index\"}],\"flatModuleIndexRedirect\":true}" > ${OUTDIR}/${PACKAGE_NAME}.metadata.json
echo "====== ngc compiles typescript files to dir: ${OUTDIR} \n"

# rollup - 摇树优化（Tree shaking）[Rollup只能对ES2015模块摇树, 因此tsconfig.json要配置为"module": "es2015"]
echo "====== rollup begins .....\n"
  $ROLLUP -c ${ROOT}/rollup.config.js
echo "====== rollup completes.\n"

# uglifyjs
echo "====== uglifyjs begins .....\n"
  $UGLIFYJS  ${OUTDIR}/es2005/index.umd.js --screw-ie8 --compress --mangle --comments --output  ${OUTDIR}/es2005/index.umd.min.js
echo "====== uglifyjs completes.\n"

# copy files: package.json, README.md, css files
SRCDIR="./src/app/weui"
DESTDIR=./dist/${PACKAGE}

cp ${SRCDIR}/package.json  ${DESTDIR}/
cp ./README.md             ${DESTDIR}/
cp -rf ${SRCDIR}/css       ${DESTDIR}/

(
    echo "======   Updating to VERSION: ${VERSION}"
    cd ${DESTDIR}
    echo "======   EXECUTE: perl -p -i -e \"s/0\.0\.0\-PLACEHOLDER/${VERSION}/g\" $""(grep -ril 0\.0\.0\-PLACEHOLDER .)"
    perl -p -i -e "s/0\.0\.0\-PLACEHOLDER/${VERSION}/g" $(grep -ril 0\.0\.0\-PLACEHOLDER .) < /dev/null 2> /dev/null
)

echo "====== PUBLISHING: ${DESTDIR} ====="


#npm login [fbchen]
#npm publish ${DESTDIR}
