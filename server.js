const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
app.set("isDebug", false);
app.set("globalDebugRes", {});

let connections = [];
server.on("connection", connection => {
  connections.push(connection);
  connection.on("close", () => connections = connections.filter(curr => curr !== connection));
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

function shutdown() {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);

  connections.forEach(curr => curr.end());
  setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}

process.on('uncaughtException', function(err) {
  console.log(`Uncaught Exception: ${err.message}`);

  if (app.get("isDebug")) {
    app.set("isDebug", false);
    return app.get("globalDebugRes").json({ error: err });
  }

  process.exit(1);
});