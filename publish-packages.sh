#!/usr/bin/env bash

set -ex

# 切换到根目录
ROOT=`pwd`

PACKAGE="angular4-weui"
OUTDIR="${ROOT}/dist/${PACKAGE}"

N="
"
TSC=${ROOT}/node_modules/.bin/tsc
NGC=${ROOT}/node_modules/.bin/ngc
UGLIFYJS=${ROOT}/node_modules/.bin/uglifyjs
ROLLUP=${ROOT}/node_modules/.bin/rollup

# 检查版本号是否已设置
VERSION=$(node -p "require('./package.json').version")

if [[ "${VERSION}" == "" ]]
then
  echo "Version number required"
  exit 1
fi

# clean
rm -rf ${ROOT}/dist/angular4-weui

# ngc编译
TSCONFIG="${ROOT}/src/app/weui/tsconfig.json"
echo "====== ngc begin to compile typescript files.....\n"
  $TSC -p ${TSCONFIG}

echo "====== ngc compiles typescript files to dir: ${OUTDIR} \n"

# rollup - 摇树优化（Tree shaking）[Rollup只能对ES2015模块摇树, 因此tsconfig.json要配置为"module": "es2015"]
echo "====== rollup begins .....\n"
  $ROLLUP -c ${ROOT}/rollup.config.js
echo "====== rollup completes.\n"

# uglifyjs
echo "====== uglifyjs begins .....\n"
  $UGLIFYJS  ${OUTDIR}/bundles/angular-weui.umd.js --screw-ie8 --compress --mangle --comments --output  ${OUTDIR}/bundles/angular-weui.umd.min.js
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
