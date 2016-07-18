using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;

namespace ContosoApi.SignalR
{
    [Authorize]
    public class ChatHub : Hub
    {
        public void Send(string name, string message)
        {
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(name, message);
        }

        public void Whisper(string name, string reciever, string message)
        {
            Clients.Client(reciever).broadcastMessage(name, message);
            Clients.Caller.addChatMessageToPage(name, message);
        }

        public override Task OnConnected()
        {
            // Add your own code here.
            // For example: in a chat application, record the association between
            // the current connection ID and user name, and mark the user as online.
            // After the code in this method completes, the client is informed that
            // the connection is established; for example, in a JavaScript client,
            // the start().done callback is executed.
            string username = this.Context.User.Identity.Name;
            Clients.All.broadcastMessage("System", username + " has connected.");
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            // Add your own code here.
            // For example: in a chat application, mark the user as offline, 
            // delete the association between the current connection id and user name.
            string username = this.Context.User.Identity.Name;
            Clients.All.broadcastMessage("System", username + " has connected.");
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            // Add your own code here.
            // For example: in a chat application, you might have marked the
            // user as offline after a period of inactivity; in that case 
            // mark the user as online again.
            string username = this.Context.User.Identity.Name;
            Clients.All.broadcastMessage("System", username + " has connected.");
            return base.OnReconnected();
        }
    }
}