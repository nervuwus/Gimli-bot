import { Event } from "../Interfaces";

export const event: Event = {
    name: 'messageCreate',
    run: async (client, error: Error) => {
        console.error(error);
    }
}