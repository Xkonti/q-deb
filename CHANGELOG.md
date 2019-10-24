# QDeb Changelog

## 0.2.0

New:
- Make main window use custom app bar
- Move control buttons to the app bar
- Move filters to separate toolbar
- Filtering via message contents
- Toggleable autoscroll - it doesn't stick / unstick automatically .1
- Button to start/stop background server on demand

Improvements:
- Background server was rewritten allowing it to be started/stopped on demand
- Prepare background server to receive basic configuration data

Fix:
- Remove unused buttons

## 0.1.0

New:
- Automatic listening on port 33990
- Displaying received log messages in a table
- Color-coding depending on message severity
- Filtering via tags
- Basic autoscroll that snaps to bottom of the list automatically
- Option to clear the log
