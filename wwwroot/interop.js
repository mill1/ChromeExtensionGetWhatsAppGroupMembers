console.log("Interop script loaded");

window.registerMembersHandler = (dotnetHelper) => {
    chrome.runtime.onMessage.addListener((message) => {

        if (message.type === "MEMBERS_RESULT") {
            console.log("Invoking .NET method with members:", message.members);
            dotnetHelper.invokeMethodAsync("OnMembersReceived", message.members);
        }
    });
};

window.checkWhatsAppTabAndSendMessage = async function () {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length === 0) {
                resolve(false);
                return;
            }

            const url = tabs[0].url || "";
            if (!url.startsWith("https://web.whatsapp.com")) {
                alert("Please open https://web.whatsapp.com first.");
                resolve(false);
                return;
            }

            chrome.runtime.sendMessage("GET_MEMBERS");
            resolve(true);
        });
    });
};