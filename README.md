# ember-phoenix-websockets

## Warning
This project is under initial development and should not be used until versioned.

## Installation
`ember install ember-phoenix-websockets`

## Basic Usage
#### Injecting the service:
First, inject the phoenix-websocket service into wherever it's needed

```javascript
phoenixWebsocket: Ember.inject.service()
```

#### To connect to a socket:
Call `connectToSocket()` on the service and give it your URL.

```javascript
this.get('phoenixWebsocket').connectToSocket('ws://localhost:4000/ws');
```

#### To join a channel:
Call `joinChannel()` on the service and pass it the topic.

```javascript
this.get('phoenixWebsocket').joinChannel('rooms:lobby')
```
This will return a promise that will be resolved and return the connected channel on a succesful response from phoenix such as:

```elixir
{:ok, socket}
```

Or rejected on an error response like:

```elixir
{:error, %{reason: "Unauthorized"}}
```	

Example for joining a channel:

```javascript
  this.get('phoenixWebsocket').joinChannel('rooms:lobby').then(
    (joinedChan) => { this.set('chan', joinedChan); },
    ()=> { alert('something bad happened'); }
  );
```
