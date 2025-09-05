
using Blazor.BrowserExtension;
using WebExtensions.Net.Runtime;
using WebExtensions.Net.Scripting;
using WebExtensions.Net.Tabs;

public partial class BackgroundWorker : BackgroundWorkerBase
{
    [BackgroundWorkerMain]
    public override void Main()
    {
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

    private bool OnMessageReceived(object message, MessageSender sender, Action<object> sendResponse)
    {
        _ = HandleMessageAsync(message, sender, sendResponse);
        return true;
    }

    private async Task HandleMessageAsync(object message, MessageSender sender, Action<object> sendResponse)
    {
        if (message is string str && str == "GET_MEMBERS")
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