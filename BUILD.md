# 预编译（AOT） vs 即时编译（JIT）

事实上只有一个Angular编译器，AOT和JIT之间的差别仅仅在于编译的时机和所用的工具。 使用AOT，编译器仅仅使用一组库在构建期间运行一次；使用JIT，编译器在每个用户的每次运行期间都要用不同的库运行一次。

##为什么需要AOT编译？
- 渲染得更快

使用AOT，浏览器下载预编译版本的应用程序。 浏览器直接加载运行代码，所以它可以立即渲染该应用，而不用等应用完成首次编译。

- 需要的异步请求更少

编译器把外部html模板和css样式表内联到了该应用的JavaScript中。 消除了用来下载那些源文件的Ajax请求。

- 需要下载的Angular框架体积更小

如果应用已经编译过了，自然不需要再下载Angular编译器了。 该编译器差不多占了Angular自身体积的一半儿，所以，省略它可以显著减小应用的体积。

- 提早检测模板错误

AOT编译器在构建过程中检测和报告模板绑定错误，避免用户遇到这些错误。

- 更安全

AOT编译远在HTML模版和组件被服务到客户端之前，将它们编译到JavaScript文件。 没有模版可以阅读，没有高风险客户端HTML或JavaScript可利用，所以注入攻击的机会较少。

##用AOT进行编译
```bas
npm install @angular/compiler-cli @angular/platform-server --save
```

要用@angular/compiler-cli包中提供的ngc编译器来代替TypeScript编译器（tsc）。

ngc是一个tsc的高仿替代品，它们的配置方式几乎完全一样。

ngc需要自己的带有AOT专用设置的tsconfig.json。 把原始的tsconfig.json拷贝到一个名叫tsconfig-aot.json的文件中，然后像这样修改它 (src/app/weui/tsconfig-aot.json)

compilerOptions部分只修改了一个属性：**把module设置为es2015。 这一点非常重要，我们会在后面的摇树优化部分解释为什么。
ngc区真正新增的内容是底部的angularCompilerOptions。 它的"genDir"属性告诉编译器把编译结果保存在新的aot目录下。
"skipMetadataEmit" : true属性阻止编译器为编译后的应用生成元数据文件。 当输出成TypeScript文件时，元数据并不是必须的，因此不需要包含它们。

##编译该应用
在命令行中执行下列命令，借助刚安装好的ngc编译器来启动AOT编译：
```bas
node_modules/.bin/ngc -p tsconfig-aot.json
```

#摇树优化（Tree Shaking）

AOT编译为接下来通过一个叫做摇树优化的过程做好了准备。 摇树优化器从上到下遍历依赖图谱，并且摇掉用不到的代码，这些代码就像是圣诞树中那些死掉的松针一样。

通过移除源码和库代码中用不到的部分，摇树优化可以大幅缩减应用的下载体积。 事实上，在小型应用中大部分的缩减都是因为筛掉了那些没用到的Angular特性。

摇树优化和AOT编译是单独的步骤。 摇树优化不仅针对JavaScript代码。 AOT编译会把应用中的大部分都转换成JavaScript，这种转换会让应用更容易被“摇树优化”。


##Inline HTML and CSS
Inline Angular HTML and CSS files into JavaScript ES5/ES6 and TypeScript files.

```bas
npm install gulp-inline-ng2-template --save-dev
```

##Rollup
这个烹饪宝典中用来示范的摇树优化工具是Rollup。

Rollup会通过跟踪import和export语句来对本应用进行静态分析。 它所生成的最终代码捆中会排除那些被导出过但又从未被导入的代码。

Rollup只能对ES2015模块摇树，因为那里有import和export语句。(回忆一下，tsconfig-aot.json中曾配置为生成ES2015的模块。 代码本身是否用到了ES2015语法（例如class和const）并不重要，重要的是这些代码使用的应该是import和export语句，而不是require语句。)

通过下列命令安装Rollup依赖：
```bas
npm install rollup rollup-plugin-node-resolve rollup-plugin-commonjs rollup-plugin-uglify --save-dev
```

##运行Rollup
通过下列命令执行Rollup过程：

```bas
node_modules/.bin/rollup -c rollup-config.js
```

#SUMMARY
```bas
npm run weui:build
```

