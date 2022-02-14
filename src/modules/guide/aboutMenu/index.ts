import {
  Message,
  ButtonInteraction,
  CommandInteraction,
  MessageButton,
  MessageActionRow,
} from "discord.js";

import { logHandler } from "../../../utils/logHandler";
//import { sendLogMessage } from "../utils/sendLogMessage";

import { aboutCommons } from "./aboutCommons";
import { aboutMVV } from "./aboutMVV";
import { aboutTE } from "./aboutTE";

/**
 * Handles the content for "What is the TEC?" button.
 * (button with id - "about").
 *
 * @param {CommandInteraction} interaction The command interaction.
 */
export const aboutMenu = async (
  interaction: ButtonInteraction
): Promise<void> => {
  try {
    const teButton = new MessageButton()
      .setCustomId("what-is-te")
      .setLabel("What is Token Engineering?")
      .setStyle("PRIMARY");

    const commonsButton = new MessageButton()
      .setCustomId("what-is-a-commons")
      .setLabel("What is a Commons?")
      .setStyle("PRIMARY");

    const mvvButton = new MessageButton()
      .setCustomId("mvv")
      .setLabel("Mission, Vision, Values")
      .setStyle("PRIMARY");

    const websiteButton = new MessageButton()
      .setLabel("TEC Website")
      .setURL("https://tecommons.org/")
      .setStyle("LINK");

    const buttons = new MessageActionRow().addComponents(
      teButton,
      commonsButton,
      mvvButton,
      websiteButton
    );

    const message = (await interaction.editReply({
      content:
        "The TEC is an **open source** and **collectively governed project** that builds web3 software, processes and institutions to turn creating ocean impact (regeneration of ecosystems) into a profitable, positive-sum endeavour, making it truly sustainable for the first time. \n\nThe ocean is key to climate change and biodiversity loss mitigation. While the recent massive increases in funding towards ocean conservation continues to rise, there is currently unsatisfied demand and no efficient way of distributing funds, coordinating the effort systemically, or verifying the impact promised. \n\n This provides a great opportunity to cater to the rapidly growing demand in interest for investment and donations into the ocean conservation sector. And with natural assets becoming the stocks of the future, the ocean is one of the most unexplored places of business opportunity yet.\n\nMoonjelly meets this opportunity with an innovative structure for human collaboration - the DAO. The Moonjelly DAO community generates more communication, education, funding sources,  solutions, and a holistic process for impact verification, brought to life by new financial mechanisms offered by blockchain and smart contracts.\n\nJump directly to our [MoonjellyDAO Handbook](https://www.gitbook.io)",
      components: [buttons],
    })) as Message;

    const collector = message.createMessageComponentCollector({
      filter: (click) => click.user.id === interaction.user.id,
      time: 270000,
    });

    collector.on("collect", async (click) => {
      await click.deferUpdate();
      switch (click.customId) {
        case "what-is-te":
          await aboutTE(interaction);
          break;
        case "what-is-a-commons":
          await aboutCommons(interaction);
          break;
        case "mvv":
          await aboutMVV(interaction);
          break;
      }
    });

    collector.on("end", async () => {
      await interaction.editReply({
        content:
          "Sub-Menu timed out after 45 minutes...\nTo remove remnant, press 'dismiss message' below...",
        components: [],
      });
    });
  } catch (e) {
    const err = e as Error;
    logHandler.log("error", `${err.message}\n${err.stack}`);
  }
};
