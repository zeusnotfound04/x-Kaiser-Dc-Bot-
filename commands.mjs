import { REST, Routes , } from 'discord.js';
const TOKEN = "MTIzMDQ2MTc4NjcwNTEwMDkyNQ.GFPRBv.VHQre4n5GI8FOFFI0KHsN1wJJIseHHMT9UHDmE"

const commands = [
    
    {
      name : "test-backchodi",
      description : "xd backchodiii"
    },
    {
      name : "sharma-ki-backchodi",
      description : "Vedant the Backchodd"
    },
    {
      name : "vansh-backchod",
      description : "Londiyaa baaz"
    },
    {
      name : "akshay-backchod",
      description : "Londiyaa baaz"
    },

  ];
  
  const rest = new REST({ version: '10' }).setToken(TOKEN);
  
  try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands("1230461786705100925"), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }