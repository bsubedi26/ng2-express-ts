import { IAppState } from './../store/index';
import { Store } from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as socketIo from 'socket.io-client';

let SERVER_URL = 'http://localhost:8000';

@Injectable()
export class SocketService {
    private socket;


    constructor(private store: Store<IAppState>) {
        this.initSocket();

        this.store.select("profile")
            .subscribe((response: any) => {
                console.log('RESPONSE SOCKEKTKE', response) 
                const { payload } = response
                // let socket = socketIo(SERVER_URL, { query: "jwttoken=" + payload.jwt });
                // socket.on("UPDATE_AUTH", action => console.log(action));
                // socket.on("UPDATE_REDUX", action => console.log(action));
        });
    }

    private initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public socketTest() {
        console.log('socket works function test')
    }
    public send(message): void {
        this.socket.emit('message', message);
    }

    public connectSocketToStore(): void {
        // this.store.select(state => state.profile.payload)
        //     .subscribe((payload: Object) => {
                
        //         console.log("PAY", payload)
        //         let socket = socketIo(SERVER_URL, {query: "jwttoken=" + token});
        //         socket.on("UPDATE_REDUX", action => this.store.dispatch(action));
        // });
    }

    public get() {
        let observable = new Observable(observer => {
            this.socket.on('message', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

}