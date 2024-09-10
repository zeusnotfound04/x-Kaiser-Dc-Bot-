import { Client , GatewayIntentBits , Collection, Utils , } from "discord.js";
import fs from "fs"
import { promisify } from 'util';

require('dotenv').config();
const TOKEN = process.env.Dc;
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
    
	],
});
const readdir = promisify(fs.readdir);
const badWords = ["madharchod" ,"maa ka", "bsdk" , "lodu" , "bkl" , "bosidike", " maa chudao" , "behen ke lund" ,"gandu" , "gandve" , "lund" , "maka bosdasa", "mc" , "bc" , "jhaatu" , "chutiye", "chutiye" , "nigga" ,  "nigger" , "chut" , ];
const owerID = 983293840150650900
const warnings = new Collection();

const timeouts = new Collection();

const WELCOME_CHANNEL_ID = 998528712100294748


client.on('guildMemberAdd', (member) => {
  const welcomeChannel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
  if (!welcomeChannel) return;

  welcomeChannel.send(`Welcome Londee!!!, ${member}!`);
});


client.on("messageCreate" , (message)=>{
    if(message.author.bot) return;
    
    if (message.mentions.has(owerID)){
      message.reply("Baap ko Bula rahe ho kyaa??")
    }
    if (message.mentions.has(client.user)) {
      message.reply('Hello! You mentioned me?');
    }
    if(message.content.includes("bye")){
      console.log("inside bye")
      message.reply(`Bye ${message.author.username}. Hope you come again......`)
    }
    const containsBadWord = badWords.some(word => {
      const pattern = new RegExp(`\\b${word}\\b`, 'i');
      return pattern.test(message.content);
    });

    const member = message.member;
    console.log(message.author.username)

    let warningCount = warnings.get(member.id) || 0;
    if (containsBadWord) {
      if (warningCount === 0) {
        message.reply('Bhaiya Gali matt do plz');
        warnings.set(member.id, 1);
      } else if (warningCount === 1) {
        message.reply('Plzzz matt do bhaiyaa');
        warnings.set(member.id, 2);
      } else if (warningCount === 2) {
        message.reply('Gali matt chod bsdkk!');
        warnings.set(member.id, 3);
      }else if (warningCount === 3) {
        message.reply('Abh bohot hogyaa abh choda na toh seedhaa 6 ft ka danda teri gand se aar paar karrdungaa BKL');
        warnings.set(member.id, 4);
      }else if (warningCount === 4) {
        message.reply('This is your final warning. Further violations may result in action taken against your account.');
        warnings.set(member.id, );
        // Schedule a timeout for 5 minutes if it's the member's third warning
        const timeout = setTimeout(() => {
            // Take action here (e.g., remove roles, kick member, etc.)
            // Here, we'll just log a message
            console.log(`User ${member.user.tag} has been timed out for 5 minutes.`);
            // Remove the timeout entry from the collection
            timeouts.delete(member.id);
        }, 300000); // 5 minutes in milliseconds
        // Store the timeout for the member
        timeouts.set(member.id, timeout);
      } else {
        // If the member has already received three warnings, take more serious action
        // Here, we'll just log a message
        console.log(`User ${member.user.tag} has continued to use inappropriate language after receiving three warnings.`);
        // Reset the warning count
        warnings.delete(member.id);
        // Clear any existing timeout for the member
        const existingTimeout = timeouts.get(member.id);
        if (existingTimeout) {
            clearTimeout(existingTimeout);
            timeouts.delete(member.id);
        }
    
        
  }
}    
});
client.on('interactionCreate', async (interaction)=> {
    if (!interaction.isChatInputCommand()) return;
    
    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }
    if (interaction.commandName === 'qued'){
        await interaction.reply("qued response!!!");
    }
   
 
    
    

})


client.on("messageCreate" , (message)=>{
  console.log(message.content);
})
client.login(TOKEN);
