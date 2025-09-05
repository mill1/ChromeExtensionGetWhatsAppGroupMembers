
using Blazor.BrowserExtension;
using WebExtensions.Net.Runtime;
using WebExtensions.Net.Scripting;
using WebExtensions.Net.Tabs;

namespace ChromeExtensionGetWhatsAppGroupMembers;

public partial class BackgroundWorker : BackgroundWorkerBase
{
    [BackgroundWorkerMain]
    public override void Main()
    {
        Console.WriteLine("Background worker loaded!");

        // Register method instead of inline async lambda
        WebExtensions.Runtime.OnInstalled.AddListener(OnInstalledHandler);
        WebExtensions.Runtime.OnMessage.AddListener(OnMessageReceived);
    }

    private async void OnInstalledHandler(object details)
    {
        var indexPageUrl = WebExtensions.Runtime.GetURL("index.html");
        await WebExtensions.Tabs.Create(new CreateProperties
        {
            Url = indexPageUrl
        });
    }

    private bool OnMessageReceived(string message, MessageSender sender, Action<object> sendResponse)
    {
        _ = HandleMessageAsync(message, sender, sendResponse);
        return true;
    }

    private async Task HandleMessageAsync(string message, MessageSender sender, Action<object> sendResponse)
    {
        if (message == "GET_MEMBERS")
        {
            var tabs = await WebExtensions.Tabs.Query(new QueryInfo
            {
                Active = true,
                CurrentWindow = true
            });

            var activeTab = tabs.FirstOrDefault();

            if (activeTab != null)
            {
                await WebExtensions.Scripting.ExecuteScript(new()
                {
                    Target = new InjectionTarget { TabId = activeTab.Id ?? -1 },
                    Files = new[] { "content/GetMembers.js" }
                });
            }
        }
        sendResponse?.Invoke("ok");
    }
}