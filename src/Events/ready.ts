import { Event } from "../Interfaces";

export const event: Event = {
    name: 'ready',
    run: (client) => {
        console.log(`Je m'appelle ${client.user.username} et je vais BIEN`)
    }
}