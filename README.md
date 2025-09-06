# Get WhatsApp Group Members

A Chrome extension that lists the members (contacts) of a WhatsApp group.  
Built with **Blazor WebAssembly** and JavaScript interop.

Inspired by [this video](https://www.youtube.com/watch?v=oyH3G_ntpKk).

- - -

**🚀 Features**

*   Extracts and displays all members of a WhatsApp group directly from WhatsApp Web.
*   Clean, Blazor-based popup UI.
*   No server or external API required - runs fully client-side.

- - -

**📦 Requirements**

*   **.NET 8.0 SDK** (or later)
*   **Chrome (or any Chromium-based browser)**

- - -

**🔨** **Build**

dotnet build

This will create the output in the bin/Debug/net9.0/ folder.

- - -

**🧩 Install in Chrome**

1.  Open Chrome and go to: chrome://extensions/
2.  Enable **Developer mode** (toggle in top right).
3.  Click **Load unpacked**.
4.  Select the bin/Debug/net9.0/browserextension/ folder (or the corresponding Release build path).
5.  The extension will appear in your Chrome toolbar.

- - -

**▶️ Usage**

1.  Open [WhatsApp Web](https://web.whatsapp.com/).
2.  Ensure you are logged in.
3.  Navigate to a group chat.
4.  Open the extension popup.
5.  Click button 'Get chat members'.
6.  The list of group members is displayed and put on the clipboard.

- - -

**⚠️ Notes**

*   WhatsApp Web updates its DOM frequently - if the extension stops working, selectors in GetMembers.js may need updating.
*   This project is for **recreational purposes**.

- - -

**🛠️ Tech Stack**

*   Blazor WebAssembly
*   Chrome Extensions API (Manifest V3)
*   JavaScript interop

- - -

**📄 License**

MIT
