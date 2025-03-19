# zebedex-initial-ideas

> Some early experiments and tryouts for zbdx (successor to 0bdx)

-   Version: 0.0.0
-   Created: 19th March 2025
-   Updated: 19th March 2025
-   Author: Rich Plastow
-   License: MIT
-   Repo: <https://github.com/richplastow/zebedex-initial-ideas>
-   Documentation: <https://richplastow.com/zebedex-initial-ideas/>

## Examples

-   [01: Minimal Zebedex Example](https://richplastow.com/zebedex-initial-ideas/examples/01-minimal/)

## Contributing

### Use VS Code, and install the `code` command

VS Code should be used to work on this project. Make sure the `code` command is
available in your terminal:

```bash
code --version # zsh: command not found: code
```

If not, in VS Code press Cmd+Shift+P, start typing "install code", and choose:  
`Shell Command: Install 'code' command in PATH`

```bash
code --version # 1.98.0 ...
```

### Use the zbdx.code-workspace

This project doesn't install Prettier locally, and doesn't need it to be
installed globally either. Instead, open the project workspace in VS Code:

```bash
code zbdx.code-workspace
```

Accept if it prompts you to install VS Code extensions - this usually happens
the first time you open the project.

Now as you edit and save files, you should see that Prettier automatically
formats your code. You are actually using Prettier functionality embedded inside
the 'Prettier - Code formatter' (esbenp.prettier-vscode) extension.

If that's not working, it may be because you opened the project folder with
`code zebedex-initial-ideas/`, or with `cd zebedex-initial-ideas/` followed by
`code .` - in that case, open the project workspace instead.
