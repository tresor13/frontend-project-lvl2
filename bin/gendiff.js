#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("0.8.0");
program
  .option("-f, --format <type>", "output format")
  .arguments("<filepath1> <filepath2>")
  .action((file1, file2) => {
    console.log(gendiff(file1, file2));
  });

program.parse();
