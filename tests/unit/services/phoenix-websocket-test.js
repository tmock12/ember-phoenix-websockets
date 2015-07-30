import { moduleFor, test } from 'ember-qunit';

moduleFor('service:phoenix-websocket', 'Unit | Service | phoenix websocket', {
});


test('connectsToSocket() sets socket on service', function(assert) {
  var service = this.subject();
  service.connectToSocket('ws://localhost:4000/ws');
  assert.equal(service.socket.isConnected(), false);
});

test('joinChannel() adds channel to openChannels', function(assert) {
  var service = this.subject();
  service.socket = {
    chan() {
      return chanObject;
    }
  };

  var chanObject = {
    topic: 'someTopic',
    join() {
      return {
        receive(status, callback) {
          return callback();
        }
      };
    }
  };

  service.joinChannel('test:channel').then(function(chan) {
    assert.equal(service.openChannels.length, 1);
    assert.equal(chan.topic, 'someTopic' );
  });
});

test('_addChanToOpenChannels() only adds in unique', function(assert) {
  var service = this.subject();
  service.openChannels = [];

  service._addChanToOpenChannels('foo');
  service._addChanToOpenChannels('bar');
  service._addChanToOpenChannels('foo');
  assert.deepEqual(service.openChannels, ['foo', 'bar']);
});
