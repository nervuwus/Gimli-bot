import { Event } from "../Interfaces";
import AllBankAmount from "../Database/Models/GeneralBank";

export const event: Event = {
    name: 'ready',
    run: async (client) => {

        const clientBank = await AllBankAmount.find({ identifier: "Exist" })

        if (clientBank.length > 0) {
            console.log(`Je m'appelle ${client.user.username} et je vais BIEN`)
            let i = 0;
            setInterval(async () => {
                let banks = await AllBankAmount.findOne({ identifier: "Exist" });
                if (i === 0) i++
                else i--;
                const Guilds = client.guilds.cache.map(g => g.id).length;
                const Users = client.guilds.cache.size;
                let presence = [`à gérer l'argent de ${Users} utilisateurs dans ${Guilds} serveurs`,
                `à gérer ${banks.bankAmount} devises`]
                client.user.setPresence({ activities: [{ name: presence[i] }], status: "dnd" });
            }, 20000)
        }
        else await AllBankAmount.create({
            bankAmount: 0,
            identifier: "Exist"
        });



    }
}