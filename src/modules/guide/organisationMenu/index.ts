import { Message, ButtonInteraction } from "discord.js";

import { logHandler } from "../../../utils/logHandler";
//import { sendLogMessage } from "../utils/sendLogMessage";

/**
 * Handles the content for "about WGs".
 *
 * @param {ButtonInteraction} interaction The command interaction.
 */
export const organisationMenu = async (
  interaction: ButtonInteraction
): Promise<void> => {
  try {
    const message = (await interaction.editReply({
      content:
        "The moonjellyDAO ... comprises ... Working Groups that collaborate to promote our Vision which is to advance ... ethical, safe, resilient and diverse economic systems to benefit ... \n\nOur Working Groups are: ... \n\nThe [workgroup website page](https://www.disney.com) provides more info and the [WG calendar](localhost) provides the schedule for all WG calls.\nAll calls are open to anyone to join. Hope we see you there!",
    })) as Message;

    const collector = message.createMessageComponentCollector({
      time: 270000,
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
