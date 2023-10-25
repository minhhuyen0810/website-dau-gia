import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { Exception } from 'sass';

export class WebsocketUtil {
  host: string = '';
  status: any = '';
  config: any = null;
  stomp: any = null;
  socket: any = null;
  timer: any = null;
  callbackFunction: any = null;

  resolveConPromise = (args?: any) => {};

  constructor() {
    this.status = 'DISCONNECT';
  }

  configure = (config: any) => {
    this.config = config;
  };

  startConnect = async (callback: any) => {
    this.callbackFunction = callback;
    if (this.config === null) {
      throw Error('Configuration required!');
    }
    this.status = 'CONNECTING';
    this.callbackFunction(this.status);
    this.socket = new SockJS(this.config.host);
    this.stomp = Stomp.over(this.socket);

    this.stomp.heartbeat.outgoing = this.config.heartbeatOut || 10000;
    this.stomp.heartbeat.incoming = this.config.heartbeatIn || 10000;

    if (this.config.debug) {
      this.stomp.debug = (str: any) => {};
    } else {
      this.stomp.debug = false;
    }
    await this.stomp.connect(
      this.config.headers || {},
      this.onConnect,
      this.onError
    );
    return new Promise((resolve, reject) => (this.resolveConPromise = resolve));
  };

  onConnect = (frame: any) => {
    if (this.config.debug) {
    }
    this.status = 'CONNECTED';
    this.callbackFunction(this.status);
    this.resolveConPromise();
    this.timer = null;
  };

  onError = (error: any) => {
    console.error(`Error: ${error}`);
    // Check error and try reconnect
    if (error.indexOf('Lost connection') !== -1) {
      if (this.config.debug) {
      }
      this.timer = setTimeout(() => {
        this.startConnect(this.callbackFunction);
      }, this.config.recTimeout || 5000);
    }
  };

  subscribe = (destination: any, callback?: any, token?: any) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.stomp.subscribe(
      destination,
      (response: any) => {
        try {
          let message = JSON.parse(response.body);
          let headers = response.headers;
          callback(message, headers);
        } catch (ex: any) {
          callback(response.body, headers);
        }
      },
      headers
    );
  };

  send = (destination: any, body?: any, token?: any) => {
    let message = JSON.stringify(body);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    this.stomp.send(destination, headers, message);
  };
}
