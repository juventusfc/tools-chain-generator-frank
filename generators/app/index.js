var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);
  }

  // UI 交互
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "title",
        message: "Your project title",
      },
    ]);
  }

  // 安装依赖
  writing() {
    const pkgJson = {
      devDependencies: {
        eslint: "^3.15.0",
      },
      dependencies: {
        react: "^16.2.0",
      },
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
  }

  install() {
    this.npmInstall();
  }

  // 生成文件
  writing() {
    this.fs.copyTpl(
      this.templatePath("index.html"),
      this.destinationPath("public/index.html"),
      { title: this.answers.title }
    );
  }
};
