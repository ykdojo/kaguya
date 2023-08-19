# Kaguya

Kaguya is a ChatGPT plugin that allows you to load and edit your local files in a controlled way, as well as run any Python, JavaScript, and bash script. This makes it a powerful tool for developers, enabling them to interact with their file system and run scripts directly from ChatGPT. To interact with Kaguya, you'll need access to plugin devtools by getting on their waitlist [here](https://openai.com/waitlist/plugins). In case this approach doesn't work for you, we may be able to come up with a more open approach at some point in the future.

## Demo

Here are a few demo videos of Kaguya: 

https://github.com/ykdojo/kaguya/assets/107422421/c580a6f6-5f08-43fd-ac8b-c12a319e1534

https://github.com/ykdojo/kaguya/assets/107422421/d61b8ff1-2dbd-4eb4-b1b5-45d43797ddaa

## Getting Started Guide

1. Gain access to OpenAI's plugin devtools for ChatGPT [here](https://openai.com/waitlist/plugins)
1. Install Docker and run it locally
1. Clone this repo to your local environment
1. Execute ```docker.sh``` script
1. Setup localhost port 3000
1. Interact with Kaguya through ChatGPT
1. If you want Kaguya to be able to interact with your files, put them in the FILES folder.
1. Note: Kaguya won't have access to files outside of its own directory.

## Recommended Custom Instructions 

```
When editing a file, use search and replace and NOT updateWholeFile unless we're dealing with a very small file. Confirm with me before you edit a file.

When you have output from Kaguya, there's no need to repeat everything from there. Instead, you can summarize it concisely.

When you want to use executeCommand in a subdirectory, make sure to cd there first every time.
```

## Tips

- If listFilesInDirectory tries to show too many files, a good solution would be to add a git repo or submodule, in which files in .gitignore are ignored.
- Best to keep each file under 100 lines of code, particularly for writing
- Writing more than ~80 lines of code at once is not recommended. It's slow and it might not even be able to finish the task.
- You can have it read more code though. However, reading more than 500-600 lines of code at once is not recommended.
- If the target file you want to edit is long, you may want to explicitly ask it to use search and replace and NOT updateWholeFile.
- It may not get the intention of your instructions right away. It's meant to be a conversational tool.
- If the assistant starts hallucinating, it may be helpful to start a new conversation or limit the length of each file being loaded.

## Discord

Feel free to join our Discord server [here](https://discord.com/invite/nNtVfKddDD).

## VS Code Extension

We're also working on a VS Code extension version of Kaguya. Feel free to sign up for the waitlist [here](http://kaguya.ai/).
