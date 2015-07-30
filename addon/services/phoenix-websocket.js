import Ember from 'ember';
import {Socket} from "../utils/phoenix";

export default Ember.Service.extend({
  socket: null,
  openChannels: [],

  connectToSocket(url) {
    let socket = new Socket(url);
    this.set('socket', socket);
    socket.connect();
  },

  joinChannel(channel) {
    let chan = this.get('socket').chan(channel, {});
    return new Ember.RSVP.Promise((resolve, reject) => {
      var chanJoin = chan.join();
      chanJoin.receive("ok", () => {
        this._addChanToOpenChannels(chan);
        resolve(chan);
      });
      chanJoin.receive( "error", () => { reject(); });
    });
  },

  _addChanToOpenChannels(chan) {
    var openChannels = this.get('openChannels');
    if (openChannels.indexOf(chan) < 0) {
      openChannels.push(chan);
    }
  }
});
