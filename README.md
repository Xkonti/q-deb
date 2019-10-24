# QDeb

A simple logging application that listens for HTTP post messages on port `33990`. Written in Vue.js using Quasar Framework and Electron. Currently available only for windows unless somebody wants to build it for Linux or Mac.

![Screenshot of QDeb](https://raw.githubusercontent.com/Xkonti/q-deb/develop/docs/images/QDeb_0_2_0.png)

## Message anatomy

Example of the log message that QDeb can consume:

```json
{
  "timestamp": "2019-10-24T17:46:12.012Z",
  "level": "critical",
  "message": "Encountered some really bad error",
  "source": "MyApp.Orders.OrderService",
  "exception": "Null reference exception...",
  "tags": ["order", "sync"]
}
```

Message properties:
- `timestamp` - Time the message was sent. If not received, it will be generated automatically upon receiving the message by QDeb. Optional.
- `level` - Severity level of the message. This could be any string, but expected values are: `trace`, `debug`, `info`, `warn`, `error`, `critical`.
- `message` - The contents of the message to be displayed. Optional.
- `source` - The source of the log. Completely optional and doesn't follow any convention. 
- `exception` - Text field to provide more information. Optional.
- `tags` - List of tags to attach to this message. Good for quick filtering. Optional.

## Integrations

There is C# NLog integration available as a NuGet package: [QDeb NLog Target](https://github.com/Xkonti/QDeb-NLog-Target)
