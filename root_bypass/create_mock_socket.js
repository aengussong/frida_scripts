// I saw this once in a document scan application.
// It was checking whether it could connect to a specific port on localhost. If not, a warning message was shown
// and the app was blocked. I'm guessing that some underlying library was creating a server socket if the root checks
// passed. The most bizarre thing was that it didn't try to communicate with the server, just checked whether
// the connection was possible. After faking the socket, the app still worked normally, so I don't know what this 
// was about.
// In the end, I wasn't able to use this script, as the app was protected with Pairip: it detected tampering with 
// the app and was throwing memory address errors. I had to write another android app that just created and held 
// a server socket on the specified port, which also worked.

Java.perform(function () {
    var Socket = Java.use("java.net.Socket");

    Socket.$init.overload('java.lang.String', 'int').implementation = function (host, port) {
        console.log("Socket constructor called with host: " + host + ", port: " + port);

        if (host === "localhost" && port === 7001) {
            console.log("Intercepted connection attempt to localhost:7001. Simulating a successful connection.");
            var DummySocket = Java.use("java.net.Socket");
            return DummySocket.$new();
        }

        return this.$init(host, port);
    };
});
