#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import Table from "cli-table3";
import { colord, getFormat } from "colord";

program
    .option("--hex <hex>")
    .option("--rgb <rgb>")
    .option("--hsl <hsl>")
    .action(() => {
        // get color value
        let { hex, rgb, hsl } = program.opts();
        if (hex) {
            if (hex[1] != "#") hex = `#${hex}`;
            rgb = colord(hex).toRgbString();
            hsl = colord(hex).toHslString();
        } else if (rgb) {
            hex = colord(`rgb(${rgb})`).toHex();
            hsl = colord(hex).toHslString();
        } else if (hsl) {
            const [h, s, l] = hsl.split(",");
            hex = colord(`hsl(${h}deg,${s}%,${l}%)`).toHex();
            rgb = colord(hex).toRgbString();
        }

        // format color value
        rgb = rgb.match(/\d+/g).join(", ");
        hsl = hsl.match(/\d+/g).join(", ");

        // render table
        const table = new Table({
            head: [],
            colWidths: [12, 24],
            chars: { top: chalk.hex(hex)("─"), "top-right": chalk.hex(hex)("┐"), right: chalk.hex(hex)("│"), "right-mid": chalk.hex(hex)("│"), "bottom-right": chalk.hex(hex)("┘"), bottom: chalk.hex(hex)("─"), "bottom-mid": chalk.hex(hex)("─"), "bottom-left": chalk.hex(hex)("└"), left: chalk.hex(hex)("│"), "left-mid": chalk.hex(hex)("│"), "top-left": chalk.hex(hex)("┌"), "top-mid": chalk.hex(hex)("─"), mid: "─", "mid-mid": "─", middle: " " },
            style: { "padding-left": 2, "padding-right": 2 },
        });
        table.push([chalk.bold("Hex"), hex], [chalk.bold("RGB"), rgb], [chalk.bold("HSL"), hsl]);
        console.log(`Color spaces of ${chalk.hex(hex)(hex)}`);
        console.log(table.toString());
    });

program.parse();
