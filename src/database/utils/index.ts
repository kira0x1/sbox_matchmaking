import clc from "cli-color";
import * as commands from "./commands";

const args = process.argv.filter((c) => c.startsWith("--"));

if (args.includes("--seed")) {
  await commands.seedTable();
}

if (args.includes("--delete")) {
  await handleDeleteCommand();
}

async function handleDeleteCommand() {
  const cmdIndex = process.argv.indexOf("--delete");
  const option = process.argv.at(cmdIndex + 1)?.toLowerCase();
  if (!option || (option !== "lobby" && option !== "user")) {
    console.log(clc.bgRed.bold("Missing option for --delete:"));
    console.log(clc.bgBlack.bold(`usage:\n--delete lobby\n--delete user`));
    return;
  }

  await commands.clearTable(option as commands.TableType);
}

process.exit(0);
