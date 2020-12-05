require

mod.require

Module._load

Module._resolveFilename 解析文件名字 获取文件的绝对路径

Module._cache 模块的缓存，没有缓存创建模块

new Module(filename, parent) 没有模块就创建一个模块 id（当前的文件名） export（当前的空对象）

Module._cache[filename] = module; 把模块缓存起来

tryModuleLoad 尝试加载模块

module.load 加载模块

Module._extensions 获取扩展名，加载模块，对象，js，json

module._compile(stripBOM(content), filename) 给模块添加闭包

Module.wrap 包裹


