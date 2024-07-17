type Listener = (data: any) => void;

class EventEmitter {
    private events: { [event: string]: Listener[] } = {};

    on(event: string, listener: Listener): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event: string, listenerToRemove: Listener): void {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
    }

    emit(event: string, data: any): void {
        if (!this.events[event]) return;

        this.events[event].forEach(listener => listener(data));
    }
}

const emitter = new EventEmitter();
export default emitter;
