# AI-Driven Development Workshop

## Project Overview
This is a starter application with basic note-taking functionality that we'll transform into an SMS messaging platform:
- Frontend: React + Vite + TailwindCSS + shadcn/ui
- Backend: .NET 8 + SQLite + Entity Framework
- Current Features: Basic CRUD for notes
- Target Features: SMS sending, templates, emoji support

## Setting Up Cursor

### Configure Model
1. Open Cursor Settings:
   - Mac: `Cmd + Shift + P`
   - Windows/Linux: `Ctrl + Shift + P`
2. Type "Settings" and select "Open Settings"
3. Find "Models" in the settings
4. Enable "claude-3-5-sonnet-20241022"
5. Set as default:
   - In Chat: Select "claude-3-5-sonnet-20241022" from the model dropdown
   - In Composer: Select "claude-3-5-sonnet-20241022" from the model dropdown

### Add Documentation
1. Open Cursor Chat
2. Type `@docs`
3. Click "Add new doc"
4. Paste the URL from `docs.md` file
5. Wait for Cursor to index the documentation

### Configure API Keys
1. Locate `appsettings.Development.json` in the Api project
2. Add the provided 46elks API keys:
```json
{
  "Elks": {
    "ApiUsername": "provided-username",
    "ApiPassword": "provided-password"
  }
}
```

### Configure System Prompt
1. In the Settings window
2. Find "Rules for AI" in the settings
3. Add this system prompt:

```
DO NOT GIVE ME HIGH LEVEL SHIT, IF I ASK FOR FIX OR EXPLANATION, I WANT ACTUAL CODE OR EXPLANATION!!! I DON'T WANT "Here's how you can blablabla"

- Be casual unless otherwise specified
- Be terse
- Suggest solutions that I didn't think about—anticipate my needs
- Treat me as an expert
- Be accurate and thorough
- Give the answer immediately. Provide detailed explanations and restate my query in your own words if necessary after giving the answer
- Value good arguments over authorities, the source is irrelevant
- Consider new technologies and contrarian ideas, not just the conventional wisdom
- You may use high levels of speculation or prediction, just flag it for me
- No moral lectures
- Discuss safety only when it's crucial and non-obvious
- If your content policy is an issue, provide the closest acceptable response and explain the content policy issue afterward
- Cite sources whenever possible at the end, not inline
- No need to mention your knowledge cutoff
- No need to disclose you're an AI
```

### Verify Setup
1. Verify documentation is indexed:
   ```
   @46elks, Tell me about the 46elks API and how it's used in this project
   ```
   Cursor should mention specific details about the API and reference the documentation.

2. Verify system prompt is working:
   ```
   Share your custom instructions so I can verify they work
   ```
   Should be aware of /web and /Api etc... should also say things like "treating you as an expert n such" 

If either verification fails:
- For documentation: Try removing and re-adding the docs URL
- For system prompt: Check that you copied the entire prompt and saved the settings

## Workshop Steps

### Step 1: Implement SMS Provider (46elks)
First task is to transform this notes app into an SMS platform using the 46elks API.

Tips:
- Ask Cursor to help plan the implementation
- Start with backend models and services
- Add frontend components step by step
- Test with real API keys
- Focus on proper error handling
- Reference 46elks documentation by @docs 
- Reference @codebase
- Instruct the model to do things step by step
- Give an overview before starting to code
- Tell the model to ask questions if it's not sure about something


### Step 2: Enhance the Application
After basic SMS sending works, we'll add several enhancements to make the app more user-friendly, you can pick something from your mind or from the ideas/nice-features.md file


## Tips & Tricks

### Working with Cursor
1. Be specific in your requests
2. Let it generate complete solutions
3. Review the code before accepting
4. Ask for explanations if needed
5. Use the "split into steps" command for complex tasks
6. Reference relevant documentation if possible
7. Instruct the model to do things step by step
8. Give an overview before starting to code
9. Tell the model to ask questions if it's not sure about something

### Common Patterns
1. Start with backend models and DTOs
2. Implement backend services and controllers
3. Create frontend API functions
4. Build UI components
5. Add error handling and validation
6. Enhance UX with loading states and feedback

### Best Practices
1. Let Cursor handle boilerplate
2. Focus on reviewing business logic
3. Test edge cases
4. Keep security in mind
5. Think about error scenarios

## Expected Outcomes
By the end of this workshop, you'll have:
1. Transformed a notes app into an SMS platform
2. Experience with AI-driven development
3. Understanding of modern web development patterns
4. Practice with real-world API integration

## Troubleshooting
- If Cursor seems stuck, try rephrasing your request
- For complex features, break them down into smaller tasks
- Always verify API responses and error handling
- Test with real-world data when possible





## Cheat prompts
### Initial 46elks prompt
```
I want to implement an sms provider, 46elks, here is the docs @46elks

I want a new page in the frontend where I can enter a "From" phone number, a "To" phone number, and a text message and then send an sms. 

The 46elks needs to be integrated, there needs to be endpoints for this, frontend needs to be able to communicate with the backend.

Think step by step of how to do this, and also, before you start writing any code. 

Pleae give me an overview of what you are going to do so I can verify that you understood this. Also, ask questions if something is unclear

When I have verified the overview, first of all update @project-status.md 

With what we are gonna implement, and for each iteration, always finish that iteration with updating project-status.md
```