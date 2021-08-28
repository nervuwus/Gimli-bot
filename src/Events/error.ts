import { Event } from "../Interfaces";

export const event: Event = {
    name: 'error',
    run: async (client, error: Error) => {
        console.error(error);
    }
}