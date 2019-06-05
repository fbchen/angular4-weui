#!/usr/bin/env bash

set -u -e -o #-x

readonly currentDir=$(cd $(dirname $0); pwd)
source ${currentDir}/.scripts/_travis-fold.sh

# TODO(i): wrap into subshell, so that we don't pollute CWD, but not yet to minimize diff collision with Jason
cd ${currentDir}




#######################################
# Verifies a directory isn't in the ignored list
# Arguments:
#   param1 - Path to check
# Returns:
#   Boolean
#######################################
isIgnoredDirectory() {
  name=$(basename ${1})
  if [[ -f "${1}" || "${name}" == "src" || "${name}" == "test" || "${name}" == "integrationtest" ]]; then
    return 0
  else
    return 1
  fi
}

#######################################
# Check if array contains an element
# Arguments:
#   param1 - Element to check
#   param2 - Array to look for element in
# Returns:
#   None
#######################################
containsElement () {
  local e
  for e in "${@:2}"; do [[ "$e" == "$1" ]] && return 0; done
  return 1
}

#######################################
# Downlevel ES2015 to ESM/ES5
# Arguments:
#   param1 - Source folder
#   param2 - Naming suffix to apply. Must end in ".ts" (defaults to .es5.ts)
# Returns:
#   None
#######################################
downlevelES2015() {
  # Iterate over the files in this directory, converting to .es5.ts
  regex="(.+).js"
  for file in ${1}/*.js ; do
    if [[ ${file} =~ $regex ]]; then
      ts_file="${BASH_REMATCH[1]}${2:-".es5.ts"}"
      cp ${file} ${ts_file}

      echo "======           $TSC ${ts_file} --target es5 --module es2015 --noLib --sourceMap --importHelpers"
      ($TSC ${ts_file} --target es5 --module es2015 --noLib --sourceMap --importHelpers) > /dev/null 2>&1 || true
      mapSources "${BASH_REMATCH[1]}${2:-".es5.js"}"
      rm -f ${ts_file}
    fi
  done

  # Recurse for sub directories
  for DIR in ${1}/* ; do
    isIgnoredDirectory ${DIR} && continue
    downlevelES2015 ${DIR}
  done
}

#######################################
# Rollup index files recursively, ignoring blacklisted directories
# Arguments:
#   param1 - Base source folder
#   param2 - Destination directory
#   param3 - Config file
# Returns:
#   None
#######################################
rollupIndex() {
  # Iterate over the files in this directory, rolling up each into ${2} directory
  local regex=".+/(.+)/index.js"            # 例如：匹配 `project`/dist/packages/(angular-weui)/index.js
  if [[ "${1}/index.js" =~ $regex ]]; then
    in_file="${1}/index.js"
    #out_file="${2}/${BASH_REMATCH[1]}.js"  # 输出文件：{MODULES_DIR}/angular-weui.js，具体例子：`project`/dist/dist-packages/angular-weui/es2015/angular-weui.js
    out_file="${2}/index.js"                # fbchen: 还是直接采用index.js名字，不改名

    echo "======           $ROLLUP -i ${in_file} -o ${out_file}"

    if [[ -f "${3}" ]]; then
      $ROLLUP -i ${in_file} -o ${out_file} -c ${3} --sourcemap --format esm
    else
      $ROLLUP -i ${in_file} -o ${out_file} --sourcemap --format esm
    fi
    cat ${LICENSE_BANNER} > ${out_file}.tmp
    cat ${out_file} >> ${out_file}.tmp
    mv ${out_file}.tmp ${out_file}

    mapSources "${out_file}"
  fi
}


#######################################
# Recursively runs rollup on any entry point that has a "rollup.config.js" file
# Arguments:
#   param1 - Base source folder containing rollup.config.js
# Returns:
#   None
#######################################
runRollup() {
  local regex="dest: ['\"](.+)['\"],*"
  if [[ -f "${1}/rollup.config.js" ]]; then
    cd ${1}

    echo "======           $ROLLUP -c ${1}/rollup.config.js"
    $ROLLUP -c rollup.config.js --sourcemap

    local dest_line=$(cat "${1}/rollup.config.js" | grep 'dest:')
    if [[ ${dest_line} =~ $regex ]]; then
      mapSources "${BASH_REMATCH[1]}"
    fi
  fi
}

#######################################
# Adds banners to all files in a directory
# Arguments:
#   param1 - Directory to add license banners to
# Returns:
#   None
#######################################
addBanners() {
  for file in ${1}/*; do
    if [[ -f ${file} && "${file##*.}" != "map" ]]; then
      cat ${LICENSE_BANNER} > ${file}.tmp
      cat ${file} >> ${file}.tmp
      mv ${file}.tmp ${file}
    fi
  done
}

#######################################
# Minifies files in a directory
# Arguments:
#   param1 - Directory to minify
# Returns:
#   None
#######################################
minify() {
  # Iterate over the files in this directory, rolling up each into ${2} directory
  regex="(.+).js"
  files=(${1}/*)
  echo "${files[@]}"
  for file in "${files[@]}"; do
    echo "${file}"
    base_file=$( basename "${file}" )
    if [[ "${base_file}" =~ $regex && "${base_file##*.}" != "map" ]]; then
      local out_file=$(dirname "${file}")/${BASH_REMATCH[1]}.min.js
      $UGLIFYJS -c --screw-ie8 --comments -o ${out_file} --source-map ${out_file}.map --source-map-include-sources ${file}
      mapSources "${out_file}"
    fi
  done
}

#######################################
# Recursively compile package
# Arguments:
#   param1 - Source directory
#   param2 - Out dir
#   param3 - Package Name
#   param4 - Is child (are we recursing?)
# Returns:
#   None
#######################################
compilePackage() {
  echo "======      [${3}]: COMPILING: ${NGC} -p ${1}/tsconfig.json"

  # 编译
  (
    local package_name=$(basename "${2}")
    $NGC -p ${1}/tsconfig.json
    echo "======           Create ${2}/../${package_name}.d.ts re-export file for Closure"
    echo "$(cat ${LICENSE_BANNER})\nexport * from './${package_name}/index';" > ${2}/../${package_name}.d.ts
    echo "{\"__symbolic\":\"module\",\"version\":3,\"metadata\":{},\"exports\":[{\"from\":\"./${package_name}/index\"}],\"flatModuleIndexRedirect\":true}" > ${2}/../${package_name}.metadata.json
  )
}

#######################################
# Moves typings and metadata files appropriately
# Arguments:
#   param1 - Source of typings & metadata files
#   param2 - Root of destination directory
#   param3 - Package name (needed to correspond to name of d.ts and metadata.json files)
# Returns:
#   None
#######################################
moveTypings() {
  if [[ -f ${1}/index.d.ts && -f ${1}/index.metadata.json ]]; then
    mv ${1}/index.d.ts ${1}/${2}.d.ts
    mv ${1}/index.metadata.json ${1}/${2}.metadata.json
  fi
}

#######################################
# Adds a package.json in directories where needed (secondary entry point typings).
# This is read by NGC to be able to find the flat module index.
# Arguments:
#   param1 - Source directory of typings files
# Returns:
#   None
#######################################
addNgcPackageJson() {
  for DIR in ${1}/* ; do
    [ -d "${DIR}" ] || continue
    # Confirm there is an index.d.ts and index.metadata.json file. If so, create
    # the package.json and recurse.
    if [[ -f ${DIR}/index.d.ts && -f ${DIR}/index.metadata.json ]]; then
      echo '{"typings": "index.d.ts"}' > ${DIR}/package.json
      addNgcPackageJson ${DIR}
    fi
  done
}

#######################################
# This is read by NGC to be able to find the flat module index.
# Arguments:
#   param1 - JavaScript file on which to re-map sources
# Returns:
#   None
#######################################
mapSources() {
  if [[ -f "${1}.map" ]]; then
    $MAP_SOURCES -f "${1}"
  fi
}





# 从工程的根目录的package.json取版本号(version)，作为本次新版本的npm包的版本
#（所以打包发布前，需先修改根目录的package.json）
VERSION_PREFIX=$(node -p "require('./package.json').version")
# 编译源码
COMPILE_SOURCE=true
# 打成NPM包（如ES2015、ES5、commonjs等杂七杂八的版本）
BUNDLE=true

# 编译打包开始
PACKAGE=weui                                  # 这是源码目录名称
PACKAGE_OUT=angular-weui                      # 这是编译输出目录名称，这俩目录一般是一样的名字即可，我这里稍微不同
VERSION="${VERSION_PREFIX}"
echo "====== BUILDING: Version ${VERSION}"

# 打包命令
TSC=`pwd`/node_modules/.bin/tsc
NGC=`pwd`/node_modules/.bin/ngc
UGLIFYJS=`pwd`/node_modules/.bin/uglifyjs
ROLLUP=`pwd`/node_modules/.bin/rollup
MAP_SOURCES="node `pwd`/.scripts/map_sources.js "



# 清理目录
rm -rf ./dist/packages
rm -rf ./dist/publish-dist


# 执行打包
(
  travisFoldStart "build package: ${PACKAGE}" "no-xtrace"
  PWD=`pwd`
  ROOT=${PWD}
  ROOT_DIR=${ROOT}/src/app
  SRC_DIR=${ROOT_DIR}/${PACKAGE} # ${PWD}/src/app/weui
  ROOT_OUT_DIR=${ROOT}/dist/packages
  OUT_DIR=${ROOT_OUT_DIR}/${PACKAGE_OUT}
  NPM_DIR=${ROOT}/dist/publish-dist/${PACKAGE_OUT}
  MODULES_DIR=${NPM_DIR}/es2015
  BUNDLES_DIR=${NPM_DIR}/bundles

  LICENSE_BANNER=${ROOT}/license-banner.txt

  # 第一步(compile source)：编译配置文件tsconfig.json输出es2015格式，输出至 OUT_DIR
  if [[ ${COMPILE_SOURCE} == true ]]; then
    rm -rf ${OUT_DIR}
    rm -f ${ROOT_OUT_DIR}/*.d.ts
    rm -f ${ROOT_OUT_DIR}/*.metadata.json
    compilePackage ${SRC_DIR} ${OUT_DIR} ${PACKAGE}
  fi

  if [[ ${BUNDLE} == true ]]; then
    echo "======      BUNDLING ${PACKAGE}: ${SRC_DIR} ====="
    rm -rf ${NPM_DIR} && mkdir -p ${NPM_DIR}

    # downlevelES2015 to es5 + rollup + minify
    (
      # 将第一步(compile source)在OUT_DIR的输出 (*.d.ts和*.metadata.json)，
      # 其中如 index.d.ts、index.metadata.json，和src目录下的 xxx.d.ts，直接拷贝到 NPM_DIR
      echo "======        Copy ${PACKAGE} typings"
      rsync -a --exclude=*.js --exclude=*.js.map ${OUT_DIR}/ ${NPM_DIR}

      # 将上一步的 NPM_DIR目录下的 index.d.ts 重命名为 PACKAGE_OUT.d.ts, index.metadata.json 重命名为 PACKAGE_OUT.metadata.json
      # moveTypings ${NPM_DIR} ${PACKAGE_OUT}
      ### fbchen: 我这里注释掉，不需要改名，直接用`index`

      # 摇树优化 + 最小化压制
      (
        cd  ${SRC_DIR}
        # step 1
        # 将第一步(compile source)OUT_DIR的输出 (index.js) 拷贝 至 模块目录 (如`es2015`)。
        # 拷贝过程中摇掉一些多余的代码（默认的摇树优化）；第一步产生的 index.js 不删除。
        echo "======         Rollup ${PACKAGE}"
        rollupIndex ${OUT_DIR} ${MODULES_DIR} ${ROOT_DIR}
        # 这里的输出文件是 /es2015/index.js，将作为 npm 包的 `es2015` 指定的文件

        # step 2
        # 将上一步摇树优化后的index.js，从es2015降级为es5，文件后缀为.es5.js
        echo "======         Downleveling ES2015 to ESM/ES5"
        downlevelES2015 ${MODULES_DIR}
        # 这里的输出文件是 /es2015/index.es5.js，将作为 npm 包的 `module` 指定的文件

        # step 3
        # 根据配置文件rollup.config.js，对上一步的*.es5.js 摇树优化，输出至 bundles 目录，生成的文件名后缀为 .umd.js
        # 这里的输出文件将是 /bundles/index.umd.js，将作为 npm 包的 主入口 `main` 指定的文件
        echo "======         Run rollup conversions on ${PACKAGE}"
        runRollup ${SRC_DIR}
        # 文件头部加入版权注释
        addBanners ${BUNDLES_DIR}
        # 最小化压制
        minify ${BUNDLES_DIR}

      ) 2>&1 | grep -v "as external dependency"
    )

    # 拷贝 npm 包的所需的描述文件 `package.json` 至发布目录
    echo "======        Copy ${PACKAGE} package.json"
    rsync -am --include="package.json" --include="*/" --exclude=* ${SRC_DIR}/ ${NPM_DIR}/

    # 拷贝 README 和 CSS样式文件 至发布目录
    cp ${ROOT}/README.md ${NPM_DIR}/
    cp -rf ${SRC_DIR}/css ${NPM_DIR}/
    # 清理中间过程文件（在 tsconfig.json 的 angularCompilerOptions.genDir 中指定，不指定则直接在src目录下生成过程文件！）
    rm -rf ${ROOT}/dist/aot
  fi

  # 最后，更新 `package.json` 文件的版本号
  if [[ -d ${NPM_DIR} ]]; then
    (
      echo "======      VERSION: Updating version references"
      cd ${NPM_DIR}
      echo "======       EXECUTE: perl -p -i -e \"s/0\.0\.0\-PLACEHOLDER/${VERSION}/g\" $""(grep -ril 0\.0\.0\-PLACEHOLDER .)"
      perl -p -i -e "s/0\.0\.0\-PLACEHOLDER/${VERSION}/g" $(grep -ril 0\.0\.0\-PLACEHOLDER .) < /dev/null 2> /dev/null
    )
  fi

  travisFoldEnd "build package: ${PACKAGE}"
)


# Print return arrows as a log separator
travisFoldReturnArrows

# 最后，发布（手动执行）
# cd ./dist/publish-dist/angular-weui
# npm publish
