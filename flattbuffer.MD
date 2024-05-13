# 如何使用

首先需要确保电脑安装 flatc

```sh
brew install make cmake
# 之后 clone https://github.com/google/flatbuffers
cd flatbuffers
# 生成MakeFile
cmake -G “Unix Makefiles”
# 生成 flatc
make install
```


## 编写 fbs 文件
[flatbuffers_guide_writing_schema](https://flatbuffers.dev/flatbuffers_guide_writing_schema.html)

## 编译 fbs 文件

```sh
flatc --ts ./*.fbs
flatc --ts [name].fbs
```
